<template>
  <v-container fluid>
    <h1 class="text-center">Carrello</h1>
  </v-container>
</template>

<script>
export default {
  name: "Cart",
  data: () => ({
    orders: [],
    loading: false
  }),
  mounted() {
    this.loadPendingOrders();
  },
  methods: {
    loadPendingOrders() {
      this.loading = true;

      this.$axios("/orders/?status=pending")
        .then(({ data }) => {
          this.orders = data;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
