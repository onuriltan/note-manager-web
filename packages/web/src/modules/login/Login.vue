<template>
  <div class="login-container" :class="{ 'login-container__dark': isDarkMode }">
    <b-form class="login-form" v-on:submit.prevent="loginWithEmail()">
      <h2 class="login-form__header">Login</h2>
      <div class="login-form__errors" v-if="errors.length > 0">
        <b-alert
          v-bind:key="index"
          class="login-form__errors__error"
          v-for="(error, index) in errors"
          show
          variant="danger"
          size="lg"
          >{{ error.msg }}</b-alert
        >
      </div>
      <b-form-group
        id="email"
        label="Email"
        :invalid-feedback="invalidEmailMessage"
        label-for="email"
      >
        <b-form-input
          id="email"
          type="email"
          @keydown.native="validateEmail"
          :state="emailCorrectState"
          class="login-form__input"
          v-model="email"
          size="lg"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="password"
        label="Password"
        :invalid-feedback="invalidPasswordMessage"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          @keydown.native="validatePassword"
          :state="passwordCorrectState"
          class="login-form__input"
          v-model="password"
          size="lg"
        ></b-form-input>
      </b-form-group>
      <div class="login-form__register-link">
        <router-link to="/register">Dont have an account? Register from here!</router-link>
      </div>
      <b-button
        class="login-form__button"
        :class="{ 'button--loading': loginClicked }"
        type="submit"
        variant="success"
        size="lg"
      >
        <i
          class="fa fa-refresh fa-spin hide--button--loading--icon"
          :class="{ 'show--button--loading--icon': loginClicked }"
        ></i>
        <div style="margin: 0 5px;">Login</div>
      </b-button>
      <div class="login-form__social-container">
        <FacebookLogin />
        <GoogleLogin />
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { validateLogin, validateEmail, validatePassword } from '../../helpers/validators';
import FacebookLogin from '../facebook-login/FacebookLogin';
import GoogleLogin from '../google-login/GoogleLogin';

export default {
  name: 'LoginComponent',
  components: {
    FacebookLogin,
    GoogleLogin
  },
  data() {
    return {
      errors: [],
      fieldErrors: {
        email: null,
        password: null
      },
      email: '',
      password: '',
      loginClicked: false,
      isEmailEntered: false,
      isPasswordEntered: false
    };
  },
  mounted() {
    const googleToken = this.$route.query.googleToken;
    const facebookToken = this.$route.query.facebookToken;
    if (googleToken) {
      this.loginWithSocial(googleToken, 'google');
    }
    if (facebookToken) {
      this.loginWithSocial(facebookToken, 'facebook');
    }
  },
  computed: {
    ...mapGetters({
      isDarkMode: 'general/isDarkMode'
    }),
    invalidEmailMessage() {
      return this.fieldErrors.email;
    },
    invalidPasswordMessage() {
      return this.fieldErrors.password;
    },
    isValidForm() {
      return this.fieldErrors.email === '' && this.fieldErrors.password === '';
    },
    emailCorrectState() {
      if (this.isEmailEntered && this.invalidEmailMessage === '') return true;
      if (this.isEmailEntered && this.invalidEmailMessage !== '') return false;
      return null;
    },
    passwordCorrectState() {
      if (this.isPasswordEntered && this.invalidPasswordMessage === '') {
        return true;
      }
      if (this.isPasswordEntered && this.invalidPasswordMessage !== '') {
        return false;
      }
      return null;
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      loginWithSocial: 'auth/loginWithSocial'
    }),
    validateEmail() {
      setTimeout(() => {
        this.isEmailEntered = true;
        this.fieldErrors.email = validateEmail(this.email);
      }, 600);
    },
    validatePassword() {
      setTimeout(() => {
        this.isPasswordEntered = true;
        this.fieldErrors.password = validatePassword(this.password);
      }, 600);
    },
    async loginWithEmail() {
      this.errors = [];
      this.fieldErrors = validateLogin(this.email, this.password);
      if (this.isValidForm) {
        this.loginClicked = true;
        setTimeout(async () => {
          const res = await this.login({
            email: this.email,
            password: this.password
          });
          this.loginClicked = false;
          if (res.data.fieldErrors) {
            this.fieldErrors = res.data.fieldErrors;
          }
          if (res.data.errors) {
            this.errors = res.data.errors;
          }
        }, 1000);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import './Login';
</style>
