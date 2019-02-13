<template>
    <b-btn @click="loginWithFacebook()" class="facebook-button"> Login with Facebook</b-btn>
</template>

<script>

export default {
  name: 'FacebookLogin',
  mounted() {
    let appId = process.env.VUE_APP_FACEBOOK_APP_ID
    window.fbAsyncInit = function () {
      FB.init({
        appId: appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.2'
      })
    };

    (function (d, s, id) {
      let js;
      let fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

  },
  methods: {
    loginWithFacebook() {
      FB.login(function (response) {
        if (response.authResponse) {
          this.$store.dispatch('loginWithFacebook', response.authResponse.accessToken)
        } else {
          console.log('User cancelled login or did not fully authorize.')
        }
      }.bind(this), {scope: 'public_profile,email', return_scopes: true})
    }
  }
}
</script>

<style scoped lang="scss">
  .facebook-button {
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
