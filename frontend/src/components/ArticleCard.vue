<template>
  <v-col lg="3" md="3" sm="4" xs="6">
    <v-card>
      <v-card-title>{{ article.name }}</v-card-title>
      <v-card-subtitle>
        Quantità disponibile: {{ article.quantity }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="success" small @click="addToCart">
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
  methods: {
    addToCart() {
      this.$axios
        .post("/orders/", {
          articleID: this.article.id
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>
