<template>
  <div>
    <p style="display: flex; justify-content: center; align-items: center; margin-top: 100px; font-size: 20px">Not Found</p>
    <audio controls autoplay loop style="visibility: hidden">
      <source src="../assets/nyan-cat-short.mp3" type="audio/mp3">
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>

</style>
