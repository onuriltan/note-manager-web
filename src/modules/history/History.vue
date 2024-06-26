<template>
  <div class="history-container">
    <h1 class="history__header">Notes History</h1>
    <b-form class="history__form" v-on:submit.prevent="getNotes(600)">
      <div class="history__form__content">
        <b-form-group
          id="fromDate"
          class="history__form__content__item mr-2 ml-2"
          label="From Date"
          label-for="fromDate"
        >
          <b-form-input
            id="fromDate"
            type="date"
            min="2019-05-05"
            class="form-control"
            v-model="fromDate"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="toDate"
          class="history__form__content__item mr-2 ml-2"
          label="To Date"
          label-for="toDate"
        >
          <b-form-input
            id="fromDate"
            type="date"
            :min="fromDate"
            class="form-control"
            v-model="toDate"
            :disabled="fromDate === ''"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="keyword"
          class="history__form__content__item mr-2 ml-2"
          label="Keyword"
          label-for="keyword"
        >
          <b-form-input id="keyword" v-model="keyword"></b-form-input>
        </b-form-group>
        <b-button
          type="submit"
          class="history__form__content__button mr-2 ml-2 mb-3"
          variant="success"
          :disabled="!fromDate || !toDate"
          >Search</b-button
        >
      </div>
    </b-form>

    <br />
    <br />
    <div v-if="this.pagination !== null">
      <b-pagination-nav
        v-if="this.pagination.pages > 1"
        :link-gen="toPage"
        align="center"
        use-router
        :number-of-pages="this.pagination.pages"
        v-model="currentPage"
      ></b-pagination-nav>
    </div>

    <Notes
      v-cloak
      :deletePost="deletePost"
      :editPost="editPost"
      :notes="notes"
      :isLoading="isLoading"
      :searchClicked="searchClicked"
    />
  </div>
</template>

<script>
import NotesService from "../../services/notes.service";
import Notes from "../notes/Notes";

export default {
  name: "HistoryComponent",
  components: {
    Notes,
  },
  data() {
    return {
      notes: [],
      pagination: {
        total: 0,
        limit: 0,
        page: 0,
        pages: 0,
      },
      currentPage: 1,
      toDate: "",
      fromDate: "",
      keyword: "",
      isLoading: false,
      searchClicked: false,
    };
  },
  watch: {
    "$route.params.pageNumber": function () {
      this.getNotes(600);
    },
  },

  methods: {
    toPage(pageNum) {
      return "/notes-history/" + pageNum;
    },
    async deletePost(tobeDeletedId) {
      this.isLoading = true;
      setTimeout(async () => {
        await NotesService.deletePost(tobeDeletedId);
        await this.getNotes(0);
        this.isLoading = false;
      }, 600);
    },
    async editPost(tobeEditedId, tobeEditedText) {
      setTimeout(async () => {
        await NotesService.editPost(tobeEditedId, tobeEditedText);
        await this.getNotes(0);
      }, 600);
    },
    async getNotes(seconds) {
      this.isLoading = true;
      this.searchClicked = true;
      setTimeout(async () => {
        this.notes = [];
        let notess = [];
        if (this.$route.params.pageNumber) {
          notess = await NotesService.getNotesByCriteria(
            this.fromDate,
            this.toDate,
            this.keyword,
            this.$route.params.pageNumber
          );
        } else {
          notess = await NotesService.getNotesByCriteria(
            this.fromDate,
            this.toDate,
            this.keyword,
            1
          );
        }
        this.notes = notess.docs;
        this.pagination.total = notess.total;
        this.pagination.limit = notess.limit;
        this.pagination.page = notess.page;
        this.pagination.pages = notess.pages;
        this.isLoading = false;
      }, seconds);
    },
  },
  filters: {
    convertDate: (date) => {
      return (
        date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate()
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "./History";
</style>
