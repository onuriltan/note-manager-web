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

      <br>
      <br>

      <b-pagination-nav v-if="!!this.pagination.page && !!this.pagination.pages" :link-gen="toPage"
                        :number-of-pages="this.pagination.pages" v-model="currentPage" use-router>
      </b-pagination-nav>

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
      pagination: {
        total: 0,
        limit: 0,
        page: 0,
        pages: 0,
      },
      currentPage: 1,
      error: '',
      text: '',
      isLoading: false,
      searchClicked: true
    }
  },
  watch: {
    '$route.params.pageNumber': function () {
      this.getNotes(1000)
    }
  },
  methods: {
    toPage (pageNum) {
      return '/dashboard/' + pageNum
    },
    async createPost () {
      this.isLoading = true
      setTimeout(async () => {
        await PostService.insertPost(this.text)
        await this.getNotes(0)
        this.isLoading = false
      }, 1000)
    },
    async deletePost (tobeDeletedId) {
      this.isLoading = true
      setTimeout(async () => {
        await PostService.deletePost(tobeDeletedId)
        await this.getNotes(0)
        this.isLoading = false
      }, 1000)
    },
    async editPost (tobeEditedId, tobeEditedText) {
      this.isLoading = true
      setTimeout(async () => {
        await PostService.editPost(tobeEditedId, tobeEditedText)
        await this.getNotes(0)
        this.isLoading = false
      }, 1000)
    },
    async getNotes (seconds) {
      this.isLoading = true
      setTimeout(async () => {
        let postss = []
        try {
          if (this.$route.params.pageNumber) {
            postss = await PostService.getPosts(this.$route.params.pageNumber)
          }else {
            postss = await PostService.getPosts()
          }
          this.posts = postss.docs
          this.pagination.total = postss.total
          this.pagination.limit = postss.limit
          this.pagination.page = postss.page
          this.pagination.pages = postss.pages

        } catch (e) {
          this.error = e.message
        }
        this.isLoading = false
      }, seconds)

    }
  },
   beforeMount () {
    this.getNotes(1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../styles/components/Dashboard";
</style>
