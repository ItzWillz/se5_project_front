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

  <v-row style="margin-top: 0.1rem">
  <v-col> 
    <h3>Students with Accommodations</h3>

        <Listbox v-model="selectedStudent"  :options='students' filter :optionLabel= 'display' optionValue="id" 
        :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:450px" />

    </v-col>

<v-col>
    
      <h1 style="text-align: center;">Actions</h1>
       <div class="text-center">

       <button  @click="viewStudentAcc(selectedStudent)">View</button>
      </div>
</v-col>
  </v-row>

  </v-container>
</template>