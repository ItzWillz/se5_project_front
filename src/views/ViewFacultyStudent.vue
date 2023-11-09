<script setup>
import Utils from "../config/utils";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import accServices from "../services/stuaccommodationServices";
import Listbox from "primevue/listbox";

const router = useRouter();

const user = Utils.getStore("user")
console.log(user)

const selectedStudentAcc = ref();

  const props = defineProps({
  id: {
    required: true,
  },
});

console.log(props.id);
const studentAcc = ref([]);

const retrieveStudentAcc = () => {
  accServices.getAllForUser(props.id)
    .then((response) => {
      studentAcc.value = response.data;
    })
    .catch((e) => {
        console.log(e);
    //   message.value = e.response.data.message;
    });
};

retrieveStudentAcc();

const studisplay = (stuAcc) => stuAcc.accommodationId + " " + stuAcc.semester;

const viewStudentAcc = () => {
  if (!selectedStudentAcc.value) {
    console.error('Error: No course selected.');
    return;
  }
  router.push({ name: 'viewSAcc', params: { id: selectedStudentAcc.value } });
};

</script>

<template>
  <v-container>

 <div class="column">    
    <h3>Accommodations</h3>
<div class="card flex justify-content-center">
        <Listbox v-model="selectedStudentAcc"  :options='studentAcc' filter :optionLabel= 'studisplay' optionValue="id" 
        :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:450px" />

    </div>
 </div>

    <div style="margin-top: 7rem"> 
      <h1 style="text-align: center;">Actions</h1>
      <div class="row">
       <button @click="viewStudentAcc(student)">View Accomidation</button>
      </div>
      </div>

        
  </v-container>
</template>