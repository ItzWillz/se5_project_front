<script setup>
  import { ref } from "vue";
  import { Modal } from 'usemodal-vue3';
  import stuAccServices from "../services/stuaccommodationServices";
  import accServices from "../services/accommodationServices";
  import { useRouter } from "vue-router";
  import Utils from "../config/utils";


 const valid = ref(false);
  const router = useRouter();
  const message = ref("");


const props = defineProps({
  id: {
    required: true,
  },
});

const stuAcc = ref({});
const acc = ref({})

const retrieveStuAcc = () => {
  stuAccServices.get(9, props.id)
    .then((response) => {
      stuAcc.value = response.data;
      console.log(stuAcc.value)
      accServices.get(stuAcc.value.accommodationId)
      .then((response) => {
      acc.value = response.data
  })
  .catch((err) => {
    console.log(err)
  })
    })
    .catch((e) => {
        console.log(e);
    });
};

retrieveStuAcc();



const returnHome = () => {
  router.push({ name: "student" });
};
</script>

<template>

<div style="background-color: maroon; width 100%; height:50px; display:block;">
      <h1 style="color:white; text-align:center; margin:0px; padding-top:5px;">View Student Accomadation</h1>
      </div>
    <v-form v-model="valid" style="padding-top:20px;">

      <v-container>  
         <v-row>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="stuAcc.semester" id="semester" label="Semester" :counter="50" required hide-details readonly
            ></v-text-field>
            </v-col> 
            <v-col  cols="12"  md="4">
            <v-text-field v-model="acc.title" id="title" label="Title"  required hide-details readonly
            ></v-text-field>
            </v-col>
             </v-row>
            <v-row>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="acc.description" id="description" label="Description" :counter="500" required hide-details readonly
            ></v-text-field>
            </v-col>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="acc.type" id="type" label="Type" :counter="500" required hide-details readonly
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