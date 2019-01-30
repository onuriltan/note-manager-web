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
          <b-form-input id="fromDate" type="date" :max="new Date() | convertDate"
                        min="2018-01-01" class="form-control" v-model="fromDate"></b-form-input>
        </b-form-group>

        <b-form-group
          id="toDate"
          class="history__form__content__item mr-2 ml-2"
          label="To Date"
          label-for="toDate">
          <b-form-input id="fromDate" type="date" :max="new Date() | convertDate"
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

    <Notes v-cloak :deletePost="deletePost" :editPost="editPost" :posts="posts" :isLoading="isLoading"/>

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
      toDate: '',
      fromDate: '',
      keyword: '',
      isLoading: false
    }
  },
  methods: {
    async deletePost (tobeDeletedId) {
      this.isLoading = true;
      setTimeout(async  () => {
        await PostService.deletePost(tobeDeletedId)
        this.posts = await PostService.getPosts()
        this.isLoading = false;
      }, 1000)
    },
    async editPost (tobeEditedId, tobeEditedText) {
      setTimeout(async  () => {
        await PostService.editPost(tobeEditedId, tobeEditedText)
        this.posts = await PostService.getPosts()
      }, 1000)
    },
    async getPosts () {
      this.isLoading = true;
      setTimeout(async () => {
        this.posts = []
        this.posts = await PostService.getPostsByCriteria(this.fromDate, this.toDate, this.keyword)
        this.isLoading = false;
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
