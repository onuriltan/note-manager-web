<template>
  <div id="app">
    <div id="nav">
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "styles/global.scss";

</style>
