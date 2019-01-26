<template>
  <div class="login-container">
    <b-form class="login-form" v-on:submit.prevent="login()">
      <h2 class="login-form__header">Login</h2>
      <div class="login-form__errors" v-if="errors.length > 0">
        <b-alert v-bind:key="index" v-for="(error, index) in errors" show variant="danger" size="lg">
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
      <b-button class="login-form__button" type="submit" variant="success" size="lg">Login</b-button>
    </b-form>
  </div>
</template>

<script>

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
      password: ''
    }
  },
  computed: {
    invalidEmail () {
      return this.fieldErrors.email
    },
    invalidPassword () {
      return this.fieldErrors.password
    }
  },
  methods: {
    validateForm: function () {
      if (!this.email) {
        this.fieldErrors.email = 'Email required.'
      } else if (!this.validEmail(this.email)) {
        this.fieldErrors.email = 'Email is not valid.'
      } else {
        this.fieldErrors.email = ''
      }
      if (!this.password) {
        this.fieldErrors.password = 'Password required.'
      } else if (this.password.length < 6) {
        this.fieldErrors.password = 'Password length should be 6.'
      } else {
        this.fieldErrors.password = ''
      }
      return this.fieldErrors.email === '' && this.fieldErrors.password === ''
    },
    validEmail: function (email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    async login () {
      this.errors = []
      let isValidForm = this.validateForm()
      if (isValidForm) {
        const res = await this.$store.dispatch('login', { email: this.email, password: this.password })
        if (res.data.fieldErrors) {
          this.fieldErrors = res.data.fieldErrors
        }
        if (res.data.errors) {
          this.errors = res.data.errors
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Login";
</style>
