<script setup>
import ocLogo from "/oc-logo-white.png";
import { ref, onMounted } from "vue";
import Utils from "../config/utils";
import AuthServices from "../services/authServices";

const user = ref(null);
const logoURL = ref("");
const selectedAcc = ref();

const accomadation = ref([]);

const retrieveAcc = () => {
  accServices.getAll()
    .then((response) => {
      accomadation.value = response.data;
    })
    .catch((e) => {
        console.log(e);
    //   message.value = e.response.data.message;
    });
};

retrieveAcc();

const deleteAcc = () => {
  accServices.delete(selectedAcc.value)
    .finally(() => {
        router.go();
    });
};
    
const newAcc =() => {
     router.push({ name: 'add'});
};

const updateAcc =() => {
  if (!selectedAcc.value) {
    console.error('Error: No course selected.');
    return;
  }
  router.push({ name: 'studentupdate', params: { id: selectedAcc.value } });
};

const viewAcc = () => {
  if (!selectedAcc.value) {
    console.error('Error: No course selected.');
    return;
  }
  router.push({ name: 'viewAcc', params: { id: selectedAcc.value } });
};

</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Welcome, {{user}}! </v-toolbar-title>
    </v-toolbar>

 <div class="column">    
        <h3>Current Accomadations</h3>
<div class="card flex justify-content-center">
        <Listbox v-model="selectedAcc"  :options='accomadation' filter optionLabel= 'name' optionValue="accomadationNum" 
        :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:450px" />

    </div>
 </div>

    <div style="margin-top: 7rem"> 
      <h1 style="text-align: center;">Actions</h1>
      <div class="row">
       <button @click="viewAcc(accomadation)">View</button>
       <button @click="newAcc()">Request New </button>
      </div>

      <div class="row">
      <button @click="updateAcc(accomadation)"> Request changes </button>
      </div>
      </div>

        
  </v-container>
</template>