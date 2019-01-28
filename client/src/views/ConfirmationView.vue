<template>
  <div class="container">
    <div v-if="errors.length > 0">
      <div v-for="error in errors">
        <p>{{error}}</p>
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
      console.log(this.$route.params.confirmationToken)
      const res = await this.$store.dispatch('confirmUser',  this.$route.params.confirmationToken)
      if (res.data.errors) {
        this.errors = res.data.errors
      }
    }
  }
</script>
