<template>
  <v-container fluid>
    <h1 class="text-center">Ordini</h1>

    <v-row v-if="settled.length">
      <OrderCard v-for="order in settled" :key="order.id" :order="order" />
    </v-row>
    <span v-else>Nessun ordine effettuato</span>
  </v-container>
</template>

<script>
import OrderCard from "../components/OrderCard";
import { mapGetters } from "vuex";

export default {
  name: "Orders",
  components: {
    OrderCard
  },
  computed: mapGetters("orders", ["settled"])
};
</script>
