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
  router.push({ name: 'viewASA', params: { id: props.id, stuid: selectedStudentAcc.value } });
};

const Return = () => {
  router.push({ name: 'search'});
};

</script>

<template>
  <v-container>

 <v-row style="margin-top=0.1rem">    
  <v-col>
    <h3> Accommodations</h3>
        <Listbox v-model="selectedStudentAcc"  :options='studentAcc' :optionLabel= 'studisplay' optionValue="id" 
        :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:450px; margin-top: 0.2rem; margin-left: 0.2rem;" />

    </v-col>

    <v-col> 
      <h1 style="text-align: center;">Actions</h1>
          <div class="text-center">
       <button style="width:150px; height:60px" @click="viewStudentAcc(student)">View Accomodation</button>
              </div>
       
      </v-col>
      </v-row>
      <div class="text-right">
       <button  @click="Return()">Return</button>
      </div>

        
  </v-container>
</template>