<script setup>
import Utils from "../config/utils";
import { useRouter } from "vue-router";

const router = useRouter();

const user = Utils.getStore("user")
console.log(user)

</script>


<template>
  <v-container>
    Hello, this is the Admin Home.

  </v-container>
</template>