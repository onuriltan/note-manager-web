<template>
  <div class="notes">
    <b-card-group deck class="notes__content"> <!-- todo make tihs a reusable component -->
      <b-card :title="post.createdAt | convertDate()"
              tag="article"
              v-for="post in posts"
              v-bind:key="post._id"
              class="mb-2 posts__content__card fade--away slide--in--from--left"
              style="max-width: 15rem; min-width: 15rem;">
        <p class="card-text">
          {{post.text}}
        </p>
        <div slot="footer" class="notes__content__card__footer">
          <b-button size="sm" variant="danger" @click="showDeleteModal(post._id)">Delete</b-button>
          <b-button size="sm" @click="showEditModal(post._id, post.text)">Edit</b-button>
        </div>
      </b-card>
    </b-card-group>
    <b-modal ref="editNoteModal" id="modal" title="Edit" hide-footer>
      <b-input-group>
        <b-form-input v-model="tobeEditedText"
                      type="text"></b-form-input>
        <b-input-group-append>
          <b-btn v-on:click="neditPost()" variant="success">EDIT</b-btn>
        </b-input-group-append>
      </b-input-group>
    </b-modal>
    <b-modal ref="deleteNoteModal" id="modal" title="Delete">
      <p class="my-4">Do you want to delete the note?</p>
      <div slot="modal-footer">
        <b-btn class="float-right" variant="primary" @click="hideDeleteModal()">
          NO
        </b-btn>
        <b-btn class="float-right" variant="danger" @click="ndeletePost()">
          YES
        </b-btn>
      </div>
    </b-modal>
  </div>

</template>

<script>
export default {
  name: 'Notes',
  props: {
    editPost: Function,
    deletePost: Function,
    posts: Array
  },
  data () {
    return {
      tobeEditedText: '',
      tobeDeletedId: '',
      tobeEditedId: ''
    }
  },
  methods: {
    showEditModal (id, text) {
      this.tobeEditedId = id
      this.tobeEditedText = text
      this.$refs.editNoteModal.show()
    },
    showDeleteModal (id) {
      this.tobeDeletedId = id
      this.$refs.deleteNoteModal.show()
    },
    hideDeleteModal () {
      this.tobeDeletedId = ''
      this.$refs.deleteNoteModal.hide()
    },
    ndeletePost () {
      this.deletePost(this.tobeDeletedId)
      this.tobeDeletedId = ''
      this.$refs.deleteNoteModal.hide()
    },
    neditPost () {
      this.editPost(this.tobeEditedId, this.tobeEditedText)
      this.tobeEditedId = ''
      this.tobeEditedText = ''
      this.$refs.editNoteModal.hide()
    }
  },
  filters: {
    convertDate: function (date) {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Notes";
</style>
