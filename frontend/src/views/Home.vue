<template>
  <v-container fluid>
    <h1 class="text-center">Articoli</h1>

    <v-data-iterator
      :items="articles"
      :search="search"
      :loading="loading"
      :items-per-page="articles.length"
      hide-default-footer
    >
      <template #header>
        <v-text-field
          v-model="search"
          clearable
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
        ></v-text-field>
      </template>

      <template #default="{ items }">
        <v-row>
          <ArticleCard v-for="item in items" :key="item.id" :article="item" />
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import ArticleCard from "../components/ArticleCard";

export default {
  name: "Home",
  components: {
    ArticleCard
  },
  data: () => ({
    articles: [],
    search: "",
    loading: false
  }),
  created() {
    this.loadArticles();
  },
  methods: {
    loadArticles() {
      this.loading = true;

      this.$axios("/articles/")
        .then(({ data }) => {
          this.articles = data;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
