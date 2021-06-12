<template>
  <v-app>
    <app-header/>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppHeader from "@/components/core/AppHeader.vue";

export default Vue.extend({
  name: 'App',
  components: {AppHeader},
  data: () => ({
    //
  }),
});
</script>
