import { LocalStorage } from 'quasar'

const ID_TOKEN_KEY = 'id_token'

export default {
  getToken () {
    return localStorage.getItem(ID_TOKEN_KEY)
  },

  saveToken (token) {
    LocalStorage.set(ID_TOKEN_KEY, token)
  },

  destroyToken () {
    LocalStorage.remove(ID_TOKEN_KEY)
  }
}
