<script setup>
import Utils from "../config/utils";
import { useRouter } from "vue-router";
import Listbox from 'primevue/listbox';

const router = useRouter();

const user = Utils.getStore("user")

import { ref, onMounted } from "vue";
import accReqServices from "../services/accReqServices";
import accServices from "../services/accommodationServices";
import stuAccServices from "../services/stuaccommodationServices";

 const selectedAcc = ref();
 const accReq = ref([]);

 const selectedAcAcc = ref();
 const acc = ref([]);

 const selectedStuAcc = ref();
 const stuAcc = ref([]);

const retrieveAccReq = () => {
  accReqServices.getAll()
    .then((response) => {
      accReq.value = response.data;
    })
    .catch((e) => {
        console.log(e);
    //   message.value = e.response.data.message;
    });
};

retrieveAccReq();

 const display = (accReq) => accReq.studentId + " " +accReq.type + " " + accReq.semester+ " ";

 const retrieveAcc = () => {
  accServices.getAll()
    .then((response) => {
      accReq.value = response.data;
    })
    .catch((e) => {
        console.log(e);
    //   message.value = e.response.data.message;
    });
};

//retrieveAccReq();

 const displayAcc = (acc) => acc.type;

  const retrieveStuAcc = () => {
  stuAccServices.getAll()
    .then((response) => {
      stuAcc.value = response.data;
    })
    .catch((e) => {
        console.log(e);
    //   message.value = e.response.data.message;
    });
};

retrieveStuAcc();

 const displayStuAcc = (stuAcc) => stuAcc.studentId + " " + stuAcc.semester + " " + stuAcc.accommodationId;

 

// const deleteAcc = () => {
//   accServices.delete(selectedAcc.value)
//     .finally(() => {
//         router.go();
//     });
// };

const SearchStudent =() => {
   router.push({ name: 'search' });

}

const AccomadationType =() => {
   router.push({ name: 'accType' });

}

const updateAcc =() => {
  if (!selectedAcc.value) {
    console.error('Error: No course selected.');
    return;
  }
  router.push({ name: `${Utils.getStore("user").permission}update`, params: { id: selectedAcc.value } });
};

const viewAcc = () => {
  if (!selectedAcc.value) {
    console.error('Error: No course selected.');
    return;
  }
  router.push({ name: 'viewAcc', params: { id: selectedAcc.id } });
};

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
        <h2>Incoming Requests</h2>
<div class="card flex justify-content-center">
        <Listbox v-model="selectedAcc"  :options='accReq' filter :optionLabel= 'display' optionValue="id" 
        :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:450px" />

    </div>
 
    <div style="margin-top: 0.1rem"> 
      <h2 style="text-align: center;">Actions</h2>
      <div class="row">
      <button class=test @click="updateAcc()"> Edit Request </button>
      </div>
      </div>
 </div>

      <h2 style="text-align: center;">Other Actions</h2>
      <div class="row" >
       <button class=test @click="SearchStudent()">View All Students</button>
       <button class=test @click="AccomadationType()">View Accomadation Types</button>
      </div>


 <div class="column">    
        <h2>Current Accomadations</h2>
<div class="card flex justify-content-center">
        <Listbox v-model="selectedAcAcc"  :options='acc' filter :optionLabel= 'displayAcc' optionValue="id" 
        :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:450px" />

    </div>
 
    <div style="margin-top: 0.1rem"> 
      <h2 style="text-align: center;">Actions</h2>
      <div class="row">
      <button class=test @click="updateAcc()"> Create Accommodation </button>
      </div>
      <div class="row">
      <button class=test @click="updateAcc()"> Edit Accommodation </button>
      </div>
      <div class="row" >
       <button class=test @click="viewAcc()">View</button>
      </div>
      </div>
 </div>
        
  </v-container>
</template>
