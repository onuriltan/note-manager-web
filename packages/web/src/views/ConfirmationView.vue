<template>
  <div class="container">
    <div v-if="errors.length > 0">
      <div v-for="error in errors" :key="error">
        <p
          style="display: flex; justify-content: center; align-items: center; font-size: 20px; min-height: calc(100vh - 70px);"
        >
          {{ error.msg }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ConfirmationView",
  data() {
    return {
      errors: []
    };
  },
  methods: {
    ...mapActions({
      confirmUser: "auth/confirmUser"
    })
  },
  async beforeMount() {
    const res = await this.confirmUser(this.$route.params.confirmationToken);
    if (res.data.errors) {
      this.errors = res.data.errors;
    }
  }
};
</script>
