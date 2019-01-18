<template>
  <div class="posts-container">
    <div class="posts">
      <h1 class="posts__header">Latest Posts</h1>
      <div class="posts__create-form">
        <b-input-group>
          <b-form-input v-model="text"
                        class="posts__create-form__input"
                        type="text"
                        placeholder="Create a post ..."></b-form-input>
          <b-input-group-append>
            <b-btn v-on:click="createPost" variant="success">Post!</b-btn>
          </b-input-group-append>
        </b-input-group>
      </div>
      <hr>
      <p class="error" v-if="error">{{error}}</p>
      <div class="posts__content">
        <b-card-group deck>
          <b-card :title="`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`"
                  tag="article"
                  v-for="post in posts"
                  v-bind:key="post._id"
                  class="mb-2 posts__content__card fade--away slide--in--from--left"
                  style="max-width: 15rem; min-width: 15rem;">
            <p class="card-text">
              {{post.text}}
            </p>
            <b-button v-on:click="deletePost(post._id)" variant="danger">Delete</b-button>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>

</template>

<script>
import PostService from '../services/PostService'

export default {
  name: 'PostComponent',
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
    async deletePost (id) {
      await PostService.deletePost(id)
      this.posts = await PostService.getPosts()
    }
  },
  async created () {
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
  @import "../styles/components/PostComponent";
</style>
