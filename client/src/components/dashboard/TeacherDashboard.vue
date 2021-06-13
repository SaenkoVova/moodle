<template>
  <div>
    <h1 class="display-1">Панель керування</h1>
    <v-row>
      <v-col :cols="3" v-for="(item, index) in groups" :key="index">
        <v-card
            elevation="5"
            :to="`/group/${item._id}`"
        >
          <h1 class="display-1 ma-5 pa-5">{{item.classSymbol}}</h1>
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
    groups: []
  }),
  methods: {
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
