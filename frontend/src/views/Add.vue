<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>Aggiungi articolo al carrello</v-card-title>

      <v-card-text>
        <v-radio-group v-model="radioGroup">
          <v-radio label="In un nuovo ordine" :value="0"></v-radio>
          <v-radio label="In un ordine già esistente" :value="1"></v-radio>
        </v-radio-group>

        <v-autocomplete
          v-show="radioGroup == 1"
          v-model="order"
          label="Ordini aperti"
          :items="pendingOrders"
        ></v-autocomplete>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancel">Annulla</v-btn>
        <v-btn color="success" @click="addToCart">Aggiungi</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Add",
  props: {
    articleID: {
      type: [String, Number],
      required: true
    }
  },
  data: () => ({
    dialog: true,
    radioGroup: 0,
    order: null
  }),
  computed: {
    ...mapGetters("orders", ["pending"]),
    pendingOrders() {
      return this.pending.map(order => order.id);
    }
  },
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
