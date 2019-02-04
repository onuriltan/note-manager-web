<template>
  <div class="history-container">
    <h1 class="history__header">Notes History</h1>
    <b-form class="history__form" v-on:submit.prevent="getPosts()">
      <div class="history__form__content">
        <b-form-group
          id="fromDate"
          class="history__form__content__item mr-2 ml-2"
          label="From Date"
          label-for="fromDate">
          <b-form-input id="fromDate" type="date"
                        min="2018-01-01" class="form-control" v-model="fromDate"></b-form-input>
        </b-form-group>

        <b-form-group
          id="toDate"
          class="history__form__content__item mr-2 ml-2"
          label="To Date"
          label-for="toDate">
          <b-form-input id="fromDate" type="date"
                        min="2018-01-01" class="form-control" v-model="toDate"></b-form-input>
        </b-form-group>

        <b-form-group
          id="keyword"
          class="history__form__content__item mr-2 ml-2"
          label="Keyword"
          label-for="keyword">
          <b-form-input id="keyword" v-model="keyword"></b-form-input>
        </b-form-group>
        <b-button type="submit" class="history__form__content__button mr-2 ml-2 mb-3" variant="success">Search</b-button>
      </div>
    </b-form>

    <br>
    <br>
    <b-pagination v-if="this.pagination.pages > this.pagination.page" align="center" :total-rows="this.pagination.total"
                  v-model="this.pagination.page" :per-page="this.pagination.limit">
    </b-pagination>

    <Notes v-cloak :deletePost="deletePost" :editPost="editPost" :posts="posts" :isLoading="isLoading" :searchClicked="searchClicked"/>

  </div>
</template>

<script>
import PostService from '../services/PostService'
import Notes from '../components/Notes'

export default {
  name: 'HistoryComponent',
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
        pages: 0
      },
      toDate: '',
      fromDate: '',
      keyword: '',
      isLoading: false,
      searchClicked: false
    }
  },
  methods: {
    async deletePost (tobeDeletedId) {
      this.isLoading = true
      setTimeout(async () => {
        await PostService.deletePost(tobeDeletedId)
        let postss = await PostService.getPostsByCriteria(this.fromDate, this.toDate, this.keyword)
        this.posts = postss.docs
        this.isLoading = false
      }, 1000)
    },
    async editPost (tobeEditedId, tobeEditedText) {
      setTimeout(async () => {
        await PostService.editPost(tobeEditedId, tobeEditedText)
        let postss = await PostService.getPostsByCriteria(this.fromDate, this.toDate, this.keyword)
        this.posts = postss.docs
      }, 1000)
    },
    async getPosts () {
      this.isLoading = true
      this.searchClicked = true
      setTimeout(async () => {
        this.posts = []
        let postss = await PostService.getPostsByCriteria(this.fromDate, this.toDate, this.keyword)
        this.posts = postss.docs
        this.pagination.total = postss.total
        this.pagination.limit = postss.limit
        this.pagination.page = postss.page
        this.pagination.pages = postss.pages
        console.log(this.pagination)
        this.isLoading = false
      }, 1000)
    }
  },
  filters: {
    convertDate: (date) => {
      return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate()
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/History";
</style>
