<script setup>
  import { ref } from "vue";
  //import CourseServices from "../services/courseServices";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const course = ref({});
  const valid = ref(false);

  const props = defineProps({
  id: {
    required: true,
  },
});


const returnHome = () => {
  router.push({ path: "/" });
};



</script>

<template>
<div style="background-color: maroon; width 100%; height:50px; display:block;">
      <h1 style="color:white; text-align:center; margin:0px; padding-top:5px;">View Student Accomadation</h1>
      </div>
    <v-form v-model="valid" style="padding-top:50px;">


      <v-container>

         <v-row>
          <v-col  cols="12"  md="4">
            <v-select v-model="accRequest.type" id="type" label="Type:" :items="['Housing','Ethos', 'Classroom',]" required hide-details
            ></v-select>
            </v-col>

            <v-col  cols="12"  md="4">
            
            <v-select v-model="accRequest.semester" id="semester" label="Semester  :" :items="['Fall23','Winter23', 'Spring24', 'Summer24',]" required hide-details

            ></v-select>
          </v-col>
        </v-row>
          <v-row>
            <v-col  cols="12"  md="4">
              <v-text-field v-model="accRequest.body" id="body" label="Notes" :counter="50" required hide-details 
            ></v-text-field>
            </v-col> 
              </v-row>

        <v-row>
          <v-col cols="12" >
            <h3>Documents:</h3>
            <Listbox v-model="selectedfile"  :options='files' filter optionLabel= 'name' optionValue="fileNum" />
          </v-col>
        </v-row>

        <v-row>
            <v-col cols="auto">
            <v-btn  block class="text-none mb-4"   color="#AD1212"  variant="flat" @click="returnHome">
             Exit </v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-form>
  </template>

