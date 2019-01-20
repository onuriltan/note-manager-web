<template>
  <div class="login-container">
    <b-form class="login-form">
      <h2 class="login-form__header">Login</h2>
      <div class="login-form__errors" v-if="errors.length > 0">
        <b-alert v-bind:key="index" v-for="(error, index) in errors" show variant="danger" size="lg">
          {{error.msg}}
        </b-alert>
      </div>
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
      <div style="font-weight: bold; margin: 30px 0; text-align: center">
        <router-link to="/register">Dont have an account? Register from here!</router-link>
      </div>
      <b-button class="login-form__button" v-on:click="login()" variant="success" size="lg">Login</b-button>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'LoginComponent',
  data () {
    return {
      errors: [],
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      this.errors = []
      const res = await this.$store.dispatch('login', { email: this.email, password: this.password })
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
