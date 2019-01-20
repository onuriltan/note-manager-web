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
        <b-card-group deck class="posts__content">
          <b-card :title="post.createdAt | convertDate()"
                  tag="article"
                  v-for="post in posts"
                  v-bind:key="post._id"
                  class="mb-2 posts__content__card fade--away slide--in--from--left"
                  style="max-width: 15rem; min-width: 15rem;">
            <p class="card-text">
              {{post.text}}
            </p>
            <div slot="footer">
              <b-button size="sm" variant="danger" @click="showModal(post._id)">Delete</b-button>
            </div>
          </b-card>
        </b-card-group>
        <b-modal ref="deleteNoteModal" id="modal" title="Delete">
        <p class="my-4">Do you want to delete the note?</p>
        <div slot="modal-footer">
          <b-btn class="float-right" variant="primary" @click="hideModal()">
            NO
          </b-btn>
          <b-btn class="float-right" variant="danger" @click="deletePost()">
            YES
          </b-btn>
        </div>
      </b-modal>
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
      text: '',
      tobeDeletedId: ''
    }
  },
  methods: {
    async createPost () {
      await PostService.insertPost(this.text)
      this.posts = await PostService.getPosts()
    },
    async deletePost () {
      this.$refs.deleteNoteModal.hide()
      await PostService.deletePost(this.tobeDeletedId)
      this.posts = await PostService.getPosts()
    },
    showModal (id) {
      this.tobeDeletedId = id
      this.$refs.deleteNoteModal.show()
    },
    hideModal () {
      this.tobeDeletedId = ''
      this.$refs.deleteNoteModal.hide()
    }
  },
  filters: {
    convertDate: function (date) {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
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
