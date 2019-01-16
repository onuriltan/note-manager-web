<template>
  <div class="container">
    <b-form class="login-form">
      <h2 class="login-form__header">Login</h2>
      <div class="login-form__errors" v-if="errors.length > 0">
          <b-alert v-bind:key="index" v-for="(error, index) in errors" show variant="danger">
            {{error.msg}}
          </b-alert>
      </div>
      <b-form-group id="username"
                    label="Username"
                    label-for="username">
        <b-form-input id="username"
                      type="email"
                      v-model="username"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="password"
                    label="Password"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="password"
                      required>
        </b-form-input>
      </b-form-group>
      <b-button class="login-form__button" v-on:click="login()" variant="success">Login</b-button>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'LoginComponent',
  data () {
    return {
      errors: [],
      username: '',
      password: ''
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.AuthStore.isAuthenticated
    }
  },
  methods: {
    async login () {
      this.errors = []
      const res = await this.$store.dispatch('login', { username: this.username, password: this.password })
      if (res.data.errors) {
        this.errors = res.data.errors
      }
    },
    async logout () {
      await this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/LoginComponent.scss";
</style>
