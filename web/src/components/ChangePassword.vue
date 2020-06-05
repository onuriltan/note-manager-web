<template>
  <b-form class="change-password-form" v-on:submit.prevent="changePassword()">
    <div class="change-password-form__content">
      <h2 class="change-password-form__content__header">Change Password</h2>
      <div
        class="change-password-form__content__errors"
        v-if="errors.length > 0"
      >
        <b-alert
          v-bind:key="index"
          class="change-password-form__errors__error "
          v-for="(error, index) in errors"
          show
          variant="danger"
          size="lg"
        >
          {{ error.msg }}
        </b-alert>
      </div>
      <div
        class="change-password-form__content__errors"
        v-if="messages.length > 0"
      >
        <b-alert
          v-bind:key="index"
          class="change-password-form__errors__error "
          v-for="(message, index) in messages"
          show
          variant="success"
          size="lg"
        >
          {{ message.msg }}
        </b-alert>
      </div>
      <b-form-group
        id="oldPassword"
        label="Old Password"
        :invalid-feedback="this.fieldErrors.oldPassword"
        label-for="oldPassword"
      >
        <b-form-input
          id="oldPassword"
          type="password"
          :state="oldPasswordCorrectState"
          class="change-password-form__content__input"
          v-model="oldPassword"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="newPassword"
        label="New Password"
        :invalid-feedback="this.fieldErrors.newPassword"
        label-for="newPassword"
      >
        <b-form-input
          id="newPassword"
          type="password"
          :state="newPasswordCorrectState"
          class="change-password-form__content__input"
          v-model="newPassword"
        >
        </b-form-input>
      </b-form-group>
      <b-button
        class="change-password-form__content__button"
        :class="{ 'button--loading': changePasswordClicked }"
        type="submit"
        variant="success"
        :disabled="changePasswordDisabled"
      >
        <i
          class="fa fa-refresh fa-spin hide--button--loading--icon"
          :class="{ 'show--button--loading--icon': changePasswordClicked }"
        ></i>
        <div style="margin: 0 5px;">
          Change Password
        </div>
      </b-button>
    </div>
  </b-form>
</template>

<script>
import UserService from "../services/UserService";
import { validateChangePassword } from "../helpers/validators";

export default {
  name: "ChangePassword",
  computed: {
    oldPasswordCorrectState() {
      if (this.fieldErrors.oldPassword === null) return null;
      if (this.fieldErrors.oldPassword === "") return true;
      if (this.fieldErrors.oldPassword !== "") return false;
      return false;
    },
    newPasswordCorrectState() {
      if (this.fieldErrors.newPassword === null) return null;
      else if (this.fieldErrors.newPassword === "") return true;
      else if (this.fieldErrors.newPassword !== "") return false;
      return false;
    },
    isValidForm() {
      return (
        this.fieldErrors.oldPassword === "" &&
        this.fieldErrors.newPassword === ""
      );
    },
    changePasswordDisabled() {
      return (
        this.newPassword === null ||
        this.newPassword === "" ||
        this.oldPassword === null ||
        this.oldPassword === ""
      );
    }
  },
  data() {
    return {
      errors: [],
      fieldErrors: {
        oldPassword: null,
        newPassword: null
      },
      messages: [],
      oldPassword: "",
      newPassword: "",
      changePasswordClicked: false
    };
  },
  methods: {
    changePassword() {
      this.clearErrors();
      this.fieldErrors = validateChangePassword(
        this.oldPassword,
        this.newPassword
      );
      if (this.isValidForm) {
        this.changePasswordClicked = true;
        setTimeout(async () => {
          const res = await UserService.changePassword({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          });
          this.changePasswordClicked = false;
          if (res.data.fieldErrors) {
            this.fieldErrors = res.data.fieldErrors;
          }
          if (res.data.errors) {
            this.errors = res.data.errors;
          }
          if (res.status === 200) {
            this.messages.push({ msg: "Password is changed!" });
          }
        }, 1000);
      }
    },
    clearErrors() {
      this.fieldErrors.oldPassword = null;
      this.fieldErrors.newPassword = null;
      this.errors = [];
      this.messages = [];
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/components/ChangePassword";
</style>
