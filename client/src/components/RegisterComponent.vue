<template>
  <div class="login-container">
    <b-form class="login-form">
      <h2 class="login-form__header">Register</h2>
      <div style="font-weight: bold; margin-bottom: 20px; text-align: center">
        <router-link to="/login">Go back to login page!</router-link>
      </div>
      <div class="login-form__errors" v-if="errors.length > 0">
        <b-alert v-bind:key="index" v-for="(error, index) in errors" show variant="danger" size="lg">
          {{error.msg}}
        </b-alert>
      </div>
      <b-form-group id="username"
                    label="Username"
                    label-for="username">
        <b-form-input id="username"
                      type="text"
                      v-model="username"
                      size="lg"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="email"
                    label="Email"
                    label-for="email">
        <b-form-input id="email"
                      type="email"
                      v-model="email"
                      size="lg"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="password"
                    label="Password"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="password"
                      size="lg"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="password2"
                    label="Repeat Password"
                    label-for="password2">
        <b-form-input id="password2"
                      type="password"
                      v-model="password2"
                      size="lg"
                      required>
        </b-form-input>
      </b-form-group>
      <b-button class="login-form__button" v-on:click="register()" variant="success" size="lg">Register</b-button>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'RegisterComponent',
  data () {
    return {
      errors: [],
      username: '',
      email: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    async register () {
      this.errors = []
      const res = await this.$store.dispatch('register',
        {
          username: this.username,
          email: this.email,
          password: this.password,
          password2: this.password2
        })
      if (res.data.errors) {
        this.errors = res.data.errors
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/LoginComponent.scss";
</style>
