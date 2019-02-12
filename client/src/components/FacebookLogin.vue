<template>
  <div>
    <b-btn @click="loginWithFacebook()" class="facebook-button"> Login with Facebook</b-btn>
  </div>
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
      FB.getLoginStatus(function (response) {
        statusChangeCallback(response)
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

    function statusChangeCallback(response) {
      if (response.status === 'Connected') {
        console.log('logged in and authenticated')
      } else {
        console.log('Not authenticated')
      }
    }
  },
  methods: {
    loginWithFacebook() {
      FB.login(function (response) {
        console.log(response)
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
</style>
