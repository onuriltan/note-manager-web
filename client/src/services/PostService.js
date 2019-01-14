import axios from 'axios'

const url = 'http://localhost:5000/api/posts';

class PostService {
  // Get Posts
  static getPosts() { // static to directly reach the getPosts method instead of instantiating PostService class
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
          }))
        );
      } catch (e) {
        reject(e)
      }
    })
  }

  // Create Post
  static insertPost (text) {
     return axios.post(url, { text })
  }

  // Delete Post
  static deletePost (id) {
    return axios.delete(`${url}/${id}`)
  }
}

export default PostService
