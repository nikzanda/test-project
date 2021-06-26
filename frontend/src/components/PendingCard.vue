<template>
  <v-col xl="4" lg="6" md="6" sm="12">
    <v-card>
      <v-card-title> Ordine n. {{ order.id }} </v-card-title>

      <v-card-text>
        <h3>Totale: {{ total }} €</h3>
      </v-card-text>

      <v-card-actions>
        <v-btn color="error" @click="deleteOrder">Elimina</v-btn>
        <v-btn color="success" @click="checkout">Checkout</v-btn>

        <v-spacer> </v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            <OrderItem
              v-for="article in order.articles"
              :key="article.id"
              :item="article"
              :orderID="order.id"
            />
          </v-card-text>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
import OrderItem from "../components/OrderItem";

export default {
  name: "PendingCard",
  components: {
    OrderItem
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    show: false
  }),
  computed: {
    total() {
      return this.order.articles.reduce(
        (total, article) =>
          total + article.cartQuantity * parseFloat(article.unitPrice),
        0
      );
    }
  },
  methods: {
    ...mapActions("orders", ["removeOrder"]),
    deleteOrder() {
      confirm("Sei sicuro di voler eliminare questo ordine?") &&
        this.$axios
          .delete(`/orders/${this.order.id}`)
          .then(() => this.removeOrder(this.order.id));
    },
    checkout() {

    }
  }
};
</script>