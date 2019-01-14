<template>
  <div class="container">
    <form class="login-form">
      <h1>Login</h1>
      <div v-if="errors.length > 0" class="login-form__errors flexmid">
        <div v-for="error in errors" class="login-form__errors__error">
          {{error.msg}}
        </div>
      </div>
      <div class="login-form__input">
        <label for="username">Username </label>
        <input v-model="username" class="login-form__input__text text--input" type="text" id="username" placeholder="Username ... ">
      </div>
      <div class="login-form__input">
        <label for="password">Password </label>
        <input v-model="password" class="login-form__input__text text--input" type="password" id="password" placeholder="Password ... ">
      </div>
      <button v-on:click="login()" class="login-form__button button--send" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
  import AuthService from "../services/LoginService";

  export default {
    name: "LoginComponent",
    data() {
      return {
          errors: [],
          username: '',
          password: ''
      }
    },
    methods: {
      async login() {
        this.errors = [];
        const res = await AuthService.login(this.username, this.password);
        if(res.data.errors) {
          this.errors = res.data.errors;
        }
        else {
          this.$router.push('/')
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/components/LoginComponent.scss";
</style>
