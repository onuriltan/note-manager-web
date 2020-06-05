import axios from "axios";

const url = process.env.VUE_APP_AUTH_URL;

class AuthService {
  static login(credentials) {
    return new Promise(async resolve => {
      try {
        const res = await axios.post(`${url}/login`, credentials);
        resolve(res);
      } catch (e) {
        resolve(e.response);
      }
    });
  }

  static register(credentials) {
    return new Promise(async resolve => {
      try {
        const res = await axios.post(`${url}/register`, credentials);
        resolve(res);
      } catch (e) {
        resolve(e.response);
      }
    });
  }

  static resendConfirmationEmail(credentials) {
    return new Promise(async resolve => {
      try {
        const res = await axios.post(
          `${url}/resendConfirmationEmail`,
          credentials
        );
        resolve(res);
      } catch (e) {
        resolve(e.response);
      }
    });
  }

  static confirmUser(confirmationToken) {
    return new Promise(async resolve => {
      try {
        const res = await axios.get(`${url}/confirm/${confirmationToken}`);
        resolve(res);
      } catch (e) {
        resolve(e.response);
      }
    });
  }
}

export default AuthService;
