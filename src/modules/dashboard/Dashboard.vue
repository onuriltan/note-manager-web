<template>
  <div class="notes-container">
    <div class="notes">
      <h1 class="notes__header">Latest Notes</h1>
      <form class="notes__create-form" @submit.prevent="createPost">
        <b-input-group class="notes__create-form__inputgroup">
          <b-form-input
            v-model="text"
            class="notes__create-form__input"
            type="text"
            placeholder="Create a note ..."
          ></b-form-input>
          <b-input-group-append>
            <b-btn
              type="submit"
              variant="success"
              :disabled="!text || isLoading"
              >Post!</b-btn
            >
          </b-input-group-append>
        </b-input-group>
      </form>
      <hr />

      <br />
      <br />

      <b-pagination-nav
        v-if="
          !!this.pagination.page &&
          !!this.pagination.pages &&
          this.pagination.pages > 1
        "
        :link-gen="toPage"
        :number-of-pages="this.pagination.pages"
        v-model="currentPage"
        use-router
      ></b-pagination-nav>

      <Notes
        :editPost="editPost"
        :deletePost="deletePost"
        :notes="notes"
        :isLoading="isLoading"
        :searchClicked="searchClicked"
      />
    </div>
  </div>
</template>

<script>
import NotesService from "../../services/notes.service";
import Notes from "../notes/Notes";

export default {
  name: "DashboardComponent",
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
      error: "",
      text: "",
      isLoading: false,
      searchClicked: true,
    };
  },
  watch: {
    "$route.params.pageNumber": function () {
      this.getNotes(600);
    },
  },
  methods: {
    toPage(pageNum) {
      return "/dashboard/" + pageNum;
    },
    async createPost() {
      this.isLoading = true;
      setTimeout(async () => {
        await NotesService.insertPost(this.text);
        await this.getNotes(0);
        this.text = "";
        this.isLoading = false;
      }, 600);
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
      this.isLoading = true;
      setTimeout(async () => {
        await NotesService.editPost(tobeEditedId, tobeEditedText);
        await this.getNotes(0);
        this.isLoading = false;
      }, 600);
    },
    async getNotes(seconds) {
      this.isLoading = true;
      setTimeout(async () => {
        let notess = [];
        try {
          if (this.$route.params.pageNumber) {
            notess = await NotesService.getNotes(this.$route.params.pageNumber);
          } else {
            notess = await NotesService.getNotes(1);
          }
          this.notes = notess.docs;
          this.pagination.total = notess.total;
          this.pagination.limit = notess.limit;
          this.pagination.page = notess.page;
          this.pagination.pages = notess.pages;
        } catch (e) {
          this.error = e.message;
        }
        this.isLoading = false;
      }, seconds);
    },
  },
  beforeMount() {
    this.getNotes(600);
  },
};
</script>

<style scoped lang="scss">
@import "./Dashboard.scss";
</style>
