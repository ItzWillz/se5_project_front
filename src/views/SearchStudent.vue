<script setup>
import ocLogo from "/oc-logo-white.png";
import { ref, onMounted } from "vue";
import Utils from "../config/utils";
import AuthServices from "../services/authServices";
import StudentServices from "../services/studentServices";
import Listbox from "primevue/listbox";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);
const logoURL = ref("");
const selectedStudent = ref();

const students = ref([]);

const retrieveStudent = () => {
  StudentServices.getAll()
    .then((response) => {
      students.value = response.data;
      console.log(students.value);
    })
    .catch((e) => {
        console.log(e);
    //   message.value = e.response.data.message;
    });
};

const display = (students) => students.name + " " + students.id + " " + students.email;
console.log(display);

retrieveStudent();



const viewStudent = () => {
  if (!selectedStudent.value) {
    console.error('Error: No student selected.');
    return;
  }
  router.push({ name: 'viewAS', params: { id: selectedStudent.value } });
};

const AdminHome =() => {
   router.push({ name: 'admin' });

}

const AccomadationType =() => {
   router.push({ name: 'accType' });

}

</script>

<template>
  <v-container>

 <v-row>  
  <v-col style="margin-top: 0.1rem">  
        <h3>Students</h3>
        <Listbox v-model="selectedStudent"  :options='students' filter :optionLabel= 'display' optionValue="id" 
        :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:450px" />

  </v-col>
  <v-col>
      <h1 style="text-align: center;">Actions</h1>
      <div class="text-center">
       <button @click="viewStudent(selectedStudent)">View</button>
      </div>
      <h2 style="text-align: center;">Other Actions</h2>
      <div class="text-center" >
       <button class=test @click="AdminHome()">View All Requests</button>
       <button class=test @click="AccomadationType()">View All Types</button>
      </div>
  </v-col>
</v-row>
  </v-container>
</template>