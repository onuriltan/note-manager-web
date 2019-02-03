<template>
  <div class="login-container">
    <b-form class="login-form" v-on:submit.prevent="login()">
      <h2 class="login-form__header">Login</h2>
      <div class="login-form__errors" v-if="errors.length > 0">
        <b-alert v-bind:key="index" class="login-form__errors__error" v-for="(error, index) in errors" show variant="danger" size="lg">
          {{error.msg}}
        </b-alert>
      </div>
      <b-form-group id="email"
                    label="Email"
                    :invalid-feedback="invalidEmail"
                    label-for="email">
        <b-form-input id="email"
                      type="email"
                      class="login-form__input"
                      v-model="email"
                      size="lg"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="password"
                    label="Password"
                    :invalid-feedback="invalidPassword"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      class="login-form__input"
                      v-model="password"
                      size="lg"
                      required>
        </b-form-input>
      </b-form-group>
      <div style="font-weight: bold; margin: 30px 0; text-align: center">
        <router-link to="/register">Dont have an account? Register from here!</router-link>
      </div>
      <b-button class="login-form__button" :class="{ 'button--loading': loginClicked }" type="submit" variant="success" size="lg">
        <i class="fa fa-refresh fa-spin hide--button--loading--icon" :class="{ 'show--button--loading--icon': loginClicked }"></i>
        <div style="margin: 0 5px;">
          Login
        </div>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import Validators from '../methods/Validators';

export default {
  name: 'LoginComponent',
  data () {
    return {
      errors: [],
      fieldErrors: {
        email: '',
        password: ''
      },
      email: '',
      password: '',
      loginClicked: false
    }
  },
  computed: {
    invalidEmail () {
      return this.fieldErrors.email
    },
    invalidPassword () {
      return this.fieldErrors.password
    },
    isValidForm () {
      return this.fieldErrors.email === '' && this.fieldErrors.password === ''
    }
  },
  methods: {
    async login () {
      this.errors = []
      this.fieldErrors = Validators.validateRegister(this.email, this.password, this.password2);
      if (this.isValidForm) {
        this.loginClicked = true
        setTimeout(async () => {
          const res = await this.$store.dispatch('login', { email: this.email, password: this.password })
          this.loginClicked = false
          if (res.data.fieldErrors) {
            this.fieldErrors = res.data.fieldErrors
          }
          if (res.data.errors) {
            this.errors = res.data.errors
          }
        }, 1000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Login";
</style>
