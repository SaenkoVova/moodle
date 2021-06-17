<template>
  <v-container>
    <h1 class="display-1 mb-5">{{title}}</h1>
    <p class="title">Опис курсу:</p>
    <p>{{description}}</p>
    <p class="title">Викладачі курсу:</p>
    <v-list-item two-line v-for="(item, index) in teachers" :key="index">
      <v-list-item-content>
        <v-list-item-title>{{`${item.secondName} ${item.firstName} ${item.thirdName}`}}</v-list-item-title>
        <v-list-item-subtitle>{{item.email}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <div>
      <h2 class="title">Завдання курсу</h2>
      <v-list>
        <v-list-item v-for="(item, index) in tasks" :key="index">
          <v-list-item-content>
            <router-link :to="`/course/${id}/task/${item._id}`">
              <v-list-item-title style="font-size: 20px; color: cornflowerblue" class="font-weight-bold">{{item.title}}</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-container>
</template>

<script>
  import http from "../util/http";

  export default {
    name: 'CourseDetails',
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data: () => ({
      description: null,
      tasks: [],
      teachers: [],
      title: null
    }),
    methods: {
      loadCourseInfo() {
        http.get('/course/load_course_details', {
          params: {
            courseId: this.id
          }
        })
          .then(res => {
            this.tasks = res.data.tasks;
            this.teachers = res.data.teachers;
            this.title = res.data.title;
            this.description = res.data.description;
          })
      }
    },
    mounted() {
      this.loadCourseInfo();
    }
  }
</script>
