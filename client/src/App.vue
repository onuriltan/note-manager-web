<template>
  <div id="app">
    <div id="nav">
      <div v-if="isAuthenticated">
        <router-link to="/">Dashboard</router-link> |
        <span v-on:click="logout">Logout</span>
      </div>
      <div v-if="!isAuthenticated">
        <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated () {
      return this.$store.state.AuthStore.isAuthenticated
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss">
  @import "styles/global.scss";

</style>
