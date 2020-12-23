<template>
  <div>
    <b-card no-body class="profile-container">
      <b-tabs pills card :vertical="alignTab">
        <div>
          <b-tab
            title="Change Password"
            active
            class="profile-container__tab"
            v-if="loginMethod === 'local'"
          >
            <ChangePassword />
          </b-tab>
        </div>
        <b-tab title="Edit Profile" class="profile-container__tab"> Edit Profile </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChangePassword from '../change-password/ChangePassword';

export default {
  name: 'Profile',
  components: {
    ChangePassword,
  },
  computed: {
    ...mapState('auth', ['loginMethod']),
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  data() {
    return {
      alignTab: false,
    };
  },
  methods: {
    handleResize() {
      this.alignTab = window.innerWidth > 768;
    },
  },
};
</script>

<style scoped lang="scss">
@import './Profile';
</style>
