import axios from "axios";
import Store from "../store/index";

const url = process.env.VUE_APP_USER_URL;

class UserService {
  // eslint-disable-next-line no-unused-vars
  static async getUser(credentials) {
    Store.dispatch("checkIsAuthenticated");
    const config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      }
    };
    try {
      const res = await axios.post(`${url}/getUser`, config);
      return res;
    } catch (e) {
      return e.response;
    }
  }

  static async changePassword(body) {
    Store.dispatch("checkIsAuthenticated");
    const config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      }
    };
    try {
      const res = await axios.post(`${url}/changePassword`, body, config);
      return res;
    } catch (e) {
      return e.response;
    }
  }
}

export default UserService;
