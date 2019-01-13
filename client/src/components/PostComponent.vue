<template>
  <div class="container">
    <div class="posts">
      <h1>Latest Posts</h1>
      <div class="posts__create-form">
        <input class="posts__create-form__input" type="text" id="create-post" v-model="text" placeholder="Create a post ...">
        <button v-on:click="createPost" class="button button--send">Post!</button>
      </div>
      <hr>
      <p class="error" v-if="error">{{error}}</p>
      <div class="posts__content">
        <div class="posts__post"
             v-for="(post, index) in posts"
             v-bind:key="post._id"
             v-on:dblclick="deletePost(post._id)"
        >
          <p class="posts__post__date">{{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}</p>
          <p class="posts__post__text">{{post.text}}</p>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import PostService from "../PostService";

  export default {
    name: 'PostComponent',
    data() {
      return {
        posts: [],
        error: '',
        text: ''
      }
    },
    methods: {
      async createPost() {
        await PostService.insertPost(this.text);
        this.posts = await PostService.getPosts();
      },
      async deletePost(id) {
        await PostService.deletePost(id);
        this.posts = await PostService.getPosts();
      }
    },
    async created() {
      try {
        this.posts = await PostService.getPosts();
      } catch (e) {
        this.error = e.message;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .button {
    padding: 7px;
    border: 0;
    background-color: darkgreen;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
  }
  .container {
    display: block;
    max-width: 1200px;
    margin: 0 auto;
    .posts {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      &__create-form {
        display: flex;
        justify-content: center;
        align-items: center;
        &__input {
          padding: 6px;
        }
      }
      &__content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 50%;
      }
      &__post {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        padding: 10px 10px 30px 10px;
        margin: 10px;
        background-color: #bcffb8;
        border: 1px solid #5bd658;
        &__date {
          top: 0;
          left: 0;
          padding: 5px 15px 5px 15px;
          background-color: darkgreen;
          color: white;
          font-size: 13px;
        }
        &__text {
          font-weight: 700 ;
          font-size: 22px;
        }
      }
    }
  }

</style>
