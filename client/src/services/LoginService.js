import axios from 'axios'

const url = '/api/auth'

class AuthService {
  static login (credentials) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.post(`${url}/login`, credentials)
        resolve(res)
      } catch (e) {
        resolve(e.response)
      }
    })
  }
}

export default AuthService
