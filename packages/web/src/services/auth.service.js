import axios from "axios";

const url = process.env.VUE_APP_AUTH_URL;

class AuthService {
  static async login(credentials) {
    try {
      const res = await axios.post(`${url}/login`, credentials);
      return res;
    } catch (e) {
      return e.response;
    }
  }

  static async register(credentials) {
    try {
      const res = await axios.post(`${url}/register`, credentials);
      return res;
    } catch (e) {
      return e.response;
    }
  }

  static async resendConfirmationEmail(credentials) {
    try {
      const res = await axios.post(
        `${url}/resendConfirmationEmail`,
        credentials
      );
      return res;
    } catch (e) {
      return e.response;
    }
  }

  static async confirmUser(confirmationToken) {
    try {
      const res = await axios.get(`${url}/confirm/${confirmationToken}`);
      return res;
    } catch (e) {
      return e.response;
    }
  }
}

export default AuthService;
