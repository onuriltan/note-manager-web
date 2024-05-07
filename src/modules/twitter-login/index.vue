<template>
  <b-btn
    @click="login()"
    class="container"
    :class="{ 'button--loading': loginClicked }"
  >
    <i
      class="fa-brands fa-x-twitter icon"
      :class="{ 'fa-flip': loginClicked }"
    ></i>
    <div style="margin: 0 5px">Login with X</div>
    <div />
  </b-btn>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TwitterLogin",
  data() {
    return {
      loginClicked: false,
    };
  },
  methods: {
    async login() {
      this.loginClicked = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.href = `${process.env.VUE_APP_AUTH_URL}/twitter`;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  border-color: var(--white);
  width: 100%;
  margin: 5px;
}
.icon {
  width: 20px;
  height: 20px;
}
</style>
