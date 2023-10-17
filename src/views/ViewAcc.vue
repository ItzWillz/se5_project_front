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
      <h1 style="color:white; text-align:center; margin:0px; padding-top:5px;">Update / Approve</h1>
      </div>
<h1>Accomadation Name</h1>
    <v-form v-model="valid" style="padding-top:50px;">


      <v-container>

        <v-row>
            <v-col>
            <v-text-field v-model="accomadation.name" label="Accomadation Name:" hide-details readonly=""></v-text-field>
            </v-col>
        </v-row>
        <v-row>
          <v-col  cols="12"  md="4">
            <v-select v-model="accomadation.type" id="type" label="Type:" hide-details readonly=""></v-select>
          </v-col>
  
          <v-col cols="12" md="4" >
          <v-select v-model="accomadation.course" label="Class:" readonly="" > </v-select>
          </v-col>

            <v-col cols="12" md="4" >
            <v-text-field v-model="course.professor" label="Professor:" hide-details readonly=""></v-text-field>
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

<style>
.text-wrap{
  height: 200;
  max-height: 200px;
  overflow-y:auto;
  word-wrap: break-word;
}
</style>