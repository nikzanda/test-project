<template>
  <v-card>
    {{ order }}
  </v-card>
</template>

<script>
export default {
  name: "PendingCard",
  props: {
    order: {
      type: Object,
      required: true
    }
  }
};
</script>