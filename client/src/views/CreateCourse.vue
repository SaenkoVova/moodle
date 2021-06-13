<template>
  <v-container>
    <h1 class="display-1 mb-5">Панель створення курсу</h1>
    <v-row>
      <v-col :cols="5">
        <v-form v-model="valid" @submit.prevent="createCourse">
          <v-text-field
              outlined
              placeholder="Назва курсу"
              v-model="title"
              :rules="[rules.required]"
          />
          <v-textarea
              outlined
              placeholder="Опис курсу"
              v-model="description"
              :rules="[rules.required]"
          />
          <v-select
              @change="addTeachers"
              :items="teachers"
              label="Оберіть викладачів курсу"
              outlined
              :rules="[rules.required]"
          ></v-select>
          <v-btn large block color="primary" type="submit" :disabled="!valid || !selectedTeachers.length">Створити курс</v-btn>
        </v-form>
      </v-col>
      <v-col :cols="7">
        <div v-if="selectedTeachers.length">
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Ім'я
                </th>
                <th class="text-left">
                  Прізвище
                </th>
                <th class="text-left">
                  По батькові
                </th>
                <th class="text-left">
                  Електронна адреса
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(item, index) in selectedTeachers"
                  :key="index"
              >
                <td>{{ item.firstName }}</td>
                <td>{{ item.secondName }}</td>
                <td>{{ item.thirdName }}</td>
                <td>{{ item.email }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import http from "../util/http";

  export default {
    name: 'CreateCourse',
    data: () => ({
      valid: false,
      rules: {
        required: value => !!value || 'Це поле обов\'язкове.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Неправильний e-mail.'
        },
      },
      teachers: [],
      title: '',
      description: '',
      selectedTeachers: []
    }),
    methods: {
      addTeachers(val) {
        let details = val.split(' ');
        let candidate = this.selectedTeachers.find(i => i.email === details[3])
        if(candidate) {
          alert('Ви вже додали викладача в список');
          return;
        }
        const payload = {
          firstName: details[0],
          secondName: details[1],
          thirdName: details[2],
          email: details[3]
        }
        this.selectedTeachers.push(payload)
      },
      loadTeachers() {
        http.get('/user/load_teachers')
            .then(res => {
              this.teachers = res.data.map(i => `${i.secondName} ${i.firstName} ${i.thirdName} ${i.email}`)
            })
      },
      createCourse() {
        const payload = {
          title: this.title,
          description: this.description,
          teachers: this.selectedTeachers
        }
        http.post('/course/create_course', payload)
            .then(res => {
              this.title = '';
              this.description = '';
              this.selectedTeachers = [];
              alert(res.data.message)
            })
            .catch(err => {
              alert(err.response.data.message)
            })
      }
    },
    mounted() {
      this.loadTeachers();
    }
  }
</script>
