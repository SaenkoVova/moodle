<template>
  <v-container fluid style="background: #8e44ad; height: calc(100vh - 64px);" class="d-flex align-center justify-center">
    <router-link :to="'/dashboard'" style="color: #fff; text-decoration: none">
      <h1 style="text-align: center; font-size: 70px">Вас вітає система</h1>
      <h1 style="font-size: 100px; text-align: center">My moodle</h1>
    </router-link>
  </v-container>
</template>

<script>

  export default {
    name: 'Home',
  }
</script>
