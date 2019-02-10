import axios from 'axios'

const url = process.env.VUE_APP_USER_URL

class UserService {
  static getUser (credentials) {
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return new Promise(async (resolve) => {
      try {
        const res = await axios.post(`${url}/getUser`, config)
        resolve(res)
      } catch (e) {
        resolve(e.response)
      }
    })
  }
  static changePassword (credentials, body) {
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return new Promise(async (resolve) => {
      try {
        const res = await axios.post(`${url}/changePassword`, body, config)
        resolve(res)
      } catch (e) {
        resolve(e.response)
      }
    })
  }

}

export default UserService
