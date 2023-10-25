<script setup>
import Utils from "../config/utils"

const user = Utils.getStore("user")
console.log(user)

</script>

<template>
  <v-container >
    Hello, this is the Student Home.

  </v-container>
</template>