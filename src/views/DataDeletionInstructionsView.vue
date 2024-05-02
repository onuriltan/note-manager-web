<template>
  <div class="container">
    <h1>Data Deletion Instructions</h1>
    <p>
      If you want to delete your data, you can contact me via the email
      [onur.iltan@gmail.com] by your email which you created the account in
      Notemanager. Your data will be deleted within 30 days upon your request.
    </p>
  </div>
</template>

<script>
export default {
  name: "DataDeletionInstructions",
  mounted() {},
};
</script>

<style scoped lang="scss">
.container {
  min-height: calc(100vh - 30px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media screen and (max-width: 768px) {
}
</style>
