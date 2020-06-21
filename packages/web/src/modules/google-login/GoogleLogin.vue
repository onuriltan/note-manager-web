<template>
  <div>
    <b-btn
      class="google-button"
      @click="loginWithGoogle"
      :class="{ 'button--loading': googleLoginClicked }"
    >
      <i
        class="fa fa-refresh fa-spin hide--button--loading--icon"
        :class="{ 'show--button--loading--icon': googleLoginClicked }"
      ></i>
      <div style="margin: 0 5px;">
        Login with Google
      </div>
    </b-btn>
  </div>
</template>

<script>
export default {
  name: 'GoogleLogin',
  data() {
    return {
      googleLoginClicked: false
    };
  },
  methods: {
    loginWithGoogle() {
      this.googleLoginClicked = true;
      window.location.href = `${process.env.VUE_APP_AUTH_URL}/loginWithGoogle`;
    }
  }
};
</script>

<style scoped lang="scss">
.google-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #db3236;
  border-color: white;
  width: 100%;
  margin: 5px;
}
</style>
