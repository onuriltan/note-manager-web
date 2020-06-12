import axios from "axios";
import Store from "../store";

const url = process.env.VUE_APP_NOTES_URL;

class NotesService {
  // Get Posts
  static async getPosts(pageNumber) {
    Store.dispatch("auth/checkIsAuthenticated");
    const config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      params: { page: pageNumber, limit: 10 },
    };

    try {
      const res = await axios.get(url, config);
      const data = res.data;
      return data;
    } catch (e) {
      return e;
    }
  }

  static async getPostsByCriteria(fromDate, toDate, keyword, pageNumber) {
    Store.dispatch("auth/checkIsAuthenticated");
    const config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      params: { page: pageNumber },
    };
    try {
      const res = await axios.get(
        `${url}/${fromDate}/${toDate}/${keyword}`,
        config
      );
      const data = res.data;
      if (data.docs !== []) {
        return data;
      } else return [];
    } catch (e) {
      return e;
    }
  }

  // Create Post
  static insertPost(text) {
    Store.dispatch("auth/checkIsAuthenticated");
    return axios.post(
      url,
      { text },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
  }

  // Delete Post
  static deletePost(id) {
    Store.dispatch("auth/checkIsAuthenticated");
    return axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
  }

  // Edit Post
  static editPost(id, text) {
    Store.dispatch("auth/checkIsAuthenticated");
    return axios.put(
      `${url}/${id}`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
  }
}

export default NotesService;
