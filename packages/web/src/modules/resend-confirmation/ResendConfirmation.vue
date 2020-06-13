<template>
  <b-form
    class="login-form"
    style="text-align: center"
    v-if="emailAccepted"
    v-on:submit.prevent="resendConfirmationEmail()"
  >
    <div class="login-form__errors" v-if="errors.length > 0">
      <b-alert
        v-bind:key="index"
        class="login-form__errors__error"
        v-for="(error, index) in errors"
        show
        variant="danger"
        size="lg"
        >{{ error.msg }}</b-alert
      >
    </div>
    <div class="login-form__errors" v-if="messages.length > 0">
      <b-alert
        v-bind:key="index"
        class="login-form__errors__error"
        v-for="(message, index) in messages"
        show
        variant="success"
        size="lg"
        >{{ message.msg }}</b-alert
      >
    </div>
    <h2 class="login-form__header">Welcome to Note Manager</h2>
    <p>
      We've send you a confirmation e-mail. Click the link in your e-mail to confirm your account.
      If you cant find the e-mail check the spam folder or click the button below to-resend
    </p>
    <b-button
      class="login-form__button"
      type="submit"
      variant="success"
      :class="{ 'button--loading': resentConfirmationEmailClicked }"
    >
      <i
        class="fa fa-refresh fa-spin hide--button--loading--icon"
        :class="{
          'show--button--loading--icon': resentConfirmationEmailClicked
        }"
      ></i>
      <div style="margin: 0 5px;">Resend Confirmation Link</div>
    </b-button>
  </b-form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'ResendConfirmation',
  props: {
    emailAccepted: Boolean,
    email: String,
    password: String,
    password2: String
  },
  data() {
    return {
      errors: [],
      messages: [],
      resentConfirmationEmailClicked: false
    };
  },
  methods: {
    ...mapActions({
      resendConfirmationEmail: 'auth/resendConfirmationEmail'
    }),
    resendConfirmationEmail() {
      this.errors = [];
      this.messages = [];
      this.resentConfirmationEmailClicked = true;
      setTimeout(async () => {
        const res = await this.resendConfirmationEmail({
          email: this.email,
          password: this.password,
          password2: this.password2
        });
        if (res.data.errors) {
          this.resentConfirmationEmailClicked = false;
          this.errors = res.data.errors;
        }
        if (res.data.messages) {
          this.resentConfirmationEmailClicked = false;
          this.messages = res.data.messages;
        }
      }, 2000);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../login/Login';
</style>
