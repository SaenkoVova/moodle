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
import {mapActions} from "vuex";
export default {
  name: 'App',
  methods: {
    ...mapActions({
      loadPersonalInfo: 'user/loadPersonalInfo'
    })
  },
  mounted() {
    this.loadPersonalInfo();
  },
  components: {AppHeader},
};
</script>
