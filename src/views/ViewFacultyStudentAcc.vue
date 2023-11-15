<script setup>
  import { ref } from "vue";
  import { Modal } from 'usemodal-vue3';
  import accStuServices from "../services/stuaccommodationServices";
  import accServices from "../services/accommodationServices";
  import { useRouter } from "vue-router";
  import Utils from "../config/utils";


 const valid = ref(false);
  const router = useRouter();
  const message = ref("");

  const stuacc = ref([]);


const props = defineProps({
  id: {
    required: true,
  },
});

console.log(props.id);

const retrieveStudentAcc = () => {
  accStuServices.get(props.id)
    .then((response) => {
      stuacc.value = response.data;
      console.log(stuacc.value);
      console.log(stuacc.value.accommodationId);
     accServices.get(stuacc.value.accommodationId)
    .then((response) => {
      acc.value = response.data;
    })
    .catch((e) => {
        console.log(e);
    });
    })
    .catch((e) => {
        console.log(e);
    });
};

retrieveStudentAcc();



const retrieveAcc = () => {
  accServices.get(stuacc.accommodationId)
    .then((response) => {
      acc.value = response.data;
    })
    .catch((e) => {
        console.log(e);
    });
};

retrieveAcc();

const returnHome = () => {
  router.push({ path: `/${Utils.getStore("user").permission}` });
};
</script>

<template>

<div style="background-color: maroon; width 100%; height:50px; display:block;">
      <h1 style="color:white; text-align:center; margin:0px; padding-top:5px;">View Student Accomadation</h1>
      </div>
    <v-form v-model="valid" style="padding-top:20px;">


      <v-container>
           
           <!--
             <v-row>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="student.name" id="studentName" label="Student Name " :counter="50" required hide-details readonly=""
            ></v-text-field>
            </v-col> 
            <v-col  cols="12"  md="4">
              <v-text-field v-model="student.id" id="studentId" label=" Student ID" :counter="500" required hide-details readonly=""
            ></v-text-field>
            </v-col> 
              </v-row> -->


          <v-row>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="acc.type" id="type" label="type" :counter="50" required hide-details readonly=""
            ></v-text-field>
            </v-col> 
            <v-col  cols="12"  md="4">
              <v-text-field v-model="acc.semester" id="semester" label="semester" :counter="50" required hide-details readonly=""
            ></v-text-field>
            </v-col> 
              </v-row>
               <v-row>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="acc.body" id="body" label="Notes" :counter="500" required hide-details 
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
