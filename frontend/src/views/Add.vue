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
          auto-select-first
          :error="error"
          :error-messages="errorText"
        ></v-autocomplete>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancel">Annulla</v-btn>
        <v-btn color="success" @click="addToCart" :loading="loading">
          Aggiungi
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
    order: null,
    loading: false,
    error: null,
    errorText: ""
  }),
  computed: {
    ...mapGetters("orders", { pending: "pending", getOrder: "order" }),
    pendingOrders() {
      return this.pending.map(order => order.id);
    }
  },
  methods: {
    ...mapActions("orders", ["setOrders"]),
    cancel() {
      this.dialog = false;
      this.$router.push({ name: "articles" });
    },
    addToCart() {
      this.loading = true;
      const article = { id: this.articleID, quantity: 1 };

      if (this.radioGroup === 0) {
        this.$axios
          .post("/orders/", {
            articles: [article]
          })
          .then(() => {
            this.dialog = false;
            this.setOrders();
            this.$router.push({ name: "cart" });
          })
          .catch(error => {
            console.log(error.response);
          })
          .finally(() => (this.loading = false));
      } else {
        if (!this.order) {
          this.error = true;
          this.errorText = "Devi selezionare un ordine";
          this.loading = false;
          return;
        }

        this.error = null;
        this.errorText = "";

        let articles = this.getOrder(this.order).articles.map(cartArticle => ({
          id: cartArticle.id,
          quantity: cartArticle.cartQuantity
        }));

        const index = articles.findIndex(
          cartArticle => cartArticle.id == article.id
        );

        if (index >= 0) articles[index].quantity++;
        else articles.push(article);

        this.$axios
          .put(`/orders/${this.order}`, { articles: articles })
          .then(() => {
            this.dialog = false;
            this.setOrders();
            this.$router.push({ name: "cart" });
          })
          .catch(error => {
            console.log(error.response);
          })
          .finally(() => (this.loading = false));
      }
    }
  }
};
</script>
