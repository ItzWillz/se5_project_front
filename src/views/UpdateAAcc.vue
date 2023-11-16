<script setup>
import Utils from "../config/utils";
import { ref, onMounted } from "vue";
import accReqServices from "../services/accReqServices";
import accServices from "../services/accommodationServices";
import { useRouter } from "vue-router";
import studentServices from "../services/studentServices";
import studentAccommodationServices from "../services/stuaccommodationServices";
import {useToast} from 'vue-toast-notification';
//import nodemailer from "nodemailer";

const router = useRouter();
const accReq = ref({});
const studentInfo = ref({});
const accommodation = ref([])
const toast = useToast();
const props = defineProps({
  id: {
    required: true,
  },
});

const accommodations = ref([]);

const retrieveAccommodations = () => {
  accServices.getAll()
  .then((response) => {
    accommodations.value = response.data;
    console.log(response.data)
  })
  .catch ((e) => {
    console.log(e)
  })
}

retrieveAccommodations();


const returnHome = () => {
  router.push({ path: `/${Utils.getStore("user").permission}` })
};

const loadAccommodationRequest = async () => {
  if (!Object.keys(accReq.value).length) {
    try {
      const response = await accReqServices.get(props.id);
      accReq.value = response.data[0];
      console.log(accReq.value)
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(loadAccommodationRequest);

const acceptRequest = async () => {
  //if(accReq.value.status.toLowerCase()=="pending") {
  try {
    studentInfo.value= await studentServices.getStudentByStudentId(accReq.value.studentId);
    console.log(studentInfo.value.data.email);
    let updatedData = accReq.value
    updatedData.status= "accepted"; 
    const emailData = {
      studentEmail: studentInfo.value.data.email,
      studentName: studentInfo.value.data.name,
      studentId: studentInfo.value.data.id,
      accommodationType: updatedData.type,
      isAcceptAcc: true,
      accStatus: "accepted"
    }
    updatedData= {
      ...updatedData,
     emailData: { ...emailData }
    }
    console.log(updatedData);
    await accReqServices.update(props.id,updatedData);

    // Get the id of the accommodation that was selected by comparing the title of the selected accommodation to the titles all accommodations
    let selectedAccId = null;
    accommodations.value.forEach(acc => {
      if (acc.title == accommodation.value) {
        selectedAccId = acc.id;
        console.log(selectedAccId)
      }
    });

    // Create an object with the required student accommodation information.
    const studentAcc = {
      semester: accReq.value.semester,
      studentId: accReq.value.studentId,
      accommodationId: selectedAccId
    }
    await studentAccommodationServices.create(studentAcc);  // Add the student accommodation to the database
    
    toast.open({
      message: 'Request Accepted - Status Changed',
      type: 'success',
      duration: 3000,
      position: 'top-right',
    });
    console.log("Request Accepted");
    router.push({ path: `/${Utils.getStore("user").permission}` })
  } catch (error) {
    console.error("Failed to accept request", error);
  }
//}
// if(accReq.value.status.toLowerCase()=="rejected" || "accepted"){
//   toast.open({
//       message: 'Accomodation has been already rejected or accepted',
//       type: 'info',
//       duration: 5000,
//       position: 'top-right',
//     });
// }
};

const rejectRequest = async () => {
  try {
   studentInfo.value= await studentServices.getStudentByStudentId(accReq.value.studentId);
    let updatedData = accReq.value
    updatedData.status= "Rejected";
    const emailData = {
      studentEmail: studentInfo.value.data.email,
      studentName: studentInfo.value.data.name,
      studentId: studentInfo.value.data.id,
      accommodationType: updatedData.type,
      isAcceptAcc: false,
      accStatus: "rejected"
    }
    updatedData= {
      ...updatedData,
     emailData: { ...emailData }
    }
    console.log(updatedData);
    await accReqServices.update(props.id,updatedData);

    toast.open({
      message: 'Request Rejected - Status Changed',
      type: 'success',
      duration: 3000,
      position: 'top-right',
    });
    console.log("Request rejected");
    router.push({ path: `/${Utils.getStore("user").permission}` })
  } catch (error) {
    console.error("Failed to reject request", error);
  }
};

</script>


<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">
        Accommodation Request Edit
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Body"
            v-model="accReq.studentId"
            readonly
          ></v-text-field>
          <v-text-field
            label="Status"
            v-model="accReq.status"
            readonly
          ></v-text-field>
          <v-text-field
            label="Semester"
            v-model="accReq.semester"
            readonly
          ></v-text-field>

          <v-select v-model="accommodation" id="accommodation" label="Accommodation" :items="accommodations" required hide-details>

          </v-select>
        </v-form>
      </v-card-text>
      <!-- Need a way for admin to assign a specific Accommodation to the student when request is approved.-->
      <v-card-actions>
        <v-btn @click="acceptRequest" color="success">Accept</v-btn>
        <v-btn @click="rejectRequest" color="error">Reject</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>


<style>
.text-wrap{
  height: 200;
  max-height: 200px;
  overflow-y:auto;
  word-wrap: break-word;
}
</style>