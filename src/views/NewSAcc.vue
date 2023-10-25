<script setup>
  import { ref } from "vue";
    import { Modal } from 'usemodal-vue3';
  import accServices from "../services/accommodationServices";
  import { useRouter } from "vue-router";
  import Utils from "../config/utils";

  let isVisible = ref(false);

 const valid = ref(false);
  const router = useRouter();
  const message = ref("");

  const accommodation = ref({
 // fname: "",
 // lname: "",
  schoolId: "",
  type: "",
  semester: "",
  status: "Pending",
  studentId: Utils.getStore("user").userId,
});


const saveAcc = () => {
  const data = {
    schoolId: accommodation.value.schoolId,
    type: accommodation.value.type,
    semester: accommodation.value.semester,
    status: accommodation.value.status,
    studentId: accommodation.value.studentId,
    
  };
  accServices.create(data)
    .then((response) => {
      accommodation.value.id = response.data.id;
      console.log("add " + response.data);
      router.push({ path: "/" });
    })
    .catch((e) => {
      //console.log(e);
      message.value = e.response.data.message;
    });
};

const returnHome = () => {
 // router.push({ path: "/student" });
};


</script>

<template>
 <Modal v-model:visible="isVisible">
  <div>
  <p>By clicking yes you agree to sharing your information to the 
  accommodation department</p>
  <button>Yes</button>
  <button>No</button>

  </div>
  </Modal>
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
            <v-select v-model="accommodation.type" id="type" label="Type:" :items="['Housing','Ethos', 'Classroom',]" required hide-details
            ></v-select>
            </v-col>

            <v-col  cols="12"  md="4">
            <v-select v-model="accommodation.semester" id="semester" label="Semester:" :items="['Fall 23','Winter 23', 'Spring 24', 'Summer 24',]" required hide-details
            ></v-select>
          </v-col>
        </v-row>
          <v-row>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="accommodation.body" id="body" label="Notes" :counter="50" required hide-details 
            ></v-text-field>
            </v-col> 
              </v-row>
             
            
           

        <v-row>
          <v-col cols="12" >
            <h3>Documents:</h3>
            <v-row>
            <v-col cols="auto">
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
            <v-btn  style="margin-right:30px; margin-top:30px; color:white; width:200px; height:50px; font-size: 20px"  class="text-none mb-4" color="#AD1212"  variant="flat" @click="saveAcc()">
             Submit </v-btn>
            <v-btn  style="margin-left:30px; margin-top:30px; color:white; width:200px; height:50px; font-size:20px" class="text-none mb-4"   color="#AD1212"  variant="flat" @click="returnHome()">
             Exit </v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-form>
  </template>

<style>



.text-wrap{
  height: 200;
  max-height: 200px;
  overflow-y:auto;
  word-wrap: break-word;
}
</style>