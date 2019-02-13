<template>
    <b-btn class="google-button"> Login with Google</b-btn>
</template>

<script>
    export default {
        name: "GoogleLogin"
    }
</script>

<style scoped lang="scss">
  .google-button {
    background-color: #db3236;
    border-color: white;
  }

  @media screen and (max-width: 768px) {
    .google-button {
      width: 100%;
      margin: 10px 0;
    }
  }

</style>
