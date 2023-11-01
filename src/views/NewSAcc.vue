<script setup>
  import { ref } from "vue";

  import { Modal } from 'usemodal-vue3';
  import accReqServices from "../services/accReqServices";
  import studentServices from "../services/studentServices";
  import { useRouter } from "vue-router";
  import Utils from "../config/utils";
  // import modal from '../components/Modal.vue';



  let isVisible = ref(false);

  function okfn() {
    setTimeout(() => {
      console.log("yes");
      //send data for request

      isVisible.value = false;    
    }, 1000)
    }


 const valid = ref(false);
  const router = useRouter();
  const message = ref("");

  let stuId = null;

studentServices.getStudentIdByUserId(Utils.getStore("user").userId)
.then((response) => {
  stuId = response.data.id
}).catch((e) => {
  console.log(e)
});

  const accRequest = ref({
  /*id: null,*/
 // fname: "",
 // lname: "",
 //schoolId: "",
  body: "",
  semester: "",
  type: "",
  status: "Pending",
  studentId: Utils.getStore("user").userId,
  email: "",
  //studentId: stuId,
});


const saveAccReq = () => {
  const data = {
    //schoolId: accRequest.value.schoolId,
    body: accRequest.value.body,
    type: accRequest.value.type,
    semester: accRequest.value.semester,
    status: accRequest.value.status,
    studentId: stuId,
    email: Utils.getStore("user").email
    
  };
  console.log(data);
  accReqServices.create(data)
    .then((response) => {
      accRequest.value.id = response.data.id;
      console.log("add " + response.data);
      router.push({ path: `/${Utils.getStore("user").permission}` });
    })
    .catch((e) => {
      console.log(e);
      //message.value = e.response.data.message;
    });
};

const returnHome = () => {
  router.push({ path: `/${Utils.getStore("user").permission}` });
};
</script>

<template>
 <Modal v-model:visible="isVisible" title="Agreement Form"  
 :okButton="{
        text: 'Yes',
        onclick: okfn,
        loading: true,
        
      }">
 
  <p>By clicking yes you agree to sharing your information to the 
  accommodation department</p>
    </Modal>
   <!-- <Modal
      v-model:visible="isVisible"
      @close="closeModal"
    /> -->
<div style="background-color: maroon; width 100%; height:50px; display:block;">
      <h1 style="color:white; text-align:center; margin:0px; padding-top:5px;">New Request</h1>
      </div>
    <v-form v-model="valid" style="padding-top:20px;">


      <v-container>
           
          <!-- <v-row>
            <v-col  cols="4"  md="4">
              <v-text-field v-model="accommodation.body" id="fname" label="First Name:" :counter="50" required hide-details 
            ></v-text-field>
            </v-col>
            
            <v-col  cols="4"  md="4">
              <v-text-field v-model="accommodation.schoolId" id="schoolId" label="Student ID:" :counter="50" required hide-details 
            ></v-text-field>
            </v-col>
           </v-row> -->

        <v-row>
          <v-col  cols="12"  md="4">
            <v-select v-model="accRequest.type" id="type" label="Type:" :items="['Housing','Ethos', 'Classroom',]" required hide-details
            ></v-select>
            </v-col>

            <v-col  cols="12"  md="4">
            
            <v-select v-model="accRequest.semester" id="semester" label="Semester  :" :items="['Fall23','Winter23', 'Spring24', 'Summer24',]" required hide-details

            ></v-select>
          </v-col>
        </v-row>
          <v-row>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="accRequest.body" id="body" label="Notes" :counter="50" required hide-details 
            ></v-text-field>
            </v-col> 
              </v-row>

        <v-row>
          <v-col cols="12" >
            <h3>Documents:</h3>
            <v-row>
            <v-col cols="auto">
            <!-- <v-btn v-on:click="isVisible=true">Agreement Form</v-btn> -->
            <v-btn v-on:click="isVisible=true">Agreement Form</v-btn>
            </v-col>
            <v-col cols="auto">
            <v-btn>Upload</v-btn>
            </v-col>
            <v-col cols="auto">
            <v-btn>Delete</v-btn>
            </v-col>
            </v-row>
            <Listbox v-model="selectedfile"  :options='files' filter optionLabel= 'name' optionValue="fileNum" />
          </v-col>
        </v-row>


        <v-row >
            <v-col class="text-right">
            <v-btn  style="margin-right:30px; margin-top:30px; color:white; width:200px; height:50px; font-size: 20px"  class="text-none mb-4" color="#AD1212"  variant="flat" @click="saveAccReq()">
             Submit </v-btn>
            <v-btn  style="margin-left:30px; margin-top:30px; color:white; width:200px; height:50px; font-size:20px" class="text-none mb-4"   color="#AD1212"  variant="flat" @click="returnHome()">
             Exit </v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-form>
  </template>

<style>

</style>