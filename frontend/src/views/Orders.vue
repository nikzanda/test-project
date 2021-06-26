<template>
  <v-container fluid>
    <h1 class="text-center">Ordini</h1>

    <v-row v-if="settled.length">
      <PendingCard v-for="order in settled" :key="order.id" :order="order" />
    </v-row>
    <span v-else>Nessun ordine effettuato</span>
  </v-container>
</template>

<script>
import PendingCard from "../components/PendingCard";
import { mapGetters } from "vuex";

export default {
  name: "Orders",
  components: {
    PendingCard
  },
  computed: mapGetters("orders", ["settled"])
};
</script>
