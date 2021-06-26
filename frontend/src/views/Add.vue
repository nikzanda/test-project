<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      {{ articleID }}
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancel">Annulla</v-btn>
        <v-btn color="success" @click="addToCart">Aggiungi</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Add",
  props: {
    articleID: {
      type: [String, Number],
      required: true
    }
  },
  data: () => ({
    dialog: true
  }),
  methods: {
    cancel() {
      this.dialog = false;
      this.$router.push({ name: "articles" });
    },
    addToCart() {
      this.dialog = false;
      this.$router.push({ name: "articles" });
    }
  }
};
</script>
