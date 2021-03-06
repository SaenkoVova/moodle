import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from "../views/SignIn";
import Dashboard from "../views/Dashboard";
import CreateUser from "../views/CreateUser";
import CreateClass from "../views/CreateClass";
import CreateCourse from "../views/CreateCourse";
import GroupDetails from "../views/GroupDetails";
import CourseDetails from "../views/CourseDetails";
import TaskDetails from "../views/TaskDetails";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      requiredAuth: true
    },
    component: Dashboard
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/create-user',
    name: 'CreateUser',
    meta: {
      requiredAuth: true
    },
    component: CreateUser
  },
  {
    path: '/create-class',
    name: 'CreateClass',
    meta: {
      requiredAuth: true
    },
    component: CreateClass
  },
  {
    path: '/create-course',
    name: 'CreateCourse',
    meta: {
      requiredAuth: true
    },
    component: CreateCourse
  },
  {
    path: '/group/:id',
    name: 'GroupDetails',
    meta: {
      requiredAuth: true
    },
    props: true,
    component: GroupDetails
  },
  {
    path: '/course/:id',
    name: 'CourseDetails',
    meta: {
      requiredAuth: true
    },
    props: true,
    component: CourseDetails
  },
  {
    path: '/course/:courseId/task/:taskId',
    name: 'TaskDetails',
    meta: {
      requiredAuth: true
    },
    props: true,
    component: TaskDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
