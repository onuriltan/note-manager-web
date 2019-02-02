<template>
  <div class="notfound">
    <p>You're probably not looking for Nyan Cat. Or are you?</p>
    <audio id="audio" controls autoplay preload="auto" loop style="display: none; padding: 10px 0">
      <source src="../assets/nyan-cat-short.mp3" type="audio/mp3">
    </audio>
    <img
      src="http://vignette3.wikia.nocookie.net/clashofclans/images/3/30/NYAN_CAT.gif/revision/latest?cb=20150415221840"
      class="nyan-cat">
    <router-link to="/">
      <b-button class="login-form__button" type="submit" variant="success" size="lg" style="margin-bottom: 30px">
        Go to home page
      </b-button>
    </router-link>

  </div>
</template>

<script>
export default {
  name: 'NotFound',
  mounted () {
    let promise = document.getElementById('audio').play()
    if (promise !== undefined) {
      promise.then(_ => {
        // Autoplay started!
      }).catch(error => {
        document.getElementById('audio').style.display = 'block'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .notfound {
    min-height: calc(100vh - 30px);
    background-color: black;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    .nyan-cat {
      width: 70%;
    }
    p {
      padding: 0 20px;
      z-index: 1000;
      color: white;
      font-weight: 900;
      font-size: 40px;
      text-shadow: 2px 2px 5px black
    }
  }

  @media screen and (max-width: 768px) {
    .nyan-cat {
      width: 100% !important;
    }
  }

</style>
