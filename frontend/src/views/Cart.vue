<template>
  <v-container fluid>
    <h1 class="text-center">Carrello</h1>

    <v-row v-if="pending.length">
      <OrderCard v-for="order in pending" :key="order.id" :order="order" />
    </v-row>
    <span v-else>Nessun articolo aggiunto al carrello</span>
  </v-container>
</template>

<script>
import OrderCard from "../components/OrderCard";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    OrderCard
  },
  computed: mapGetters("orders", ["pending"])
};
</script>
