<script setup>
import Utils from "../config/utils";
import { ref, onMounted } from "vue";
import accReqServices from "../services/accReqServices";
import { useRouter } from "vue-router";
import studentServices from "../services/studentServices";
import {useToast} from 'vue-toast-notification';
//import nodemailer from "nodemailer";

const router = useRouter();
const accReq = ref({});
const studentInfo = ref({});
const toast = useToast();
const props = defineProps({
  id: {
    required: true,
  },
});

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
  const facultyEmail= "mauriceirakoze77@gmail.com"
  if(accReq.value.status.toLowerCase()=="pending"){
  try {
    studentInfo.value= await studentServices.getStudentByStudentId(accReq.value.studentId);
    console.log(studentInfo.value.data.email);
    let updatedData = accReq.value
    updatedData.status= "accepted"; 
    const emailData = {
      facultyEmail: facultyEmail,
      studentName: studentInfo.value.data.name,
      studentId: studentInfo.value.data.id,
      accommodationType: updatedData.type,
      isAcceptAcc: true
    }
    updatedData= {
      ...updatedData,
     emailData: { ...emailData }
    }
    console.log(updatedData);
    await accReqServices.update(props.id,updatedData);
    
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
}
if(accReq.value.status.toLowerCase()=="rejected" || "accepted"){
  toast.open({
      message: 'Accomodation has been already rejected or accepted',
      type: 'info',
      duration: 5000,
      position: 'top-right',
    });
}
};

const rejectRequest = async () => {
  try {
   studentInfo.value= await studentServices.getStudentByStudentId(accReq.value.studentId);
    let updatedData = accReq.value
    updatedData.status= "Rejected";
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
        </v-form>
      </v-card-text>
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