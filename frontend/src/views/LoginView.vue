<script>
import axios from 'axios'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      user: null
    }
  },
  methods: {
    async login() {
      this.user = await axios.post('http://localhost:3000/accounts/session', {
        email: this.email,
        password: this.password
      })

      console.log('->' + user)
    }
  }
}
</script>

<template lang="pug">
h2 Log in to MovieDB

p(v-if="user") You are logged in as {{ user?.data?.email }}


form(@submit.prevent="login")
  div
    label(for="email") Email
    input#email(type="text" v-model="email" required autofocus)
  div
    label(for="password") Password
    input#password(type="password" v-model="password" required)

  button(type="submit") Log in
  p
    | Don't have an account?
    router-link(to="/signup") Sign up
</template>
