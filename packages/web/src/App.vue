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
import HeaderComponent from "./modules/header/Header";
import SessionExpired from "./modules/session-expired/SessionExpired";
export default {
  name: "App",
  components: {
    SessionExpired,
    HeaderComponent,
  },
};
</script>

<style lang="scss">
@import "styles/global.scss";
</style>
