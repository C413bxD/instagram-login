// import ApiService from "@/ApiService.js";
//import AuthServices from "@/auth-module/AuthServices.js";
import { secureStorage } from "../utils/secureStorage.js";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: secureStorage.getItem("token") !== null
  },
  mutations: {
    loginSuccess(state) {
      state.logged = true;
    },
    logout(state) {
      state.logged = false;
    }
  },
  actions: {
    async setToken({ commit }) {
      await commit("loginSuccess")
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        resolve();
      });
    }
  }
});
