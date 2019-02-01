<template>
  <div class="login-container">
    <b-form class="login-form" v-on:submit.prevent="register()">
      <h2 class="login-form__header">Register</h2>
      <div style="font-weight: bold; margin-bottom: 20px; text-align: center">
        <router-link to="/login">Go back to login page!</router-link>
      </div>
      <div class="login-form__errors" v-if="errors.length > 0">
        <b-alert v-bind:key="index" v-for="(error, index) in errors" show variant="danger" size="lg">
          {{error.msg}}
        </b-alert>
      </div>
      <div class="login-form__errors" v-if="messages.length > 0">
        <b-alert v-bind:key="index" v-for="(message, index) in messages" show variant="success" size="lg">
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
        Register
      </b-button>
    </b-form>
  </div>
</template>

<script>

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

      if (!this.password2) {
        this.fieldErrors.password2 = 'Repeat password required.'
      } else if (this.password2.length < 6) {
        this.fieldErrors.password2 = 'Repeat password length should be 6.'
      } else if (this.password2 !== this.password) {
        this.fieldErrors.password = 'Passwords does not match.'
        this.fieldErrors.password2 = 'Passwords does not match.'
      } else {
        this.fieldErrors.password2 = ''
        this.fieldErrors.password = ''
      }

      return this.fieldErrors.email === '' && this.fieldErrors.password === '' && this.fieldErrors.password2 === ''
    },
    validEmail: function (email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    async register () {
      this.errors = []
      let isValidForm = this.validateForm()
      if (isValidForm) {
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
