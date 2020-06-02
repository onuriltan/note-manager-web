import axios from 'axios'
import Store from '../store/index'

const url = process.env.VUE_APP_NOTES_URL

class NotesService {
  // Get Posts
  static getPosts (pageNumber) { // static to directly reach the getPosts method instead of instantiating NotesService class
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` },
      params: { page: pageNumber }
    }

    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url, config)
        const data = res.data
        resolve(
          data
        )
      } catch (e) {
        reject(e)
      }
    })
  }

  static getPostsByCriteria (fromDate, toDate, keyword, pageNumber) { // static to directly reach the getPosts method instead of instantiating NotesService class
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` },
      params: { page: pageNumber }
    }
    return new Promise(async (resolve, reject) => {
      if (fromDate === '') fromDate = '%20'
      if (toDate === '') toDate = '%20'
      if (keyword === '') keyword = '%20'
      try {
        const res = await axios.get(`${url}/${fromDate}/${toDate}/${keyword}`, config)
        const data = res.data
        if (data.docs !== []) {
          resolve(
            data
          )
        } else resolve([])
      } catch (e) {
        reject(e)
      }
    })
  }

  // Create Post
  static insertPost (text) {
    Store.dispatch('checkIsAuthenticated')
    return axios.post(url, { text }, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` } })
  }

  // Delete Post
  static deletePost (id) {
    Store.dispatch('checkIsAuthenticated')
    return axios.delete(`${url}/${id}`, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` } })
  }

  // Edit Post
  static editPost (id, text) {
    Store.dispatch('checkIsAuthenticated')
    return axios.put(`${url}/${id}`, { text }, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` } })
  }
}

export default NotesService
