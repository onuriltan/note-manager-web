<template>

  <b-btn @click="facebookLogin()"> Login with Facebook</b-btn>

</template>

<script>

export default {
  name: "FacebookLogin",
  beforeMount() {
    const appId = process.env.VUE_APP_FACEBOOK_APP_ID
    window.fbAsyncInit = function () {
      FB.init({
        appId: appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.2'
      });
    };

    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
  methods: {
    facebookInit () {

    },
    facebookLogin() {
      FB.login(function (response) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', function (response) {
            console.log('Good to see you, ' + response.name + '.');
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
