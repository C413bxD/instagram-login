// import ApiService from "@/ApiService.js";
import AuthServices from "@/auth-module/AuthServices.js";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: ""
  },
  mutations: {},
  actions: {
    async getUser({ state }) {
      state.user = "waready";
    },
    async setup({ dispatch }) {
      try {
        if (AuthServices.checkIfHasToken()) {
          await dispatch("getUser");
          console.log("Autentificado");
        } else {
          throw "No esta autenticado";
        }
      } catch (e) {
        console.log("Error en el setup");
        AuthServices.removeToken();
      }
    }
  },
  modules: {}
});
