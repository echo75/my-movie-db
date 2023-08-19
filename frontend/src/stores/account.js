import { defineStore } from 'pinia'
import axios from 'axios'

//axios.defaults.withCredentials = true
//axios.defaults.baseURL = 'http://localhost:3000'

export const useAccountStore = defineStore('Account', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser() {
      this.user = (
        await axios.get('http://localhost:3000/accounts/session', {
          withCredentials: true
        })
      ).data
    },
    async login({ email, password }) {
      this.user = (
        await axios.post('http://localhost:3000/accounts/session', { email, password })
      ).data
    },
    async logout() {
      await axios.delete('http://localhost:3000/accounts/session', {
        withCredentials: true
      })
      this.user = null
    }
  }
}) // end of store
