<template>
  <div>
    <div id="app">
      <SessionExpired />
      <HeaderComponent />
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import HeaderComponent from "./modules/header/Header";
import SessionExpired from "./modules/session-expired/SessionExpired";
export default {
  name: "App",
  components: {
    SessionExpired,
    HeaderComponent,
  },
  computed: {
    ...mapState("general", ["isDarkMode"]),
  },
  methods: {
    ...mapActions({
      toggleDarkMode: "general/toggleDarkMode",
    }),
  },
  mounted() {
    this.isDarkMode ? this.toggleDarkMode(true) : this.toggleDarkMode(false);
  },
};
</script>

<style lang="scss">
@import "styles/global.scss";
</style>
