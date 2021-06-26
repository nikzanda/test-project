<template>
  <v-row>
    <v-col cols="1">
      <v-btn icon @click="removeItem">
        <v-icon color="error">mdi-close</v-icon>
      </v-btn>
    </v-col>

    <v-col cols="4">
      <span>{{ item.name }}</span>
    </v-col>

    <v-col>
      <v-btn
        icon
        @click="changeQuantity(false)"
        :disabled="item.cartQuantity < 2"
        :loading="loading"
      >
        <v-icon color="error">mdi-minus</v-icon>
      </v-btn>

      <span>{{ item.cartQuantity }}</span>

      <v-btn
        icon
        @click="changeQuantity(true)"
        :disabled="item.cartQuantity >= item.quantity"
        :loading="loading"
      >
        <v-icon color="success">mdi-plus</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "OrderItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    orderID: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    loading: false
  }),
  computed: mapGetters("orders", ["order"]),
  methods: {
    ...mapActions("orders", ["updateArticleQuantity", "removeArticle"]),
    changeQuantity(add) {
      this.loading = true;
      const n = 1 * (add ? 1 : -1);
      this.updateArticleQuantity({
        orderID: this.orderID,
        articleID: this.item.id,
        cartQuantity: this.item.cartQuantity + n
      });
      this.$axios
        .put(`/orders/${this.orderID}`, {
          articles: this.order(this.orderID)?.articles.map(article => ({
            ...article,
            quantity: article.cartQuantity
          }))
        })
        .finally(() => (this.loading = false));
    },
    removeItem() {
      const articles = this.order(this.orderID)?.articles || [];

      this.$axios
        .put(`/orders/${this.orderID}`, {
          articles: articles.filter(article => article.id !== this.item.id)
        })
        .then(() => {
          this.removeArticle({
            orderID: this.orderID,
            articleID: this.item.id
          });
        })
        .catch(error => console.log(error.response));
    }
  }
};
</script>
