<script>
import axios from 'axios'
import { mapActions } from 'pinia'
import { useAccountStore } from '../stores/account'
import { mapState } from 'pinia'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    ...mapActions(useAccountStore, ['login']),
    async doLogin() {
      await this.login({ email: this.email, password: this.password })
      this.$router.push('/')
    }
  }
}
</script>

<template lang="pug">
h2 Log in to MovieDB

p(v-if="user") You are logged in as {{ user?.firstName }}
p(v-if="user") Logged in as: {{ user?.email }}

form(@submit.prevent="doLogin" v-if="!user")
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
