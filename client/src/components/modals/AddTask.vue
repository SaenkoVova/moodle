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
        Додати завдання
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
        <v-toolbar-title>Додати завдання</v-toolbar-title>
      </v-toolbar>
      <div class="pa-5">
        <v-form @submit.prevent="addTask" v-model="valid">
          <v-text-field
              outlined
              placeholder="Назва завдання"
              v-model="title"
          />
          <v-textarea
              outlined
              placeholder="Опис завдання"
              v-model="description"
          />
          <v-file-input
              @change="setFiles"
              counter
              show-size
              truncate-length="15"
              outlined
              placeholder="Завантажте методичні рекомендації"
          ></v-file-input>
          <v-btn :disabled="!valid" color="primary" block large @click="addTask">Додати завдання</v-btn>
        </v-form>
      </div>
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
      title: '',
      description: '',
      file: null,
      valid: false
    }),
    methods: {
      setFiles(event) {
        this.file = event;
      },
      addTask() {
        let formData = new FormData()
        formData.append('multipartFile', this.file);
        formData.append('title', this.title);
        formData.append('description', this.description);
        http.post('/task/create_task', formData, {
          params: {
            courseId: this.courseId,
            groupId: this.groupId
          },
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            alert(res.data.message);
          })
      }
    }
  }
</script>
