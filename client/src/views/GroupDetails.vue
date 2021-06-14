<template>
  <v-container fluid class="pa-5">
    <v-row>
      <v-col>
        <h2 class="title">Список учнів класу</h2>
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
                v-for="(item, index) in students"
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
      </v-col>
      <v-col>
        <h2 class="title">Список предметів класу</h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Назва курсу
              </th>
              <th class="text-left">
                Дії
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(item, index) in courses"
                :key="index"
            >
              <td>{{ item.title }}</td>
              <td>
                <add-task :courseId="item._id" :groupId="id"></add-task>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import http from "../util/http";
  import AddTask from "../components/modals/AddTask";

  export default {
    name: 'GroupDetail',
    components: {AddTask},
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data: () => ({
      students: [],
      courses: []
    }),
    methods: {
      loadGroupStudents() {
        http.get('/group/load_group_students', {
          params: {
            groupId: this.id
          }
        })
          .then(res => {
            this.students = res.data
          })
      },
      loadGroupCourses() {
        http.get('/group/load_group_courses', {
          params: {
            groupId: this.id
          }
        })
            .then(res => {
              this.courses = res.data
            })
      }
    },
    mounted() {
      this.loadGroupStudents();
      this.loadGroupCourses();
    }
  }
</script>
