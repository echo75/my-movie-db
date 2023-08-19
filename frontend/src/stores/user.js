import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

export const useUserStore = defineStore('User', {
  actions: {
    async signup(firstName, surName, email, password) {
      await axios.post('/users', {
        firstName,
        surName,
        email,
        password
      })
    }
  }
}) // end of store
