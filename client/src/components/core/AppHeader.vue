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

    <div v-if="isAuthorized && getUserRole === 'teacher'">
      <v-btn v-for="(item, index) in teacherMenu" :key="index" :to="item.path" large class="mx-1">
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
          path: '/sign-in'
        }
      ],
      teacherMenu: [
        {
          title: 'Головна',
          path: '/dashboard'
        },
        {
          title: 'Створити клас',
          path: '/create-class'
        },
        {
          title: 'Додати користувача',
          path: '/create-user'
        },
        {
          title: 'Додати предмет',
          path: '/create-course'
        }
      ]
    }),
    computed: {
      ...mapGetters({
        getUserRole: 'user/getUserRole',
        isAuthorized: 'user/isAuthorized'
      })
    }
  }
</script>
