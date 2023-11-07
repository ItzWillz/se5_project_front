<script setup>
import Utils from "../config/utils";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();

const user = Utils.getStore("user")
console.log(user)

const selectedStudent = ref();

const student = ref([]);

const retrieveStudent = () => {
  accServices.getAll()
    .then((response) => {
      student.value = response.data;
    })
    .catch((e) => {
        console.log(e);
    //   message.value = e.response.data.message;
    });
};

retrieveStudent();

const viewStudentAcc = () => {
  if (!selectedStudent.value) {
    console.error('Error: No course selected.');
    return;
  }
  router.push({ name: 'viewSAcc', params: { id: selectedStudent.value } });
};

</script>

<template>
  <v-container>

 <div class="column">    
    <h3>{{Student.name}} Accommodations</h3>
<div class="card flex justify-content-center">
        <Listbox v-model="selectedStudentAcc"  :options='studentAcc' filter optionLabel= 'name' optionValue="id" 
        :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:450px" />

    </div>
 </div>

    <div style="margin-top: 7rem"> 
      <h1 style="text-align: center;">Actions</h1>
      <div class="row">
       <button @click="viewStudentAcc(student)">View Accomidation</button>
      </div>
      </div>

        
  </v-container>
</template>