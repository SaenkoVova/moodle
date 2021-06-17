<template>
  <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          outlined
      >
        Переглянути роботи
      </v-btn>
    </template>
    <v-card>
      <v-toolbar
          dark
          color="primary"
      >
        <v-btn
            icon
            dark
            @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Оцінювання</v-toolbar-title>
      </v-toolbar>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Назва
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(item, index) in tasks"
              :key="index"
          >
            <td @click="loadUsersWithInvaluableWorks(item._id)">{{ item.title }} {{item._id}}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>


      <v-simple-table v-if="users.length">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Прізвище
            </th>
            <th class="text-left">
              Ім'я
            </th>
            <th class="text-left">
              По батькові
            </th>
            <th class="text-left">
              Email
            </th>
            <th class="text-left">
              Вкладення
            </th>
            <th class="text-left">
              Оцінка
            </th>
            <th class="text-left">
              Оцінити
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(item, index) in users"
              :key="index"
          >
            <td>{{ item.secondName }}</td>
            <td>{{ item.firstName }}</td>
            <td>{{ item.thirdName }}</td>
            <td>{{item.email}}</td>
            <td>
              <a :href="'http://localhost:5000/storage/answers/' + item.tasks[0].attachments[0]" target="_blank">{{item.tasks[0].attachments[0]}}</a>
            </td>
            <td>
              <v-text-field
                outlined
                placeholder="Оцінка"
                dense
                class="mt-5"
                v-model="point"
              />
            </td>
            <td>
              <v-btn :disabled="!point || !isFinite(point)" color="primary" @click="grade(item.tasks[0].taskId)">Оцінити</v-btn>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-dialog>
</template>

<script>

import http from "../../util/http";

export default {
  props: {
    courseId: {
      type: String,
      required: true
    },
    groupId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    dialog: false,
    users: [],
    tasks: [],
    point: null
  }),
  methods: {
    loadCourseTasks() {
      http.get('/course/load_course_tasks', {
        params: {
          courseId: this.courseId
        }
      })
        .then(res => {
          this.tasks = res.data;
        })
    },
    grade(taskId) {
      http.post('/user/grade', {
        taskId,
        point: this.point
      })
        .then(res => {
          alert(res.data.message);
          this.loadUsersWithInvaluableWorks(taskId);
        })
    },
    loadUsersWithInvaluableWorks(taskId) {
      http.get('/user/load_users_with_invaluable_works', {
        params: {
          courseId: this.courseId,
          groupId: this.groupId,
          taskId
        }
      })
        .then(res => {
          console.log(res.data)
          this.users = res.data;
        })
    }
  },
  mounted() {
    this.loadCourseTasks();
  }
}
</script>



