<script setup>
//import SocialLogin from "../components/SocialLogin.vue";

let user = "Andrew";
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Welcome, {{user}}! </v-toolbar-title>
    </v-toolbar>

 <div class="column">    
<div class="card flex justify-content-center">
        <Listbox v-model="selectedCourse"  :options='course' filter optionLabel= 'name' optionValue="courseNum" 
        :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-14rem" listStyle="height:450px" />

    </div>
 </div>
        <button @click="newAcc()">
        New Accomadtion</button>
        <button @click="viewAcc(accomadation)">
        View Accomadtion </button>
  </v-container>
</template>