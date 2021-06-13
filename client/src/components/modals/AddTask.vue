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
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
              dark
              text
              @click="dialog = false"
          >
            Зберегти
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="pa-5">
        <v-text-field
          outlined
          placeholder="Назва завдання"
        />
        <v-textarea
            outlined
            placeholder="Опис завдання"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    })
  }
</script>
