<template>
  <b-navbar toggleable="md" type="dark" variant="success" class="header">
    <b-navbar-toggle target="nav_collapse" v-if="isAuthenticated"></b-navbar-toggle>
    <b-navbar-brand>
      <router-link to="/" class="header__brand">NoteManager</router-link>
    </b-navbar-brand>
    <b-collapse is-nav id="nav_collapse" v-if="isAuthenticated">
      <b-navbar-nav>
          <router-link to="/" class="header__link nav-link">Latest Notes</router-link>
          <router-link to="/notes-history" class="header__link nav-link">Notes History</router-link>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout()">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'HeaderComponent',
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

<style scoped lang="scss">
  @import "../styles/components/Header.scss";

</style>
