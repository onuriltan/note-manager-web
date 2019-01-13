<template>
  <div class="container">
    <form class="login-form">
      <h1>Login</h1>
      <div class="login-form__input">
        <label for="username">Username </label>
        <input class="login-form__input__text text--input" type="text" id="username" placeholder="Username ... ">
      </div>
      <div class="login-form__input">
        <label for="password">Password </label>
        <input class="login-form__input__text text--input" type="password" id="password" placeholder="Password ... ">
      </div>
      <button class="login-form__button button--send" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "LoginComponent"
  }
</script>

<style scoped lang="scss">
  @import "../styles/components/LoginComponent.scss";
</style>
