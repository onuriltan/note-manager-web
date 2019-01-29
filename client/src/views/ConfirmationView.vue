<template>
  <div class="container">
    <div v-if="errors.length > 0">
      <div v-for="error in errors">
        <p style="display: flex; justify-content: center; align-items: center; font-size: 20px; min-height: calc(100vh - 70px);">{{error.msg}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ConfirmationView',
    data () {
      return {
        errors: []
      }
    },
    async beforeMount () {
      const res = await this.$store.dispatch('confirmUser',  this.$route.params.confirmationToken)
      console.log()
      if (res.data.errors) {
        this.errors = res.data.errors
        console.log(this.errors)
      }
    }
  }
</script>
