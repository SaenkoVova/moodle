<template>
  <v-container>
    <h1 class="display-1">{{`${getUser.secondName} ${getUser.firstName} ${getUser.thirdName}`}}</h1>
    <v-row>
      <v-col :cols="4" v-for="(item, index) in courses" :key="index">
        <v-card
            height="200px"
            :style="`background-color:${colors[getRandomInt(11)]}`"
            elevation="5"
            :to="`/course/${item._id}`"
        >
          <h1 class="display-1 ma-5 pa-5" style="color: #fff">{{item.title}}</h1>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import http from "../../util/http";
  import {mapGetters} from "vuex";

  export default {
    name: 'StudentDashboard',
    data: () => ({
      courses: [],
      colors: [
        '#1abc9c',
        '#2ecc71',
        '#3498db',
        '#16a085',
        '#27ae60',
        '#2980b9',
        '#f1c40f',
        '#e67e22',
        '#e74c3c',
        '#f39c12',
        '#d35400',
        '#c0392b'
      ],
    }),
    computed: {
      ...mapGetters({
        getUser: 'user/getUser'
      })
    },
    methods: {
      getRandomInt: max => {
        return Math.floor(Math.random() * max)
      },
      loadUserCourses() {
        http.get('/group/load_user_courses')
          .then(res => {
            this.courses = res.data
          })
      }
    },
    mounted() {
      this.loadUserCourses();
    }
  }
</script>
