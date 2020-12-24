<template>
  <b-btn
    @click="loginWithFB()"
    class="facebook-button"
    :class="{ 'button--loading': fbLoginClicked }"
  >
    <i
      class="fa fa-refresh fa-spin hide--button--loading--icon"
      :class="{ 'show--button--loading--icon': fbLoginClicked }"
    ></i>
    <div style="margin: 0 5px">Login with Facebook</div>
  </b-btn>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'FacebookLogin',
  data() {
    return {
      fbLoginClicked: false,
    };
  },
  mounted() {
    const appId = process.env.VUE_APP_FACEBOOK_APP_ID;
  },
  methods: {
    ...mapActions({
      loginWithFacebook: 'auth/loginWithFacebook',
    }),
    loginWithFB() {
      this.fbLoginClicked = true;
      window.location.href = `${process.env.VUE_APP_AUTH_URL}/facebook`;
    },
  },
};
</script>

<style scoped lang="scss">
.facebook-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3b5998;
  border-color: var(--white);
  width: 100%;
  margin: 5px;
}
</style>
