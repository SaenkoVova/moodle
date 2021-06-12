<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <div class="d-flex align-center">
      <h1>Moodle</h1>
    </div>

    <v-spacer></v-spacer>

    <v-btn>

    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import User from '@/interfaces/User'
import {namespace} from "vuex-class";

const user = namespace('user')

interface MenuItem {
  title: string
  path: string
}

@Component
export default class AppHeader extends Vue{

  private isNotAuthorizedMenu: Array<MenuItem> = [
    {
      title: 'Увійти',
      path: '/login'
    }
  ]

  private studentMenu: Array<MenuItem> = [
    {
      title: 'Мої курси',
      path: '/courses'
    },
    {
      title: 'Профіль',
      path: '/profile'
    }
  ]

  private teacherMenu: Array<MenuItem> = [
    {
      title: 'Створити курс',
      path: 'create-course'
    }
  ]

  @user.Action
  public signUp!: (payload: User) => Promise<void>
  @user.Getter
  public getToken!: string
}
</script>
