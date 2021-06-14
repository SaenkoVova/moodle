<template>
  <div>
    <h1 class="display-1">Панель керування</h1>
    <v-row>
      <v-col :cols="3" v-for="(item, index) in groups" :key="index">
        <v-card
            :style="`background-color:${colors[getRandomInt(11)]}`"
            elevation="5"
            :to="`/group/${item._id}`"
        >
          <h1 class="display-2 ma-5 pa-5" style="color: #fff">{{item.classSymbol}}</h1>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import http from "../../util/http";

export default {
  name: 'TeacherDashboard',
  data: () => ({
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
    groups: []
  }),
  methods: {
    getRandomInt: max => {
      return Math.floor(Math.random() * max)
    },
    loadGroups() {
      http.get('/group/load_groups')
        .then(res => {
          this.groups = res.data;
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  },
  mounted() {
    this.loadGroups();
  }
}
</script>
