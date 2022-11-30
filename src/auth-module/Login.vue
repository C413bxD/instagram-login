<template>
  <div>
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm12 md6>
              <v-row>
                <v-col>
                  <transition></transition>
                </v-col>
                <v-col>
                  <v-card class="mx-auto elevation-12" max-width="344" outlined>
                    <div>
                      <v-img
                        class="mx-auto mt-2"
                        width="130px"
                        lazy-src="../assets/instagram_logo.png"
                        src="../assets/instagram_logo.png"
                      ></v-img>
                    </div>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <form @submit.prevent="login">
                          <v-text-field
                            placeholder="Telefono, usuario o correo electrónico"
                            filled
                            single-line
                            outlined
                            clearable
                            color="gray"
                            type="email"
                            v-model="email"
                            hide-details="auto"
                            class="custom-size mb-1"
                          >
                          </v-text-field>

                          <v-text-field
                            placeholder="Contraseña"
                            single-line
                            filled
                            outlined
                            clearable
                            color="gray"
                            type="password"
                            v-model="password"
                            hide-details="auto"
                            class="custom-size mb-3"
                          ></v-text-field>

                          <v-row align="center" justify="center">
                            <v-btn
                              depressed
                              block
                              rounded
                              color="info"
                              class="text-capitalize mt-2 "
                              type="submit"
                            >
                              Entrar
                            </v-btn>

                            <v-row class="my-3">
                              <v-col cols="5.5">
                                <hr />
                              </v-col>
                              <v-col cols="1" class="mt-1 pa-0 text-center">
                                o
                              </v-col>
                              <v-col cols="5.5">
                                <hr />
                              </v-col>
                            </v-row>

                            <v-btn
                              color="transparent"
                              block
                              elevation="0"
                              class="indigo--text text--darken-4 text-lowercase mb-5"
                            >
                              <v-icon dark left> mdi-facebook </v-icon>

                              <span class="text-uppercase">I</span>
                              niciar sesion con
                              <span class="text-uppercase ml-1"> F</span>acebook
                            </v-btn>
                            <a href="#">¿Has olvidado la contraseña?</a>
                          </v-row>
                        </form>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>

                  <v-card class="mx-auto mt-2" max-width="344" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="a text-center">
                          ¿No tienes una cuenta?
                          <router-link to="/register" class="ml-1"
                            >Regístrate</router-link
                          >
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>

                  <p class="mt-5 black--text text-center">
                    Descarga la aplicación.
                  </p>
                  <v-card class="d-flex justify-center mb-6" flat>
                    <v-card elevation="0">
                      <v-img
                        src="../assets/google.png"
                        height="40"
                        width="134"
                        class="ma-1"
                      ></v-img>
                    </v-card>
                    <v-card elevation="0">
                      <v-img
                        src="../assets/microsoft.png"
                        height="40"
                        width="110.766"
                        class="ma-1"
                      ></v-img>
                    </v-card>
                  </v-card>
                </v-col>
              </v-row>
              <v-snackbar
                v-model="snackbar"
                absolute
                centered
                tile
                :multi-line="multiLine"
                color="red accent-2"
                
              >
                {{ errorMessage }}

                
                <v-btn
                  text
                  color="black"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              
              </v-snackbar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { AuthServices } from "./AuthServices.js";
import Transition from "@/components/Transition.vue";
// import redirectAction from "@/auth-module/redirectAction.js";
export default {
  name: "Login",
  components: {
    Transition,
  },

  data: () => ({
    multiLine: true,
    snackbar: false,
    errorMessage: "",
    email: "",
    password: "",
  }),

  computed: {},

  methods: {
    async login() {
      this.sending = true;
      this.errorMessage = "";
      await AuthServices.login(this.email, this.password)
        .then(
          async () => {
            this.registrar();
          },
          (error) => {
            this.errorMessage = error.response.data[0].message;
            this.snackbar = true;
          }
        )
        .then(() => {
          //this.sending = false;
        });
    },
    async registrar() {
      await this.$store.dispatch("setToken");
      this.$router.push("/");
    },
  },
};
</script>

<style>
template {
  font-family: Helvetica, Arial, sans-serif;
}
p {
  font-size: 12px;
  color: gray;
}
h2 {
  font-weight: 700;
  font-size: 17px;
  color: grey;
}
.custom-size input::placeholder {
  font-size: 14px;
}
form a {
  text-decoration: none;
  font-size: 12px;
}
a {
  text-decoration: none;
}
</style>
