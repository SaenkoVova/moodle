<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <div class="d-flex align-center">
      <router-link :to="'/dashboard'" style="color: #fff; text-decoration: none">
        <h1>My moodle</h1>
      </router-link>
    </div>
    <v-toolbar color="primary" elevation="0">
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!isAuthorized">
        <v-btn color="primary" tile elevation="0" v-for="(item, index) in unauthorizedMenu" :key="index" :to="item.path" large>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-if="isAuthorized && getUserRole === 'teacher'">
        <v-btn color="primary" v-for="(item, index) in teacherMenu" :key="index" :to="item.path" elevation="0">
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
      <div>
        <v-btn v-if="isAuthorized" color="primary" tile elevation="10" large class="mx-2" @click="logOut">Вийти</v-btn>
      </div>
    </v-toolbar>
  </v-app-bar>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

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
    },
    methods: {
      ...mapMutations({
        unsetUser: 'user/unsetUser',
        unsetToken: 'user/unsetToken'
      }),
      logOut() {
        this.unsetUser();
        this.unsetToken();
        this.$router.push('/sign-in')
      }
    }
  }
</script>
