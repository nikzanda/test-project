<template>
  <v-col lg="3" md="3" sm="4" xs="6">
    <v-card>
      <v-card-title>{{ article.name }}</v-card-title>
      <v-card-subtitle>
        Quantità disponibile: {{ article.quantity }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="success" small @click="addToCart" :loading="loading">
          Aggiungi al carrello
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    addToCart() {
      this.loading = true;

      this.$axios
        .post("/orders/", {
          articleID: this.article.id,
          quantity: 1
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
