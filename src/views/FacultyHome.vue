<script setup>
import Utils from "../config/utils";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import facultyServices from "../services/facultyServices.js";
import Listbox from "primevue/listbox";

const router = useRouter();

const user = Utils.getStore("user")

const selectedStudent = ref();
let facultyId = null;
let students = ref([]);

facultyServices.getFacultyIdByUserId(Utils.getStore("user").userId)
.then((response) => {
  facultyId = response.data.id

  facultyServices.getAllStudentsForFaculty(facultyId)
  .then((response) => {
  students.value = response.data
  console.log(students)
}).catch((e) => {
  console.log(e)
});

}).catch((e) => {
  console.log(e)
});


retrieveStudent();

const display = (students) => students.name + " " + students.id;


const viewStudentAcc = () => {
  if (!selectedStudent.value) {
    console.error('Error: No course selected.');
    return;
  }
  router.push({ name: 'viewFS', params: { id: selectedStudent.value } });
};

</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Welcome, {{user.fName}}! </v-toolbar-title>
    </v-toolbar>

 <div class="column">    
    <h3>Students with Accommodations</h3>
<div class="card flex justify-content-center">
        <Listbox v-model="selectedStudent"  :options='students' filter :optionLabel= 'display' optionValue="id" 
        :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:450px" />

    </div>
 </div>

    <div style="margin-top: 7rem"> 
      <h1 style="text-align: center;">Actions</h1>
      <div class="row">
       <button @click="viewStudentAcc(selectedStudent)">View</button>
      </div>
      </div>

  </v-container>
</template>