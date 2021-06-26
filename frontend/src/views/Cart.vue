<template>
  <v-container fluid>
    <h1 class="text-center">Carrello</h1>

    <PendingCard v-for="order in pending" :key="order.id" />
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
  data: () => ({
    orders: [],
    loading: false
  }),
  computed: mapGetters("orders", ["pending"])
};
</script>
