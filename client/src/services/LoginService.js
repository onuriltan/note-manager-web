import axios from 'axios'

const url = 'http://localhost:5000/api/auth';

class AuthService {
  static login(username, password) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.post(`${url}/login`, {username, password});
        window.localStorage.setItem('token', res.data.token);
        resolve(res);
      } catch (e) {
        localStorage.removeItem('token');
        resolve(e.response)
      }
    })
  }
}

export default AuthService;
