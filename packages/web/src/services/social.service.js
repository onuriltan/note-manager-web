import axios from 'axios';

const url = process.env.VUE_APP_AUTH_URL;

class SocialService {
  static async loginWithFacebook(token) {
    try {
      const res = await axios.post(`${url}/loginWithFacebook`, {
        access_token: token
      });
      return res;
    } catch (e) {
      return e.response;
    }
  }

  static async loginWithGoogle(token) {
    try {
      const res = await axios.post(`${url}/google`, { access_token: token });
      return res;
    } catch (e) {
      return e.response;
    }
  }
}

export default SocialService;
