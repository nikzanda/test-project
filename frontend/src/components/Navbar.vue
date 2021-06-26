<template>
  <v-app-bar app color="teal darken-1" dense elevate-on-scroll>
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