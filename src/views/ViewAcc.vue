<script setup>
  import { ref } from "vue";
  import { Modal } from 'usemodal-vue3';
  import accReqServices from "../services/accReqServices";
  import studentServices from "../services/studentServices";
  import { useRouter } from "vue-router";
  import Utils from "../config/utils";


 const valid = ref(false);
  const router = useRouter();
  const message = ref("");


  const acc = ref({
  body: "",
  name: "",
});


const returnHome = () => {
  router.push({ path: `/${Utils.getStore("user").permission}` });
};
</script>

<template>

<div style="background-color: maroon; width 100%; height:50px; display:block;">
      <h1 style="color:white; text-align:center; margin:0px; padding-top:5px;">View Accomadation Type</h1>
      </div>
    <v-form v-model="valid" style="padding-top:20px;">


      <v-container>
           

         <v-row>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="acc.name" id="name" label="Name" :counter="50" required hide-details 
            ></v-text-field>
            </v-col> 
            <v-col  cols="12"  md="4">
            <v-select v-model="accRequest.type" id="type" label="Type:" :items="['Housing','Ethos', 'Classroom', 'MealPlan']" required hide-details
            ></v-select>
            </v-col>
             </v-row>
            <v-row>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="acc.body" id="body" label="Description" :counter="500" required hide-details 
            ></v-text-field>
            </v-col> 
              </v-row>


        <v-row >
            <v-col class="text-right">
            <v-btn  style="margin-left:30px; margin-top:30px; color:white; width:200px; height:50px; font-size:20px" class="text-none mb-4"   color="#AD1212"  variant="flat" @click="returnHome()">
             Exit </v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-form>
  </template>

<style>

</style>