<template>
  <v-container>
    <teacher-dashboard v-if="getUserRole === 'teacher'"></teacher-dashboard>
    <student-dashboard v-if="getUserRole === 'student'"></student-dashboard>
  </v-container>
</template>

<script>
  import TeacherDashboard from "../components/dashboard/TeacherDashboard";
  import StudentDashboard from "../components/dashboard/StudentDashboard";
  import {mapGetters} from "vuex";
  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters({
        getUserRole: 'user/getUserRole'
      })
    },
    components: {StudentDashboard, TeacherDashboard}
  }
</script>
