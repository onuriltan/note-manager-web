<template>
  <b-form class="form" v-on:submit.prevent="changePassword()">
    <div class="form__content">
      <h2 class="form__content__header">Change Password</h2>
      <div class="form__content__errors" v-if="errors.length > 0">
        <b-alert v-bind:key="index" class="form__errors__error " v-for="error in errors" show
                 variant="danger" size="lg">
          {{error.msg}}
        </b-alert>
      </div>
      <div class="form__content__errors" v-if="messages.length > 0">
        <b-alert v-bind:key="index" class="form__errors__error " v-for="message in messages" show
                 variant="success" size="lg">
          {{message.msg}}
        </b-alert>
      </div>
      <b-form-group id="oldPassword"
                    label="Old Password"
                    :invalid-feedback="invalidEmailMessage"
                    label-for="oldPassword">
        <b-form-input id="oldPassword"
                      type="password"
                      class="form__content__input"
                      v-model="oldPassword">
        </b-form-input>
      </b-form-group>
      <b-form-group id="newPassword"
                    label="New Password"
                    label-for="newPassword">
        <b-form-input id="newPassword"
                      type="password"
                      class="form__content__input"
                      v-model="newPassword">
        </b-form-input>
      </b-form-group>
      <b-button class="form__content__button" :class="{ 'button--loading': loginClicked }" type="submit" variant="success">
        <i class="fa fa-refresh fa-spin hide--button--loading--icon"
           :class="{ 'show--button--loading--icon': loginClicked }"></i>
        <div style="margin: 0 5px;">
          Change Password
        </div>
      </b-button>
    </div>
  </b-form>

</template>

<script>
export default {
  name: 'Profile',

  data () {
    return {
      errors: [],
      messages: [],
      oldPassword: '',
      newPassword: '',
      changePasswordClicked: false
    }
  },
  methods: {
    changePassword () {

    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Profile";
</style>
