<template>
  <b-navbar toggleable="md" type="dark" variant="success" style="border-style: unset">
    <b-navbar-toggle target="nav_collapse" v-if="isAuthenticated"></b-navbar-toggle>
    <b-navbar-brand>
      <router-link to="/" style="text-decoration: none; color: white; font-weight: bold">NoteManager</router-link>
    </b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form v-if="isAuthenticated">
          <b-button class="my-2 my-sm-0" type="button" @click="logout()">Logout</b-button>
        </b-nav-form>
        <b-nav-item-dropdown v-if="isAuthenticated" right>
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

<style scoped>

</style>
