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
                      class="login-form__input"
                      size="lg"s
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
      <b-form-group id="password2"
                    label="Repeat Password"
                    :invalid-feedback="invalidPassword2"
                    label-for="password2">
        <b-form-input id="password2"
                      type="password"
                      class="login-form__input"
                      v-model="password2"
                      size="lg"
                      required>
        </b-form-input>
      </b-form-group>
      <b-button class="login-form__button" type="submit" variant="success" size="lg"
                :class="{ 'button--loading': registerClicked }">
        <i class="fa fa-refresh fa-spin hide--button--loading--icon"
           :class="{ 'show--button--loading--icon': registerClicked }"></i>
        <div style="margin: 0 5px;">
          Register
        </div>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { validateRegister } from '../methods/Validators';

export default {
  name: 'RegisterComponent',
  data () {
    return {
      errors: [],
      fieldErrors: {
        email: '',
        password: '',
        password2: ''
      },
      messages: [],
      email: '',
      password: '',
      password2: '',
      registerClicked: false
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
    }
  },
  methods: {
    async register () {
      this.errors = []
      this.fieldErrors = validateRegister(this.email, this.password, this.password2)
      if (this.isValidForm) {
        this.registerClicked = true
        const res = await this.$store.dispatch('register',
          {
            email: this.email,
            password: this.password,
            password2: this.password2
          })
        if (res.data.errors) {
          this.registerClicked = false
          this.errors = res.data.errors
        }
        if (res.data.messages) {
          this.registerClicked = false
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
