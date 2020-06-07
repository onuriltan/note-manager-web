<template>
  <div
    id="theWarning"
    style="display:none"
    :class="{ 'session-expired-alert': sessionExpired }"
  >
    <div class="session-expired-alert__content">
      <b-alert
        show
        variant="warning"
        class="session-expired-alert__content__message"
      >
        <h4 class="alert-heading">Warning!</h4>
        <p>Your session is expired. Redirecting to login ...</p>
      </b-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: "SessionExpired",
  computed: {
    sessionExpired() {
      return this.$store.state.AuthStore.sessionExpired;
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    sessionExpired(oldValue, newValue) {}
  }
};
</script>

<style scoped lang="scss">
.session-expired-alert {
  display: flex !important; /* Hidden by default */
  justify-content: center;
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  &__content {
    display: flex;
    justify-content: center;
    margin: auto;
    &__message {
      margin-bottom: unset !important;
      padding: 50px 20px;
      border: 2px solid;
    }
  }
}
</style>
