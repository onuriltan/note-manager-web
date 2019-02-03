<template>
  <div class="login-container">
    <b-form class="login-form" v-on:submit.prevent="register()">
      <h2 class="login-form__header">Register</h2>
      <div style="font-weight: bold; margin-bottom: 20px; text-align: center">
        <router-link to="/login">Go back to login page!</router-link>
      </div>
      <div class="login-form__errors" v-if="errors.length > 0">
        <b-alert v-bind:key="index" class="login-form__errors__error "v-for="(error, index) in errors" show variant="danger" size="lg">
          {{error.msg}}
        </b-alert>
      </div>
      <div class="login-form__errors" v-if="messages.length > 0">
        <b-alert v-bind:key="index" class="login-form__errors__error " v-for="(message, index) in messages" show variant="success" size="lg">
          {{message.msg}}
        </b-alert>
      </div>
      <b-form-group id="email"
                    label="Email"
                    :invalid-feedback="invalidEmail"
                    label-for="email">
        <b-form-input id="email"
                      type="email"
                      v-model="email"
                      :state="emailCorrectState"
                      class="login-form__input"
                      size="lg">
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
                      :state="passwordCorrectState"
                      size="lg">
        </b-form-input>
      </b-form-group>
      <b-form-group id="password2"
                    label="Repeat Password"
                    :invalid-feedback="invalidPassword2"
                    label-for="password2">
        <b-form-input id="password2"
                      type="password"
                      class="login-form__input"
                      v-model="password2"
                      :state="password2CorrectState"
                      size="lg">
        </b-form-input>
      </b-form-group>
      <b-button class="login-form__button" type="submit" variant="success" size="lg"
                :class="{ 'button--loading': registerValidated }">
        <i class="fa fa-refresh fa-spin hide--button--loading--icon"
           :class="{ 'show--button--loading--icon': registerValidated }"></i>
        <div style="margin: 0 5px;">
          Register
        </div>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { validateRegister } from '../helpers/Validators'

export default {
  name: 'RegisterComponent',
  data () {
    return {
      errors: [],
      messages: [],
      fieldErrors: {
        email: '',
        password: '',
        password2: ''
      },
      email: '',
      password: '',
      password2: '',
      registerClicked: false,
      registerValidated: false
    }
  },
  computed: {
    invalidEmail () {
      return this.fieldErrors.email
    },
    invalidPassword () {
      return this.fieldErrors.password
    },
    invalidPassword2 () {
      return this.fieldErrors.password2
    },
    isValidForm () {
      return this.fieldErrors.email === '' && this.fieldErrors.password === '' && this.fieldErrors.password2 === ''
    },
    emailCorrectState () {
      if (this.registerClicked && this.invalidEmail === '') return true
      if (this.registerClicked && this.invalidEmail !== '') return false
      return null
    },
    passwordCorrectState () {
      if (this.registerClicked && this.invalidPassword === '') return true
      if (this.registerClicked && this.invalidPassword !== '') return false
      return null
    },
    password2CorrectState () {
      if (this.registerClicked && this.invalidPassword2 === '') return true
      if (this.registerClicked && this.invalidPassword2 !== '') return false
      return null
    }
  },
  methods: {
    async register () {
      this.errors = []
      this.messages = []
      this.fieldErrors = validateRegister(this.email, this.password, this.password2)
      this.registerClicked = true
      if (this.isValidForm) {
        this.registerValidated = true
        const res = await this.$store.dispatch('register',
          {
            email: this.email,
            password: this.password,
            password2: this.password2
          })
        if (res.data.errors) {
          this.registerClicked = false
          this.registerValidated = false
          this.errors = res.data.errors
        }
        if (res.data.messages) {
          this.registerClicked = false
          this.registerValidated = false
          this.messages = res.data.messages
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Login";
</style>
