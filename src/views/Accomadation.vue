<script setup>
import Student from "../components/Student.vue";
import Admin from "../components/Admin.vue";
import Professor from "../components/Professor.vue";

</script>

<template>
  <v-container >
    <Student v-if="user.role=student"/>
    <Admin v-if="user.role=admin" />
    <Professor v-if="user.role=faculty"/>

  </v-container>
</template>