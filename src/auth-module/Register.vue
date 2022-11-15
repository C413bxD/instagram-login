<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <div>
          <v-row>
            <v-card class="mx-auto" max-width="344" outlined>
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
                  <h2 class="abc text-center mb-4">
                    Regístrate para ver fotos y vídeos de tus amigos.
                  </h2>
                  <v-btn depressed color="info" class="text-lowercase mb-5">
                    <v-icon dark left> mdi-facebook </v-icon>

                    <span class="text-uppercase">I</span>
                    niciar sesion con
                    <span class="text-uppercase ml-1"> F</span>acebook
                  </v-btn>
                  <v-row>
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
                  <form @submit.prevent="register">
                    <v-text-field
                      placeholder="Numero de movil o correo electronico"
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
                      placeholder="Nombre completo"
                      single-line
                      filled
                      outlined
                      clearable
                      color="gray"
                      type="text"
                      v-model="fullname"
                      hide-details="auto"
                      class="custom-size mb-1"
                    ></v-text-field>

                    <v-text-field
                      placeholder="Nombre de usuario"
                      single-line
                      filled
                      outlined
                      clearable
                      color="gray"
                      type="text"
                      v-model="name"
                      hide-details="auto"
                      class="custom-size mb-1"
                    ></v-text-field>

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

                    <p class="a text-center mb-3 text-5">
                      Es posible que los usuarios de nuestro servicio hayan
                      subido tu información de contacto en Instagram. Más
                      información.
                    </p>

                    <p class="a text-center">
                      Al registrarte, aceptas nuestras Condiciones, nuestra
                      Política de privacidad y nuestra Política de cookies.
                    </p>
                    <v-row align="center" justify="center">
                      <v-btn
                        depressed
                        block
                        rounded
                        color="info"
                        class="text-capitalize mt-2 "
                        type="submit"
                      >
                        Registrarse
                      </v-btn>
                    </v-row>
                  </form>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-row>
          <v-card class="mx-auto mt-2" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="a text-center">
                  ¿Tienes una cuenta? <a href="#" class="ml-1">Entrar</a>
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
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { AuthServices } from "./AuthServices.js";
export default {
  name: "register",
  data: () => ({
    email: "",
    fullname: "",
    name: "",
    password: "",
    errorMessage: "",
  }),

  computed: {},

  methods: {
    register() {
      //this.sending = true;
      this.errorMessage = "";
      AuthServices.register(this.email, this.password, this.fullname, this.name)
        .then(
          async () => {
            this.registrar();
          },
          (error) => {
            this.errorMessage = error.response.data.message;
          }
        )
        .then(() => {
          //this.sending = false;
        });
    },
    async registrar() {
      await this.$store.dispatch("setup");
      //this.redireccinando = true;
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
</style>
