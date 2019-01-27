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

      <Notes v-cloak :editPost="editPost" :deletePost="deletePost" :posts="posts"/>

    </div>
  </div>

</template>

<script>
import PostService from '../services/PostService'
import Notes from '../components/Notes'

export default {
  name: 'PostComponent',
  components: {
    Notes
  },
  data () {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  methods: {
    async createPost () {
      await PostService.insertPost(this.text)
      this.posts = await PostService.getPosts()
    },
    async deletePost (tobeDeletedId) {
      await PostService.deletePost(tobeDeletedId)
      this.posts = await PostService.getPosts()
    },
    async editPost (tobeEditedId, tobeEditedText) {
      await PostService.editPost(tobeEditedId, tobeEditedText)
      this.posts = await PostService.getPosts()
    }
  },
  async beforeMount () {
    try {
      this.posts = await PostService.getPosts()
    } catch (e) {
      this.error = e.message
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../styles/components/Dashboard";
</style>
