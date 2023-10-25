<script setup>
  import { ref } from "vue";
  import accServices from "../services/accommodationServices";
  import { useRouter } from "vue-router";

 const valid = ref(false);
  const router = useRouter();
  const message = ref("");

  const accommodation = ref({
  id: null,
  title: "Accommodation Title",
  type: "",
  semester: "",
  status: "Pending",
});


const saveAcc = () => {
  const data = {
    title: accommodation.value.title,
    type: accommodation.value.type,
    semester: accommodation.value.semester,
    status: accommodation.value.status,
    
  };
  accServices.create(data)
    .then((response) => {
      accommodation.value.id = response.data.id;
      console.log("add " + response.data);
      router.push({ path: "/" });
    })
    .catch((e) => {
      //console.log(e);
      message.value = e.response.data.message;
    });
};

const returnHome = () => {
  router.push({ path: "/" });
};


</script>

<template>
<div style="background-color: maroon; width 100%; height:50px; display:block;">
      <h1 style="color:white; text-align:center; margin:0px; padding-top:5px;">New Request</h1>
      </div>
<h1>Accommodation Request Creation</h1>
    <v-form v-model="valid" style="padding-top:50px;">

            <v-text-field v-model="accommodation.title" id="name" label="Name (*Admin edit only)" :counter="50" required hide-details disabled
            ></v-text-field>

      <v-container>
        <v-row>
          <v-col  cols="12"  md="4">
            <v-select v-model="accommodation.type" id="type" label="Type:" :items="['Housing','Ethos', 'Classroom',]" required hide-details
            ></v-select>
            <v-select v-model="accommodation.semester" id="type" label="Type:" :items="['Fall23','Winter23', 'Spring24', 'Summer24',]" required hide-details
            ></v-select>
          </v-col>
  
         <!-- <v-col cols="12" md="4" >
          <v-select v-model="course" label="Class" :items="['0','1', '2', '3', '4',]" > </v-select>
          </v-col>

            <v-col cols="12" md="4" >
            <v-text-field v-model="course.courseNum" label="Number" hide-details required></v-text-field>
          </v-col> -->

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

        <v-row>
            <v-col cols="auto">
            <v-btn  block class="text-none mb-4"   color="#AD1212"  variant="flat" @click="saveAcc()">
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