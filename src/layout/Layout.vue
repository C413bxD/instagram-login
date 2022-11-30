<template>
  <v-app>
    <v-app-bar flat app clipped-right color="white" clipped>
      <div class="d-flex align-center">
        <v-card color="grey lighten-4" outlined width="300px" class="pa-2 ml-4">
          <v-layout>
            <v-flex>
              <v-icon color="grey">mdi-magnify</v-icon>
              <span class="ml-2 grey--text">Search</span>
            </v-flex>
            <v-flex class="text-right">
              <v-icon color="grey">mdi-microphone-outline</v-icon>
            </v-flex>
          </v-layout>
        </v-card>
      </div>

      <v-spacer></v-spacer>
      <v-btn
        dark
        depressed
        color="#E7596F"
        class="text-none mr-5"
        @click="agregar()"
      >
        <span class="mr-2">
          <v-icon class="mr-2">mdi-plus</v-icon>Create New Post
        </span>
      </v-btn>
      <v-btn icon class="mr-2">
        <v-icon>mdi-email-outline</v-icon>
      </v-btn>
      <v-btn icon class="mr-5">
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
      <div class="avatar_i">
        <v-avatar size="30">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <img
                lazy-src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                alt="John"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-list nav dense>
              <v-list-item-group v-model="selectedItem" color="primary">
                <div v-for="(item, index) in items" :key="index">
                  <template v-if="index == 5">
                    <hr />
                  </template>
                  <v-list-item>
                    <template v-if="index != 5">
                      <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                    </template>
                    <v-list-item-title>
                      <template v-if="index == 5">
                        <div @click="logout()">
                          {{ item.text }}
                        </div>
                      </template>
                      <template v-else>
                        {{ item.text }}
                      </template>
                    </v-list-item-title>
                  </v-list-item>
                </div>
              </v-list-item-group>
            </v-list>
            <!-- <v-btn @click="logout()">
              Cerrar Sesion
            </v-btn> -->
          </v-menu>
        </v-avatar>
      </div>
    </v-app-bar>
    <main-nav />
    <profile-right-nav />

    <v-content>
      <ProfilePage ref="Posts" />
    </v-content>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2 justify-center">
          Agregar Pots</v-card-title
        >

        <v-card-text class="mt-2">
          <v-form>
            <!--input type="file" @change="uploadFile()" ref="elFile"/-->
            <v-file-input
              label="File input"
              outlined
              dense
              v-model="FILE"
              ref="elFile"
            >
            </v-file-input>
            <v-img :src="url" max-width="500" max-height="300" />

            <v-text-field
              name="scp-name"
              label="Nombre de la publicación"
              v-model="name"
              type="text"
            ></v-text-field>
            <v-text-field
              name="scp-item"
              label="item"
              v-model="item"
              type="text"
            ></v-text-field>
            <v-textarea
              name="input-7-1"
              label="Descripción"
              auto-grow
              v-model="descrition"
            ></v-textarea>
            <v-select
              v-model="category_id"
              :items="categorias"
              label="Categoria"
              required
            ></v-select>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="CrearPost()" color="primary">Crear Post</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import ProfilePage from "@/pages/ProfilePage";
import MainNav from "@/components/MainNav";
import ProfileRightNav from "@/components/ProfileRightNav";
import ApiService from "@/ApiService.js";
import AuthServices from "../auth-module/AuthServices";

// import HelloWorld from "@components/HelloWorld";

export default {
  name: "App",

  components: {
    ProfilePage,
    MainNav,
    ProfileRightNav,
  },

  data: () => ({
    selectedItem: null,
    items: [
      { text: "Perfil", icon: "mdi-account-box-outline" },
      { text: "Guardados", icon: "mdi-bookmark" },
      { text: "Configuración", icon: "mdi-cog-outline" },
      { text: "Informar de un problema", icon: "mdi-cellphone-information"},
      { text: "Cambiar de cuenta", icon: "mdi-swap-horizontal-circle-outline" },
      { text: "Cerrar sesión", icon: "" },
    ],
    drawer: true,
    group: null,
    dialog: false,
    categorias: [],

    id: "",
    FILE: null,
    name: "",
    item: "",
    descrition: "",
    category_id: "",
    //
  }),

  mounted() {
    this.getCategorias();
  },
  computed: {
    url() {
      if (!this.FILE) return;
      return URL.createObjectURL(this.FILE);
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    agregar() {
      this.dialog = true;
    },
    async getCategorias() {
      var result = await ApiService.getCategorias();
      this.categorias = result.map((option) => ({
        value: option.id,
        text: option.name,
      }));
    },
    async CrearPost() {
      const formData = new FormData();
      formData.append("avatar", this.FILE);
      formData.append("name", this.name);
      formData.append("item", this.item);
      formData.append("descrition", this.descrition);
      formData.append("category_id", this.category_id);
      await ApiService.CreatePost(formData)
        .then((response) => {
          console.log(response);
          this.dialog = false;

          this.FILE = null;
          this.name = "";
          this.item = "";
          this.descrition = "";
          this.category_id = null;

          this.$refs.Posts.GetPosts();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async logout() {
      await AuthServices.logout();
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>
<style>
.avatar_i:visited {
  cursor: pointer;
  border: 2px solid black;
  padding: 2px 0;
}
.avatar_i:hover {
  cursor: pointer;
  border: 2px solid black;
  padding: 2px 0;
}
</style>
