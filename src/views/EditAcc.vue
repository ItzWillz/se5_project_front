<script setup>
  import { ref } from "vue";
  import { Modal } from 'usemodal-vue3';
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

  const acc = ref([]);

const retrieveAcc = () => {
  accServices.get(props.id)
    .then((response) => {
      acc.value = response.data;
    })
    .catch((e) => {
        console.log(e);
    });
};

retrieveAcc();

const editAcc = async () => {
  const data = {
    title: acc.value.title,
    description: acc.value.description,
    type: acc.value.type,
   
  };
  try {
    const response = await accServices.update(props.id, data);
    acc.value.id = response.data.id;
    router.push({ name: "accType" });
  } 
  catch (e) {
    console.log(e.response.data.message);
    //message.value = e.response.data.message;
  }
};


const returnHome = () => {
  router.push({ name: "accType" });
};
</script>

<template>

<div style="background-color: maroon; width 100%; height:50px; display:block;">
      <h1 style="color:white; text-align:center; margin:0px; padding-top:5px;">Edit Accomadation Type</h1>
      </div>
    <v-form v-model="valid" style="padding-top:20px;">

      <v-container>  
         <v-row>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="acc.title" id="title" label="Title" :counter="50" required hide-details 
            ></v-text-field>
            </v-col> 
            <v-col  cols="12"  md="4">
            <v-select v-model="acc.type" id="type" label="Type:" :items="['Housing','Ethos', 'Academic', 'MealPlan']" required hide-details
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
            <v-btn  style="margin-right:30px; margin-top:30px; color:white; width:200px; height:50px; font-size: 20px"  class="text-none mb-4" color="#AD1212"  variant="flat" @click="editAcc()">
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