<template>
  <v-container>
    <h1 class="display-1 mb-5">Панель створення користувача</h1>
    <v-form v-model="valid" @submit.prevent="createUser">
      <v-row>
        <v-col>
          <v-text-field
              outlined
              :rules="[rules.required]"
              placeholder="Ім'я"
              v-model="firstName"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
              outlined
              placeholder="Прізвище"
              :rules="[rules.required]"
              v-model="secondName"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
              outlined
              placeholder="По батькові"
              :rules="[rules.required]"
              v-model="thirdName"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
              outlined
              placeholder="Електронна адреса"
              :rules="[rules.required, rules.email]"
              v-model="email"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
              @change="setRole"
              :items="['Вчитель', 'Учень']"
              label="Оберіть роль"
              outlined
              :rules="[rules.required]"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn large block color="primary" :disabled="!valid" type="submit">Створити користувача</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  import http from "../util/http";

  export default {
    name: 'CreateUser',
    data: () => ({
      firstName: '',
      secondName: '',
      thirdName: '',
      email: '',
      role: '',
      rules: {
        required: value => !!value || 'Це поле обов\'язкове.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Неправильний e-mail.'
        },
      },
      valid: false,
    }),
    methods: {
      setRole(val) {
        console.log(val)
        if(val === 'Вчитель') {
          this.role = 'teacher'
        }
        else if(val === 'Учень') {
          this.role = 'student'
        }
        else {
          this.role = null;
        }
      },
      createUser() {
        const payload = {
          firstName: this.firstName,
          secondName: this.secondName,
          thirdName: this.thirdName,
          email: this.email,
          role: this.role
        }
        http.post('/user/create_user', payload)
          .then((res) => {
            alert(res.data.message);
            this.firstName = '';
            this.secondName = '';
            this.thirdName = '';
            this.email = '';
            this.role = null;
          })
          .catch((err) => {
            alert(err.response.data.message)
          })
      }
    }
  }
</script>
