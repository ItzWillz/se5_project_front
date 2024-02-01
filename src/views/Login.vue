<script setup>
import SocialLogin from "../components/SocialLogin.vue";
</script>

<template>
  <v-container>
<v-toolbar>
      <v-toolbar-title>Accommodation Sign-In</v-toolbar-title>
    </v-toolbar>
    </v-container>
<div class="component">
  <h1>Hello</h1>
    <img class="rectangle" alt="Rectangle" src="./rectangle-1.png" />
  </div>
    <h1>Login</h1>
    <br />
    <SocialLogin />
    <br /><br />
  
</template>


<style>
h1{
  text-align: center;
  color: maroon;
}
.component {
  background-image: url(./rectangle-2.png);
  background-size: 100% 100%;
  height: 388px;
  position: relative;
  width: 1440px;
}

.component .rectangle {
  height: 388px;
  left: 0;
  position: absolute;
  top: 0;
  width: 1440px;
}

</style>