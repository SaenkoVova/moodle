<template>
  <v-container>
    <h1 class="display-1 mb-5">Панель створення класу</h1>
    <v-row>
      <v-col :cols="5">
        <v-form v-model="valid" @submit.prevent="createGroup">
          <v-text-field
              outlined
              placeholder="Номер класу (10-Б)"
              v-model="classSymbol"
              :rules="[rules.required]"
          />
          <v-select
              @change="addClassTeacher"
              :items="teachers"
              label="Оберіть класного керівника"
              outlined
              :rules="[rules.required]"
          ></v-select>
          <v-select
              @change="addStudent"
              :items="students"
              label="Оберіть учня"
              outlined
              :rules="[rules.required]"
          ></v-select>
          <v-select
              @change="addCourse"
              :items="courses"
              label="Оберіть предмети"
              outlined
              :rules="[rules.required]"
          ></v-select>
          <v-btn large block color="primary" type="submit" :disabled="!valid || !selectedStudents.length || !teacherEmail || !selectedCourses">Створити клас</v-btn>
        </v-form>
      </v-col>
      <v-col :cols="7">
        <div v-if="teacherFirstName">
          <h1 class="title">
            Класний керівник
          </h1>
          <h2 class="body-1">
            {{getTeacherFullName}}
          </h2>
        </div>
        <div v-if="selectedStudents.length">
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
                  v-for="(item, index) in selectedStudents"
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
        </div>
        <div v-if="selectedCourses.length">
          <h2 class="title">Список предметів</h2>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Ідентифікатор
                </th>
                <th class="text-left">
                  Назва
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(item, index) in selectedCourses"
                  :key="index"
              >
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import http from "../util/http";

  export default {
    name: 'CreateClass',
    data: () => ({
      rules: {
        required: value => !!value || 'Це поле обов\'язкове.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Неправильний e-mail.'
        },
      },
      classSymbol: '',
      teacherFirstName: null,
      teacherSecondName: null,
      teacherThirdName: null,
      teacherEmail: null,
      students: [],
      teachers: [],
      courses: [],
      selectedStudents: [],
      selectedCourses: [],
      valid: false
    }),
    computed: {
      getTeacherFullName() {
        return `${this.teacherFirstName} ${this.teacherSecondName} ${this.teacherThirdName} ${this.teacherEmail}`
      }
    },
    methods: {
      addStudent(val) {
        let details = val.split(' ');
        let candidate = this.selectedStudents.find(i => i.email === details[3])
        if(candidate) {
          alert('Ви вже додали студенда в список');
          return;
        }
        const payload = {
          firstName: details[0],
          secondName: details[1],
          thirdName: details[2],
          email: details[3]
        }
        this.selectedStudents.push(payload)
      },
      addCourse(val) {
        let details = val.split(' ');
        let candidate = this.selectedCourses.find(i => i.id === details[0])
        if(candidate) {
          alert('Ви вже додали курс в список');
          return;
        }
        const payload = {
          id: details.splice(0, 1)[0],
          title: details.join(' ')
        }
        this.selectedCourses.push(payload)
      },
      addClassTeacher(val) {
        let details = val.split(' ');
        this.teacherFirstName = details[0];
        this.teacherSecondName = details[1];
        this.teacherThirdName = details[2];
        this.teacherEmail = details[3];
      },
      loadStudents() {
        http.get('/user/load_students')
          .then(res => {
            this.students = res.data.map(i => `${i.secondName} ${i.firstName} ${i.thirdName} ${i.email}`)
          })
      },
      loadCourses() {
        http.get('/course/load_courses')
          .then(res => {
            this.courses = res.data.map(i => `${i._id} ${i.title}`);
          })
      },
      loadTeachers() {
        http.get('/user/load_teachers')
          .then(res => {
            this.teachers = res.data.map(i => `${i.secondName} ${i.firstName} ${i.thirdName} ${i.email}`)
          })
      },
      createGroup() {
        const payload = {
          classTeacher: {
            firstName: this.teacherFirstName,
            secondName: this.teacherSecondName,
            thirdName: this.teacherThirdName,
            email: this.teacherEmail
          },
          classSymbol: this.classSymbol,
          students: this.selectedStudents,
          courses: this.selectedCourses
        }
        http.post('/group/create_group', payload)
          .then(res => {
            alert(res.data.message)
          })
          .catch(err => {
            alert(err.response.data.message)
          })
      }
    },
    mounted() {
      this.loadStudents();
      this.loadTeachers();
      this.loadCourses();
    }
  }
</script>
