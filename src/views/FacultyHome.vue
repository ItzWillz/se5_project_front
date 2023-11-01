<script setup>
import Utils from "../config/utils";
import { useRouter } from "vue-router";
import facultyServices from "../services/facultyServices.js";

const router = useRouter();

const user = Utils.getStore("user")
console.log(user)

let facultyId = null;
let students = null;

facultyServices.getFacultyIdByUserId(Utils.getStore("user").userId)
.then((response) => {
  facultyId = response.data.id

  facultyServices.getAllStudentsForFaculty(facultyId)
  .then((response) => {
  students = response.data
  console.log(students)
}).catch((e) => {
  console.log(e)
});

}).catch((e) => {
  console.log(e)
});

</script>


<template>
  <v-container >
    Hello, this is the Faculty Home.

    <ul>
      <li v-for="student in students" :key="student.id">
        {{ student.id }} - {{ student.name }} - {{ student.email }}
      </li>
    </ul>

  </v-container>
</template>