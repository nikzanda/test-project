<template>
  <v-app-bar app color="deep-purple accent-4" dense elevate-on-scroll dark>
    <v-btn icon :to="{ name: 'articles' }">
      <v-icon>mdi-format-list-bulleted</v-icon>
    </v-btn>

    <v-btn icon :to="{ name: 'cart' }">
      <v-icon>mdi-cart-variant</v-icon>
    </v-btn>

    <v-btn icon :to="{ name: 'orders' }">
      <v-icon>mdi-cash</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn color="error" @click="logout">logout</v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Navbar",
  methods: mapActions("user", ["logout"])
};
</script>