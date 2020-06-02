import axios from 'axios'
import Store from '../store/index'

const url = process.env.VUE_APP_USER_URL

class UserService {
  static getUser (credentials) {
    Store.dispatch('checkIsAuthenticated')
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
  static changePassword (body) {
    Store.dispatch('checkIsAuthenticated')
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
