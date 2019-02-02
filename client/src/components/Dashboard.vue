<template>
  <div class="posts-container">
    <div class="posts">
      <h1 class="posts__header">Latest Notes</h1>
      <form class="posts__create-form" @submit.prevent="createPost">
        <b-input-group class="posts__create-form__inputgroup">
          <b-form-input v-model="text"
                        class="posts__create-form__input"
                        type="text"
                        placeholder="Create a note ..."></b-form-input>
          <b-input-group-append>
            <b-btn type="submit" variant="success">Post!</b-btn>
          </b-input-group-append>
        </b-input-group>
      </form>
      <hr>

      <Notes :editPost="editPost" :deletePost="deletePost" :posts="posts" :isLoading="isLoading" :searchClicked="searchClicked" />

    </div>
  </div>

</template>

<script>
import PostService from '../services/PostService'
import Notes from '../components/Notes'

export default {
  name: 'DashboardComponent',
  components: {
    Notes
  },
  data () {
    return {
      posts: [],
      error: '',
      text: '',
      isLoading: false,
      searchClicked: true
    }
  },
  methods: {
    async createPost () {
      this.isLoading = true
      setTimeout(async () => {
        await PostService.insertPost(this.text)
        this.posts = await PostService.getPosts()
        this.isLoading = false
      }, 1000)
    },
    async deletePost (tobeDeletedId) {
      this.isLoading = true
      setTimeout(async () => {
        await PostService.deletePost(tobeDeletedId)
        this.posts = await PostService.getPosts()
        this.isLoading = false
      }, 1000)
    },
    async editPost (tobeEditedId, tobeEditedText) {
      this.isLoading = true
      setTimeout(async () => {
        await PostService.editPost(tobeEditedId, tobeEditedText)
        this.posts = await PostService.getPosts()
        this.isLoading = false
      }, 1000)
    }
  },
  async beforeMount () {
    try {
      this.isLoading = true
      this.posts = await PostService.getPosts()
    } catch (e) {
      this.error = e.message
    }
    this.isLoading = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../styles/components/Dashboard";
</style>
