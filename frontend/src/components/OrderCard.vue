<template>
  <v-col xl="4" lg="6" md="6" sm="12">
    <v-card>
      <v-card-title> Ordine n. {{ order.id }} </v-card-title>

      <v-card-text>
        <div class="d-flex justify-space-between">
          <h3>Totale: {{ total }} €</h3>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                :color="order.status === 'pending' ? 'warning' : 'success'"
                v-bind="attrs"
                v-on="on"
              >
                mdi-{{ order.status === "pending" ? "clock" : "check" }}
              </v-icon>
            </template>
            <span>{{ order.status }}</span>
          </v-tooltip>
        </div>
      </v-card-text>

      <v-card-actions>
        <template v-if="order.status === 'pending'">
          <v-btn color="error" @click="deleteOrder">Elimina</v-btn>
          <v-btn color="success" @click="checkout">Checkout</v-btn>
        </template>

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
              :isPending="order.status === 'pending'"
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
  name: "OrderCard",
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
    ...mapActions("orders", ["removeOrder", "setSettled"]),
    deleteOrder() {
      confirm("Sei sicuro di voler eliminare questo ordine?") &&
        this.$axios
          .delete(`/orders/${this.order.id}`)
          .then(() => this.removeOrder(this.order.id));
    },
    checkout() {
      this.$axios
        .put(`/orders/${this.order.id}`, {
          status: "settled"
        })
        .then(() => {
          this.setSettled(this.order.id);
          this.$router.push({ name: "orders" });
        });
    }
  }
};
</script>