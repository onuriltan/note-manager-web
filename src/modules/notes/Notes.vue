<template>
  <div class="notes">
    <div
      class="notes__content"
      v-if="searchClicked && notes && notes.length !== 0 && isLoading === false"
    >
      <b-card-group deck class="notes__content__cards">
        <b-card
          :title="post.createdAt | convertDate()"
          tag="article"
          v-for="post in notes"
          v-bind:key="post._id"
          class="mb-2 notes__content__card slide--in--from--left"
        >
          <p class="card-text">{{ post.text }}</p>
          <div slot="footer" class="notes__content__card__footer">
            <b-button
              size="sm"
              variant="danger"
              @click="showDeleteModal(post._id)"
              >Delete</b-button
            >
            <b-button size="sm" @click="showEditModal(post._id, post.text)"
              >Edit</b-button
            >
          </div>
        </b-card>
      </b-card-group>
      <b-modal ref="editNoteModal" id="modal" title="Edit" hide-footer>
        <b-input-group>
          <b-form-input v-model="tobeEditedText" type="text"></b-form-input>
          <b-input-group-append>
            <b-btn
              v-on:click="neditPost()"
              variant="success"
              :disabled="!tobeEditedText"
              >EDIT</b-btn
            >
          </b-input-group-append>
        </b-input-group>
      </b-modal>
      <b-modal ref="deleteNoteModal" id="modal" title="Delete">
        <p class="my-4">Do you want to delete the note?</p>
        <div slot="modal-footer">
          <b-btn
            class="float-right"
            variant="primary"
            @click="hideDeleteModal()"
            >NO</b-btn
          >
          <b-btn class="float-right" variant="danger" @click="ndeletePost()"
            >YES</b-btn
          >
        </div>
      </b-modal>
    </div>
    <div
      class="notes__empty easein"
      v-if="searchClicked && notes && notes.length === 0 && isLoading === false"
    >
      <i class="fa fa-file-o fa-5x notes__empty__icon" aria-hidden="true"></i>
      <span
        v-if="this.$parent.$vnode.componentOptions.tag === 'Dashboard'"
        class="notes__empty__message"
        >No notes found.</span
      >
      <span
        v-if="this.$parent.$vnode.componentOptions.tag === 'History'"
        class="notes__empty__message"
        >No notes were found in the criteria you searched for.</span
      >
    </div>

    <div class="notes__empty" v-if="searchClicked && isLoading">
      <i class="fa fa-refresh fa-spin fa-5x icon-color"></i>
    </div>

    <div
      class="notes__empty"
      v-if="
        this.$parent.$vnode.componentOptions.tag === 'History' && !searchClicked
      "
    ></div>
  </div>
</template>

<script>
export default {
  name: "Notes",
  props: {
    editPost: Function,
    isLoading: Boolean,
    deletePost: Function,
    notes: Array,
    parentComponentName: String,
    searchClicked: Boolean,
  },
  data() {
    return {
      tobeEditedText: "",
      tobeDeletedId: "",
      tobeEditedId: "",
    };
  },
  methods: {
    showEditModal(id, text) {
      this.tobeEditedId = id;
      this.tobeEditedText = text;
      this.$refs.editNoteModal.show();
    },
    showDeleteModal(id) {
      this.tobeDeletedId = id;
      this.$refs.deleteNoteModal.show();
    },
    hideDeleteModal() {
      this.tobeDeletedId = "";
      this.$refs.deleteNoteModal.hide();
    },
    ndeletePost() {
      this.deletePost(this.tobeDeletedId);
      this.tobeDeletedId = "";
      this.$refs.deleteNoteModal.hide();
    },
    neditPost() {
      this.editPost(this.tobeEditedId, this.tobeEditedText);
      this.tobeEditedId = "";
      this.tobeEditedText = "";
      this.$refs.editNoteModal.hide();
    },
  },
  filters: {
    convertDate: function (date) {
      const theDate = new Date(date);
      return `${theDate.getDate()}/${
        theDate.getMonth() + 1
      }/${theDate.getFullYear()}`;
    },
  },
};
</script>

<style scoped lang="scss">
@import "./Notes";
</style>
