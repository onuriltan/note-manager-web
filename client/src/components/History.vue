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
                        min="1000-01-01" class="form-control" v-model="fromDate"></b-form-input>
        </b-form-group>

        <b-form-group
          id="toDate"
          class="history__form__content__item mr-2 ml-2"
          label="To Date"
          label-for="toDate">
          <b-form-input id="fromDate" type="date" :max="new Date() | convertDate"
                        min="1000-01-01" class="form-control" v-model="toDate"></b-form-input>
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
    <b-card-group deck class="posts__content"> <!-- todo make tihs a reusable component -->
      <b-card :title="post.createdAt | convertDate()"
              tag="article"
              v-for="post in posts"
              v-bind:key="post._id"
              class="mb-2 posts__content__card fade--away slide--in--from--left"
              style="max-width: 15rem; min-width: 15rem;">
        <p class="card-text">
          {{post.text}}
        </p>
        <div slot="footer" class="posts__content__card__footer">
          <b-button size="sm" variant="danger" @click="showModal(post._id)">Delete</b-button>
          <b-button size="sm" @click="showEditModal(post._id, post.text)">Edit</b-button>
        </div>
      </b-card>
    </b-card-group>
    <b-modal ref="editNoteModal" id="modal" title="Edit" hide-footer>
      <b-input-group>
        <b-form-input v-model="tobeEditedText"
                      type="text">{{this.tobeEditedText}}</b-form-input>
        <b-input-group-append>
          <b-btn v-on:click="editPost" variant="success">EDIT</b-btn>
        </b-input-group-append>
      </b-input-group>
    </b-modal>
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
</template>

<script>
  import PostService from '../services/PostService'

  export default {
  name: 'HistoryComponent',
  data ()  {
    return {
      posts: [],
      toDate: '',
      fromDate: '',
      keyword: ''
    }
  },
  methods: {
    async getPosts() {
      this.posts =await PostService.getPostsByCriteria(this.fromDate, this.toDate, this.keyword)
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
  @import "../styles/components/HistoryComponent.scss";
</style>
