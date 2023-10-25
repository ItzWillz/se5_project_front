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

const editAcc = async () => {
  const data = {
    type: accomadation.value.type,
    course: accomadation.value.course,
    professor: course.value.professor,
   
  };
  try {
    const response = await AccServices.update(props.id, data);
    accomadation.value.accomadationNum = response.data.id;
    router.push({ name: "accomadation" });
  } 
  catch (e) {
    console.log(e.response.data.message);
    //message.value = e.response.data.message;
  }
};


</script>

<template>
<div style="background-color: maroon; width 100%; height:50px; display:block;">
      <h1 style="color:white; text-align:center; margin:0px; padding-top:5px;">Request Changes</h1>
      </div>
<h1>Accomadation Name</h1>
    <v-form v-model="valid" style="padding-top:50px;">


      <v-container>
        <v-row>
          <v-col  cols="12"  md="4">
            <v-select v-model="accomadation.type" id="type" label="Type:" :items="['Housing','Ethos', 'Classroom',]" required hide-details
            ></v-select>
          </v-col>
  
          <v-col cols="12" md="4" >
          <v-select v-model="course" label="Class" :items="['0','1', '2', '3', '4',]" > </v-select>
          </v-col>

            <v-col cols="12" md="4" >
            <v-text-field v-model="course.courseNum" label="Number" hide-details required></v-text-field>
          </v-col>

              </v-row>

        <v-row>
          <v-col cols="12" >
            <h3>Documents:</h3>
            <v-row>
            <v-col cols="auto">
            <v-button>Agreement Form</v-button>
            </v-col>
            <v-col cols="auto">
            <v-button>Upload</v-button>
            </v-col>
            <v-col cols="auto">
            <v-button>Delete</v-button>
            </v-col>
            </v-row>
            <Listbox v-model="selectedfile"  :options='files' filter optionLabel= 'name' optionValue="fileNum" />
          </v-col>
        </v-row>

        <v-row>
            <v-col cols="auto">
            <v-btn  block class="text-none mb-4"   color="#AD1212"  variant="flat" @click="editAcc()">
             Submit </v-btn>
            <v-btn  block class="text-none mb-4"   color="#AD1212"  variant="flat" @click="returnHome">
             Return </v-btn>
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