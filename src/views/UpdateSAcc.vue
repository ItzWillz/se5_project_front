<script setup>
  import { ref } from "vue";
  //import CourseServices from "../services/courseServices";
  import { useRouter } from "vue-router";
import accReqServices from "../services/accReqServices";

  const router = useRouter();
  const course = ref({});
  const valid = ref(false);

//   const props = defineProps({
//   id: {
//     required: true,
//   },
// });

const accommodation = ref({
  schoolId: "",
  semester: "",
  type: "",
  status: "",
  studentId: "",
})

const returnHome = () => {
  router.push({ path: "/student" });
};

// const editAcc = async () => {
//   const data = {
//     schoolId: accomadation.value.schoolId,
//     type: accomadation.value.type,
//     semester: accommodation.value.semester,
//     status: accomadation.value.status,
//     studentId: accomadation.value.studentId,
   
//   };
//   try {
//     const response = await AccServices.update(props.id, data);
//     accomadation.value.accomadationNum = response.data.id;
//     router.push({ name: "accomadation" });
//   } 
//   catch (e) {
//     console.log(e.response.data.message);
//     //message.value = e.response.data.message;
//   }
// };


</script>

<template>
<div style="background-color: maroon; width 100%; height:50px; display:block;">
      <h1 style="color:white; text-align:center; margin:0px; padding-top:5px;">Request Changes</h1>
      </div>
    <v-form v-model="valid" style="padding-top:50px;">


      <v-container>
           
           <v-row>
            <!-- <v-col  cols="4"  md="4">
              <v-text-field v-model="accommodation.body" id="fname" label="First Name:" :counter="50" required hide-details 
            ></v-text-field>
            </v-col>
            <v-col  cols="4"  md="4">
              <v-text-field v-model="accommodation.body" id="lname" label="Last Name:" :counter="50" required hide-details 
            ></v-text-field>
            </v-col> -->
            <v-col  cols="4"  md="4">
              <v-text-field v-model="accommodation.schoolId" id="schoolId" label="Student ID:" :counter="50" required hide-details 
            ></v-text-field>
            </v-col>
           </v-row>

        <v-row>
          <v-col  cols="12"  md="4">
            <v-select v-model="accommodation.type" id="type" label="Type:" :items="['Housing','Ethos', 'Classroom',]" required hide-details
            ></v-select>
            </v-col>

            <v-col  cols="12"  md="4">
            <v-select v-model="accommodation.semester" id="semester" label="Semester:" :items="['Fall 23','Winter 23', 'Spring 24', 'Summer 24',]" required hide-details
            ></v-select>
          </v-col>

              </v-row>
             
           

        <v-row>
          <v-col cols="12" >
            <h3>Documents:</h3>
            <v-row>
            <v-col cols="auto">
            <v-btn>Agreement Form</v-btn>
            </v-col>
            <v-col cols="auto">
            <v-btn>Upload</v-btn>
            </v-col>
            <v-col cols="auto">
            <v-btn>Delete</v-btn>
            </v-col>
            </v-row>
            <Listbox v-model="selectedfile"  :options='files' filter optionLabel= 'name' optionValue="fileNum" />
          </v-col>
        </v-row>

        <v-row >
            <v-col class="text-right">
            <v-btn  style="margin-right:30px; margin-top:30px; color:white; width:200px; height:50px; font-size: 20px"  class="text-none mb-4" color="#AD1212"  variant="flat" @click="editAcc">
             Submit </v-btn>
            <v-btn  style="margin-left:30px; margin-top:30px; color:white; width:200px; height:50px; font-size:20px" class="text-none mb-4"   color="#AD1212"  variant="flat" @click="returnHome()">
             Exit </v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-form>
  </template>

