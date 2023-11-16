<script setup>
import Utils from "../config/utils";
import { useRouter } from "vue-router";
import accServices from "../services/accommodationServices";
const router = useRouter();

const user = Utils.getStore("user")
console.log(user)

import { ref, onMounted } from "vue";
import Listbox from "primevue/listbox";

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

const display = (accomadation) => accomadation.title + " " + accomadation.id;

const deleteAcc = () => {
  accServices.delete(selectedAcc.value)
    .finally(() => {
        router.go();
    });
};

const EditAcc =() => {
  if (!selectedAcc.value) {
    console.error('Error: No course selected.');
    return;
  }
   router.push({ name: 'EditAcc', params: { id: selectedAcc.value }  });

}

const AddAcc =() => {
   router.push({ name: 'AddAcc' });

}


const viewAcc = () => {
  if (!selectedAcc.value) {
    console.error('Error: No course selected.');
    return;
  }
  router.push({ name: 'ViewAcc', params: { id: selectedAcc.value } });
};

const AdminHome =() => {
   router.push({ name: 'admin' });

}

const SearchStudent =() => {
   router.push({ name: 'search' });

}

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
  

 <div class="column">    
        <h2>Current Accomadation Types</h2>
<div class="card flex justify-content-center">
        <Listbox v-model="selectedAcc"  :options='accomadation' filter :optionLabel= 'display' optionValue="id" 
        :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:450px" />

    </div>
 
    <div style="margin-top: 0.1rem"> 
      <h2 style="text-align: center;">Actions</h2>
      <div class="row">
       <button class=test @click="AddAcc()">Create New</button>
      <button class=test @click="EditAcc(accomadation)"> Edit </button>
       <button class=test @click="viewAcc(accomadation)">View</button>
       <button class=test @click="deleteAcc(accomadation)">Delete</button>
      </div>

      <h2 style="text-align: center;">Other Actions</h2>
      <div class="row" >
       <button class=test @click="AdminHome()">View All Requests</button>
       <button class=test @click="SearchStudent()">View Students</button>
      </div>
      </div>
 </div>

        
  </v-container>
</template>