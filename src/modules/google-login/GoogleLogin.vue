<template>
  <div>
    <b-btn
      class="container"
      @click="loginWithGoogle"
      :class="{ 'button--loading': loginClicked }"
    >
      <i
        class="fa-brands fa-google icon"
        :class="{ 'fa-flip': loginClicked }"
      ></i>
      <div style="margin: 0 5px">Login with Google</div>
      <div />
    </b-btn>
  </div>
</template>

<script>
export default {
  name: "GoogleLogin",
  data() {
    return {
      loginClicked: false,
    };
  },
  methods: {
    async loginWithGoogle() {
      this.loginClicked = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.href = `${process.env.VUE_APP_AUTH_URL}/google`;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4285f4;
  border-color: var(--white);
  width: 100%;
  margin: 5px;
}
</style>
