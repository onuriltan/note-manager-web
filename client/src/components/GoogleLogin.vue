<template>
    <b-btn class="google-button" @click="loginWithGoogle"> Login with Google</b-btn>

</template>

<script>
export default {
  name: 'GoogleLogin',
  mounted () {
    let googlePlatformLibraryScript = document.createElement('script') // load google platform script
    googlePlatformLibraryScript.setAttribute('src', 'https://apis.google.com/js/platform.js')
    document.head.appendChild(googlePlatformLibraryScript)

    let meta = document.createElement('meta') // create meta
    meta.name = 'google-signin-client_id'
    meta.content = process.env.VUE_APP_GOOGLE_APP_ID
    document.getElementsByTagName('head')[0].appendChild(meta)
  },
  methods: {
    loginWithGoogle () {
      window.gapi.load('auth2', function () {
        let auth2 = gapi.auth2.init({
          client_id: process.env.VUE_APP_GOOGLE_APP_ID,
          scope: 'profile'
        });
        // Sign the user in, and then retrieve their ID.
        auth2.signIn().then(function() {
          console.log(auth2.currentUser.get().Zi.access_token); // get the access token
        });
      })
    }
  }
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
