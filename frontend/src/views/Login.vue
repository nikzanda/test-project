<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col xl="3" lg="4" md="6" sm="6">
        <v-card class="mx-auto" outlined>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="submit">
              <v-text-field
                label="Email"
                v-model="form.email"
                :rules="emailRules"
                prepend-inner-icon="mdi-account-circle"
                background-color="white"
                required
                outlined
                dense
                clearable
                maxlength="16"
              ></v-text-field>

              <v-text-field
                label="Password"
                v-model="form.password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                background-color="white"
                outlined
                dense
                clearable
                counter="16"
                maxlength="16"
              >
              </v-text-field>

              <v-btn
                block
                :loading="loading"
                :disabled="!valid"
                color="primary"
                type="submit"
              >
                Accedi
              </v-btn>
            </v-form>

            <br />

            <v-alert dense text type="error" dismissible v-if="this.error">
              {{ this.error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    form: {
      email: "",
      password: ""
    },
    showPassword: false,
    valid: true,
    loading: false,
    error: "",
    emailRules: [value => !!value || "Email obbligatoria"],
    passwordRules: [value => !!value || "Password obbligatoria"]
  }),
  methods: {
    ...mapActions("user", ["login"]),
    submit() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;
      this.error = false;

      this.login({
        email: this.form.email,
        password: this.form.password
      })
        .then(() => {
          this.$router.push({
            name: "home"
          });
        })
        .catch(error => {
          console.log(error.response);
          this.error = error;
        });

      this.loading = false;
    }
  }
};
</script>
