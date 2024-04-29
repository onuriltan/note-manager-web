import authService from "../../services/auth.service";
import socialService from "../../services/social.service";

import router from "../../router";
import jwtDecode from "jwt-decode";

const state = {
  isDarkMode: false,
};

const general = {
  namespaced: true,
  state,
  getters: {
    isDarkMode() {
      return state.isDarkMode;
    },
  },
  actions: {
    toggleDarkMode(context, isDarkMode) {
      context.commit("setDarkMode", isDarkMode);
    },
  },
  mutations: {
    setDarkMode(state, isDarkMode) {
      state.isDarkMode = isDarkMode;
      if (isDarkMode) {
        document.documentElement.style.setProperty("--green", "black");
        document.documentElement.style.setProperty("--light", "#28a745");
        document.documentElement.style.setProperty("--white", "black");
        document.documentElement.style.setProperty("--pitch-dark", "white");
        document.documentElement.style.setProperty("--active-page", "#28a745");
        document.documentElement.style.setProperty("--header-color", "white");
        document.documentElement.style.setProperty(
          "--page-link-hover",
          "#28a745"
        );
      } else {
        document.documentElement.style.setProperty("--green", "#28a745");
        document.documentElement.style.setProperty("--light", "white");
        document.documentElement.style.setProperty("--pitch-dark", "black");
        document.documentElement.style.setProperty("--white", "white");
        document.documentElement.style.setProperty("--active-page", "black");
        document.documentElement.style.setProperty("--header-color", "#212529");
        document.documentElement.style.setProperty(
          "--page-link-hover",
          "black"
        );
      }
    },
  },
};

export default general;
