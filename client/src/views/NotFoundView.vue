<template>
  <div class="notfound">
    <p>You're probably not looking for Nyan Cat. Or are you?</p>
    <img
      src="http://vignette3.wikia.nocookie.net/clashofclans/images/3/30/NYAN_CAT.gif/revision/latest?cb=20150415221840"
      class="nyan-cat">
    <audio controls autoplay loop style="display: none">
      <source src="../assets/nyan-cat-short.mp3" type="audio/mp3">
    </audio>
    <router-link to="/">
      <b-button class="login-form__button" type="submit" variant="success" size="lg" style="margin-bottom: 30px">
        Go to home page
      </b-button>
    </router-link>


  </div>
</template>

<script>
  export default {
    name: 'NotFound'
  }
</script>

<style scoped lang="scss">
  .notfound {
    min-height: calc(100vh - 30px);
    background: url(https://media.giphy.com/media/2fC74jNn5SPvO/giphy.gif) no-repeat fixed center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 100px 0;
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
