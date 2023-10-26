<script setup>
import Utils from "../config/utils";
import { useRouter } from "vue-router";
import accReqServices from "../services/accReqServices";
import studentServices from "../services/studentServices";

const router = useRouter();

const user = Utils.getStore("user")

 import { ref, onMounted } from "vue";
 import Listbox from "primevue/listbox";

 const selectedAcc = ref();
 const accReq = ref([]);


let stuId = '';

studentServices.getStudentIdByUserId(Utils.getStore("user").userId)
.then((response) => {
  stuId = response.data.id
}).catch((e) => {
  console.log(e)
});

const retrieveAccReq = () => {
  accReqServices.getAllForUser(stuId)
    .then((response) => {
      accReq.value = response.data;
    })
    .catch((e) => {
        console.log(e);
    //   message.value = e.response.data.message;
    });
};

retrieveAccReq();
const display = (accReq) => accReq.type + " " + accReq.semester;

// const deleteAcc = () => {
//   accServices.delete(selectedAcc.value)
//     .finally(() => {
//         router.go();
//     });
// };
    
const newAcc =() => {
     router.push({ name: 'add'});
};

// const updateAcc =() => {
//   if (!selectedAcc.value) {
//     console.error('Error: No course selected.');
//     return;
//   }
//   router.push({ name: 'studentupdate', params: { id: selectedAcc.value } });
// };

// const viewAcc = () => {
//   if (!selectedAcc.value) {
//     console.error('Error: No course selected.');
//     return;
//   }
//   router.push({ name: 'viewAcc', params: { id: selectedAcc.value } });
// };

</script>

<style>
.test{
    color: white;
    background-color: maroon;
    width: 100px;
    height: 60px;
    border-radius: 10px;
    padding: 10px;
    margin: 20px;
    border: none;
}
.column {
    display: flex;
    column-gap: 150px;
  }
</style>
<template>
 <v-container>
    <v-toolbar>
      <v-toolbar-title>Welcome, {{user.fName}}! </v-toolbar-title>
    </v-toolbar>

 <div class="column">    
        <h2>Accomadation Requests</h2>
<div class="card flex justify-content-center">
        <Listbox v-model="selectedAcc"  :options='accReq' filter :optionLabel= 'display' optionValue="id" 
        :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:450px" />

    </div>
 
    <div style="margin-top: 0.1rem"> 
      <h2 style="text-align: center;">Actions</h2>
      <div class="row">
       <button class=test @click="newAcc()">Request New </button>
      <button class=test @click="updateAcc(accomadation)"> Request changes </button>

      </div>

      <div class="row" >
       <button class=test @click="viewAcc(accomadation)">View</button>

      </div>
      </div>
 </div>

        
  </v-container>
</template>