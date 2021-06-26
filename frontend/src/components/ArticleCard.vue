<template>
  <v-col lg="3" md="3" sm="4" xs="6">
    <v-card>
      <v-card-title>{{ article.name }}</v-card-title>
      <v-card-subtitle>
        Quantità disponibile: {{ article.quantity }} <br />
        Prezzo a unità: {{ article.unitPrice }} €
      </v-card-subtitle>

      <v-card-actions>
        <v-btn
          color="success"
          small
          :to="{ name: 'addArticle', params: { articleID: article.id } }"
        >
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
  }
};
</script>
