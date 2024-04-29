import axios from "axios";
import Store from "../store";

const url = process.env.VUE_APP_NOTES_URL;

class NotesService {
  static async getNotes(pageNumber) {
    Store.dispatch("auth/checkIsAuthenticated");
    const config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      params: { page: pageNumber, limit: 6 },
    };
    try {
      const res = await axios.get(url, config);
      return res.data;
    } catch (e) {
      return e;
    }
  }

  static async getNotesByCriteria(fromDate, toDate, keyword, pageNumber) {
    Store.dispatch("auth/checkIsAuthenticated");
    const config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      params: { page: pageNumber, limit: 6 },
    };
    if (keyword === "") keyword = "%20";
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

  static deletePost(id) {
    Store.dispatch("auth/checkIsAuthenticated");
    return axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
  }

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
