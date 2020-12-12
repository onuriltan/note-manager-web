<template>
  <b-navbar toggleable="md" type="dark" class="header">
    <b-navbar-toggle target="nav_collapse" v-if="isAuthenticated"></b-navbar-toggle>
    <b-navbar-brand>
      <router-link to="/dashboard" class="header__brand">NoteManager</router-link>
    </b-navbar-brand>
    <b-collapse is-nav id="nav_collapse" v-if="isAuthenticated">
      <b-navbar-nav>
        <router-link to="/dashboard" class="header__link nav-link">Latest Notes</router-link>
        <router-link to="/notes-history" class="header__link nav-link">Notes History</router-link>
      </b-navbar-nav>
    </b-collapse>
    <div class="header__right">
      <div class="header__right__mode" @click="toggleDarkMode(!isDarkMode)">
        <img class="header__right__mode__img" :src="image" />
      </div>
      <b-navbar-nav class="header__right__navbar">
        <b-dropdown right text="Account" class="m-md-2" v-if="isAuthenticated">
          <b-dropdown-item to="/profile"><i class="fa fa-user mr-2"></i>Profile</b-dropdown-item>
          <b-dropdown-item ref="logout" @click.native="logout()"
            ><i class="fa fa-sign-out  mr-2"></i>Logout</b-dropdown-item
          >
        </b-dropdown>
      </b-navbar-nav>
    </div>
  </b-navbar>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import moon from '../../assets/moon.svg';
import sun from '../../assets/sun.svg';

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapState('general', ['isDarkMode']),
    ...mapState('auth', ['isAuthenticated']),
  },
  data: () => {
    return {
      image: moon,
    };
  },
  mounted() {
    this.isDarkMode ? (this.image = sun) : (this.image = moon);
  },
  watch: {
    isDarkMode(newValue, oldValue) {
      if (newValue) {
        this.image = sun;
      } else {
        this.image = moon;
      }
    },
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      toggleDarkMode: 'general/toggleDarkMode',
    }),
  },
};
</script>

<style scoped lang="scss">
@import './Header.scss';
</style>
