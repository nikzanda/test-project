<template>
  <v-container fluid>
    <h1 class="text-center">Carrello</h1>

    <v-row v-if="pending.length">
      <PendingCard v-for="order in pending" :key="order.id" :order="order" />
    </v-row>
    <span v-else>Nessun articolo aggiunto al carrello</span>
  </v-container>
</template>

<script>
import PendingCard from "../components/PendingCard";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    PendingCard
  },
  computed: mapGetters("orders", ["pending"])
};
</script>
