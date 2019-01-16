<template>
  <div id="app">
    <HeaderComponent />
    <router-view/>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent'
export default {
  name: 'App',
  components: {
    HeaderComponent
  },
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
