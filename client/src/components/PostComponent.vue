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
@import "../styles/components/PostComponent";
</style>
