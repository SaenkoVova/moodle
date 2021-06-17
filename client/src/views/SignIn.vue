<template>
  <v-form v-model="valid" @submit.prevent="signIn" class="mx-5 mt-5">
    <h1 class="display-1 mb-5">
      Вхід
    </h1>
    <v-row>
      <v-text-field
          :rules="[rules.required, rules.email]"
          label="Email"
          outlined
          v-model="email"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
          :rules="[rules.required]"
          label="Пароль"
          outlined
          type="password"
          v-model="password"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-btn block large :disabled="!valid" type="submit">Увійти</v-btn>
    </v-row>
  </v-form>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    name: 'SignUp',
    data: () => ({
      rules: {
        required: value => !!value || 'Це поле обов\'язкове.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Неправильний e-mail.'
        },
      },
      valid: false,
      email: '',
      password: ''
    }),
    methods: {
      ...mapActions({
        logIn: 'user/logIn',
        loadPersonalInfo: 'user/loadPersonalInfo'
      }),
      async signIn() {
        const payload = {
          email: this.email,
          password: this.password
        }
        try {
          await this.logIn(payload);
          await this.loadPersonalInfo();
          await this.$router.push('/dashboard')
        } catch (e) {
          alert(e.response.data.message)
        }
      }
    }
  }
</script>
