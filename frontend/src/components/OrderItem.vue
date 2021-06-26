<template>
  <div class="d-flex align-items-center">
    <v-btn icon @click="removeItem">
      <v-icon color="error">mdi-close</v-icon>
    </v-btn>

    <span class="mt-2">{{ item.name }}</span>
  </div>
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
  computed: mapGetters("orders", ["order"]),
  methods: {
    ...mapActions("orders", ["removeArticle"]),
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
