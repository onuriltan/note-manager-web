<template>
  <div>
    <b-btn class="google-button" @click="loginWithGoogle" :class="{ 'button--loading': googleLoginClicked }">
      <i class="fa fa-refresh fa-spin hide--button--loading--icon" :class="{ 'show--button--loading--icon': googleLoginClicked }"></i>
      <div style="margin: 0 5px;">
        Login with Google
      </div>
    </b-btn>
  </div>
</template>

<script>
export default {
  name: 'GoogleLogin',
  data () {
    return {
      googleLoginClicked: false
    }
  },
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
      this.googleLoginClicked = true
      window.gapi.load('auth2', async function () {
        let auth2 = gapi.auth2.init({
          client_id: process.env.VUE_APP_GOOGLE_APP_ID,
          scope: 'profile'
        });
        // Sign the user in, and then retrieve their ID.
        let token = null;
        await auth2.signIn().then(async function() {
          token = auth2.currentUser.get().Zi.access_token
        });
        if(token !== null) {
          await this.$store.dispatch('loginWithGoogle', auth2.currentUser.get().Zi.access_token)
        }
        this.googleLoginClicked = false
      }.bind(this))
    }
  }
}
</script>

<style scoped lang="scss">
  .google-button {
    display: flex;
    justify-content: center;
    align-items: center;
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
