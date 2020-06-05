<template>
  <b-btn
    @click="loginWithFacebook()"
    class="facebook-button"
    :class="{ 'button--loading': fbLoginClicked }"
  >
    <i
      class="fa fa-refresh fa-spin hide--button--loading--icon"
      :class="{ 'show--button--loading--icon': fbLoginClicked }"
    ></i>
    <div style="margin: 0 5px;">Login with Facebook</div>
  </b-btn>
</template>

<script>
export default {
  name: "FacebookLogin",
  data() {
    return {
      fbLoginClicked: false
    };
  },
  mounted() {
    const appId = process.env.VUE_APP_FACEBOOK_APP_ID;
    window.fbAsyncInit = function() {
      // eslint-disable-next-line no-undef
      FB.init({
        appId: appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v3.2"
      });
    };

    (function(d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  },
  methods: {
    loginWithFacebook() {
      this.fbLoginClicked = true;
      // eslint-disable-next-line no-undef
      FB.login(
        async function(response) {
          if (response.authResponse) {
            await this.$store.dispatch(
              "loginWithFacebook",
              response.authResponse.accessToken
            );
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
          this.fbLoginClicked = false;
        }.bind(this),
        { scope: "public_profile,email", return_scopes: true }
      );
    }
  }
};
</script>

<style scoped lang="scss">
.facebook-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3b5998;
  border-color: white;
}

@media screen and (max-width: 768px) {
  .facebook-button {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
