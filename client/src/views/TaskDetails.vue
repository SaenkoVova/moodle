<template>
  <v-container v-if="task">
    <h1 class="display-1">{{task.task.title}}</h1>
    <p>{{task.task.description}}</p>
    <h2 class="title">Методичні вказівки</h2>
    <div class="mb-10">
      <a v-for="(item, index) in task.task.attachments" :href="`http://localhost:5000/storage/${item}`" :key="index" target="_blank">{{item}}</a>
    </div>
    <div v-if="task.status === 'not_performed'">
      <v-file-input
          @change="setFiles"
          counter
          show-size
          truncate-length="15"
          outlined
          placeholder="Завантажте файл з рішенням"
      ></v-file-input>
      <v-btn large color="primary" block @click="addAnswer">Здати роботу</v-btn>
    </div>
    <v-alert v-else
        type="success"
    >
      Завдання відіслано на первірку
    </v-alert>
  </v-container>
</template>

<script>
  import http from "../util/http";

  export default {
    name: 'TaskDetails',
    props: {
      courseId: {
        type: String,
        required: true
      },
      taskId: {
        type: String,
        required: true
      }
    },
    data: () => ({
      file: null,
      task: null
    }),
    methods: {
      setFiles(event) {
        this.file = event;
      },
      addAnswer() {
        let formData = new FormData()
        formData.append('multipartFile', this.file);
        http.post('/task/add_answer', formData, {
          params: {
            courseId: this.courseId,
            taskId: this.taskId
          },
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(() => {
            this.task.status = 'performed'
          })
      },
      loadTaskDetails() {
        http.get('/task/load_task_details', {
          params: {
            taskId: this.taskId
          }
        })
          .then(res => {
            this.task = res.data;
            console.log(this.task)
          })
      }
    },
    mounted() {
      this.loadTaskDetails();
    }
  }
</script>
