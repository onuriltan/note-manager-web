import axios from 'axios'

const url = process.env.VUE_APP_AUTH_URL

class SocialService {
  static loginWithFacebook (token) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.post(`${url}/facebook`, { access_token : token})
        resolve(res)
      } catch (e) {
        resolve(e.response)
      }
    })
  }
}

export default SocialService
