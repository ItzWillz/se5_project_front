<script setup>
import ocLogo from "/oc-logo-white.png";
import { ref, onMounted } from "vue";
import Utils from "../config/utils";
import AuthServices from "../services/authServices";

const user = ref(null);
const logoURL = ref("");
const selectedStudent = ref();

const student = ref([]);

const retrieveStudent = () => {
  StudentServices.getAll()
    .then((response) => {
      student.value = response.data;
    })
    .catch((e) => {
        console.log(e);
    //   message.value = e.response.data.message;
    });
};

retrieveStudent();



const viewStudent = () => {
  if (!selectedAcc.value) {
    console.error('Error: No course selected.');
    return;
  }
  router.push({ name: 'view', params: { id: selectedStudent.value } });
};
</script>

<template>
  <v-container>

 <div class="column">    
        <h3>Students</h3>
<div class="card flex justify-content-center">
        <Listbox v-model="selectedStudent"  :options='student' filter optionLabel= 'name' optionValue="studentID" 
        :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:450px" />

    </div>
 </div>

    <div style="margin-top: 7rem"> 
      <h1 style="text-align: center;">Actions</h1>
      <div class="row">
       <button @click="viewStudent(student)">View</button>
      </div>
      </div>

        
  </v-container>
</template>