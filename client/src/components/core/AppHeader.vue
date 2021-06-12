<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <div class="d-flex align-center">
      <h1>My moodle</h1>
    </div>

    <v-spacer></v-spacer>

    <div v-if="!isAuthorized">
      <v-btn v-for="(item, index) in unauthorizedMenu" :key="index" :to="item.path" large>
        {{item.title}}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    data: () => ({
      unauthorizedMenu: [
        {
          title: 'Увійти',
          path: '/login'
        }
      ]
    }),
    computed: {
      ...mapGetters({
        isAuthorized: 'user/isAuthorized'
      })
    }
  }
</script>
