<template>
  <v-col xl="4" lg="6" md="6" sm="12">
    <v-card>
      <v-card-title> Ordine n. {{ order.id }} </v-card-title>

      <v-card-actions>
        <v-spacer> </v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            <div v-for="article in order.articles" :key="article.id">
              {{ article.name }}
            </div>
          </v-card-text>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "PendingCard",
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    show: false
  })
};
</script>