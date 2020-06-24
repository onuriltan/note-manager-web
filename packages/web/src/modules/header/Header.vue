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
      <b-navbar-nav class="ml-auto header__navbar">
        <div class="header__mode" @click="toggleDarkMode(!isDarkMode)">
          <img class="header__mode__img" :src="image" />
        </div>
        <b-dropdown right text="Account" class="m-md-2">
          <b-dropdown-item to="/profile"><i class="fa fa-user mr-2"></i>Profile</b-dropdown-item>
          <b-dropdown-item ref="logout" @click.native="logout()"
            ><i class="fa fa-sign-out  mr-2"></i>Logout</b-dropdown-item
          >
        </b-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import honeymoon from '../../assets/honeymoon.svg';
import sun from '../../assets/sun.svg';

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      isDarkMode: 'general/isDarkMode'
    })
  },
  data: () => {
    return {
<<<<<<< HEAD
      image: honeymoon
    };
  },
  watch: {
    isDarkMode(newValue, oldValue) {
      if (newValue) {
        this.image = sun;
      } else {
        this.image = honeymoon;
      }
    }
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      toggleDarkMode: 'general/toggleDarkMode'
    })
=======
      isDarkMode: false,
      image: honeymoon
    };
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    toggleMode() {
      if (!this.isDarkMode) {
        this.toggleDarkMode();
        this.image = sun;
        this.isDarkMode = true;
      } else {
        this.toggleLightMode();
        this.image = honeymoon;
        this.isDarkMode = false;
      }
    },
    toggleDarkMode() {
      document.documentElement.style.setProperty('--green', 'black');
      document.documentElement.style.setProperty('--light', '#28a745');
      document.documentElement.style.setProperty('--white', 'black');
      document.documentElement.style.setProperty('--pitch-dark', 'white');
      document.documentElement.style.setProperty('--active-page', '#28a745');
      document.documentElement.style.setProperty('--header-color', 'white');
    },
    toggleLightMode() {
      document.documentElement.style.setProperty('--green', '#28a745');
      document.documentElement.style.setProperty('--light', 'white');
      document.documentElement.style.setProperty('--pitch-dark', 'black');
      document.documentElement.style.setProperty('--white', 'white');
      document.documentElement.style.setProperty('--active-page', 'black');
      document.documentElement.style.setProperty('--header-color', '#212529');
    }
>>>>>>> 79150e0fa47b5a77f12af84d5009e88617f9e4d9
  }
};
</script>

<style scoped lang="scss">
@import './Header.scss';
</style>
