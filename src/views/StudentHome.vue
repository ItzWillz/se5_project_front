<script setup>
import Utils from "../config/utils";
import { useRouter } from "vue-router";
import accReqServices from "../services/accReqServices";
import studentServices from "../services/studentServices";
import stuAccServices from "../services/stuaccommodationServices";

const router = useRouter();

const user = Utils.getStore("user")

 import { ref, onMounted } from "vue";
 import Listbox from "primevue/listbox";

 const selectedAcc = ref();
 const accReq = ref([]);
 const selectedStuAcc = ref();
 const stuAcc = ref([]);
 const activeTab = ref('requests');


let stuId = null;

studentServices.getStudentIdByUserId(Utils.getStore("user").userId)
.then((response) => {
  stuId = response.data.id
  retrieveAccReq();
  retrieveStuAcc();
}).catch((e) => {
  console.log(e)
});

const retrieveAccReq = () => {
  accReqServices.getAllForUser(stuId)
    .then((response) => {
      console.log(response.data)
      accReq.value = response.data;
    })
    .catch((e) => {
        console.log(e);
    //   message.value = e.response.data.message;
    });
};

const display = (accReq) => accReq.type + " " + accReq.semester;


const retrieveStuAcc = () => {
  stuAccServices.getAllForUser(stuId)
    .then((response) => {
      console.log(response.data)
      stuAcc.value = response.data;
    })
    .catch((e) => {
        console.log(e);
    //   message.value = e.response.data.message;
    });
};

const studisplay = (stuAcc) => stuAcc.accommodationId + " " + stuAcc.semester;

// const deleteAcc = () => {
//   accServices.delete(selectedAcc.value)
//     .finally(() => {
//         router.go();
//     });
// };
    
const newAcc =() => {
     router.push({ name: 'add'});
};

// const updateAcc =() => {
//   if (!selectedAcc.value) {
//     console.error('Error: No course selected.');
//     return;
//   }
//   router.push({ name: 'studentupdate', params: { id: selectedAcc.value } });
// };

// const viewAcc = () => {
//   if (!selectedAcc.value) {
//     console.error('Error: No course selected.');
//     return;
//   }
//   router.push({ name: 'viewAcc', params: { id: selectedAcc.value } });
// };

</script>

<style>
.test{
    color: white;
    background-color: maroon;
    width: 100px;
    height: 60px;
    border-radius: 10px;
    padding: 10px;
    margin: 20px;
    border: none;
}
.column {
    display: flex;
    column-gap: 150px;
  }
</style>
<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Welcome, {{ user.fName }}!</v-toolbar-title>
    </v-toolbar>

    <v-tabs v-model="activeTab">
      <v-tab value="requests">
        <template v-slot:default>
          <div class="tab-label">Accommodation Requests</div>
        </template>
      </v-tab>
      <v-tab value="accommodations">
        <template v-slot:default>
          <div class="tab-label">Current Accommodations</div>
        </template>
      </v-tab>
    </v-tabs>

    <v-tab-item v-if="activeTab === 'requests'">
      <v-row>
        <v-col>
          <h2>Accommodation Requests</h2>
          <Listbox
            v-model="selectedAcc"
            :options="accReq"
            filter
            :optionLabel="display"
            optionValue="id"
            :virtualScrollerOptions="{ itemSize: 38 }"
            class="w-full md:w-14rem"
            listStyle="height: 450px"
          />
        </v-col>

        <v-col>
          <div style="margin-top: 0.1rem">
            <h2 style="text-align: center;">Actions</h2>
            <div style="margin-left: 150px;">
              <div class="row">
                <button class="test" @click="newAcc()">Request New</button>
                <button class="test" @click="updateAcc(accommodation)">Request changes</button>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-tab-item>

    <v-tab-item v-if="activeTab === 'accommodations'">
      <v-row>
        <v-col>
          <h2>Current Accommodations</h2>
          <Listbox
            v-model="selectedStuAcc"
            :options="stuAcc"
            filter
            :optionLabel="studisplay"
            optionValue="id"
            :virtualScrollerOptions="{ itemSize: 38 }"
            class="w-full md:w-14rem"
            listStyle="height: 450px"
          />
        </v-col>

        <v-col>
          <div style="margin-top: 0.1rem">
            <h2 style="text-align: center;">Actions</h2>
            <div style="margin-left: 220px;">
              <div class="row">
                <button class="test" @click="viewAcc(accommodation)">View</button>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-tab-item>
  </v-container>
</template>
