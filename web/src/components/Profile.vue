<template>
  <div class="container">
    <b-card no-body class="profile-container">
      <b-tabs pills card :vertical="alignTab">
        <b-tab title="Change Password" active class="profile-container__tab">
          <ChangePassword />
        </b-tab>
        <b-tab title="Edit Profile" class="profile-container__tab">
          Edit Profile
        </b-tab>
      </b-tabs>
    </b-card>
  </div>

</template>

<script>
import ChangePassword from './ChangePassword'

export default {
  name: 'Profile',
  components: {
    ChangePassword
  },
  created () {
    window.addEventListener('resize', this.handleResize)
  },
  data () {
    return {
      alignTab: false
    }
  },
  methods: {
    handleResize () {
      this.alignTab = window.innerWidth > 768
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Profile";
</style>
