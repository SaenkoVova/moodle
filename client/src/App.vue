<template>
  <v-app>
    <app-header></app-header>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import AppHeader from "./components/core/AppHeader";
export default {
  name: 'App',
  components: {AppHeader},
  data: () => ({
    //
  }),
};
</script>
