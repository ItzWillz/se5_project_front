<script setup>
  import { ref } from "vue";
  //import CourseServices from "../services/courseServices";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const student = ref({});
  const valid = ref(false);

  const props = defineProps({
  id: {
    required: true,
  },
});

  const retrieveStudent = async () => {
  try {
    
    const response = await StudentServices.get(props.id);
    student.value = response.data;
  } 
  catch (e) {
    console.log(e.response.data.message);
    //message.value = e.response.data.message;
  }
};

retrieveStudent();

const returnHome = () => {
  router.push({ path: "/" });
};

const ViewSchedule = () => {
  router.push({ name: "courseSchedule" ,params: { id: selectedStudent.value } });
};
</script>

<template>
<div style="background-color: maroon; width 100%; height:50px; display:block;">
      <h1 style="color:white; text-align:center; margin:0px; padding-top:5px;">View Student</h1>
      </div>

    <v-form v-model="valid" style="padding-top:50px;">


      <v-container>
        <v-row>

            <v-col cols="12" md="4" >
            <v-text-field v-model="student.id" label="ID:" hide-details required readonly=""></v-text-field>
          </v-col>

          <v-col  cols="12"  md="4">
            <v-text-field v-model="student.name" id="name" label="Name:" required hide-details readonly=""
            ></v-text-field>
          </v-col>
  

          <v-col cols="12"  md="4">
          <v-text-field  v-model="student.class" label="Class:" hide-details required readonly=""></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" >
             <v-textarea class="text-wrap" v-model="student.notes"  label="Notes:"   hide-details readonly=""
          ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="auto">
            <v-btn  block class="text-none mb-4"   color="#AD1212"  variant="flat" @click="ViewSchedule">
             View Schedule </v-btn>
            </v-col>
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