<script setup>
  import { ref } from "vue";
  import accServices from "../services/accommodationServices";
  import { useRouter } from "vue-router";
  import Utils from "../config/utils";

  const router = useRouter();


  const acc = ref({
  title: "",
  description: "",
  type: "",
});


const saveAcc = () => {
  const data = {
    title: acc.value.title,
    description: acc.value.description,
    type: acc.value.type,
   
  };
  accServices.create(data)
    .then((response) => {
      acc.value.id = response.data.id;
      console.log("add " + response.data);
      router.push({name: 'accType' });
    })
    .catch((e) => {
      console.log(e);
    });
};

const returnHome = () => {
  router.push({ name: 'accType' });
};
</script>

<template>

<div style="background-color: maroon; width 100%; height:50px; display:block;">
      <h1 style="color:white; text-align:center; margin:0px; padding-top:5px;">New Accomadation Type</h1>
      </div>
    <v-form v-model="valid" style="padding-top:20px;">


      <v-container>
         <v-row>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="acc.title" id="title" label="Title" :counter="50" required hide-details 
            ></v-text-field>
            </v-col> 
            <v-col  cols="12"  md="4">
            <v-select v-model="acc.type" id="type" label="Type:" :items="['Housing','Chapel', 'Academic', 'Meal Plan']" required hide-details
            ></v-select>
            </v-col>
             </v-row>
            <v-row>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="acc.description" id="description" label="Description" :counter="500" required hide-details 
            ></v-text-field>
            </v-col> 
              </v-row>


        <v-row >
            <v-col class="text-right">
            <v-btn  style="margin-right:30px; margin-top:30px; color:white; width:200px; height:50px; font-size: 20px"  class="text-none mb-4" color="#AD1212"  variant="flat" @click="saveAcc()">
             Submit </v-btn>
            <v-btn  style="margin-left:30px; margin-top:30px; color:white; width:200px; height:50px; font-size:20px" class="text-none mb-4"   color="#AD1212"  variant="flat" @click="returnHome()">
             Exit </v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-form>
  </template>

<style>

</style>