<template>
  <v-app>
    <Navbar v-if="isLogged" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Navbar
  },
  computed: mapGetters("user", ["isLogged"])
};
</script>
