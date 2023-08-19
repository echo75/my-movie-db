<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  name: 'SignUpView',
  data() {
    return {
      firstName: '',
      surName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signup']),
    async doSignUp() {
      await this.signup(this.firstName, this.surName, this.email, this.password)
      this.$router.push('/login')
    }
  }
}
</script>

<template lang="pug">
h2 Sign up to MovieDB


form(@submit.prevent="doSignUp")
  div
    label(for="firstName") First name
    input#firstName(type="text" v-model="firstName" required )
  div
    label(for="surName") Surname
    input#surName(type="text" v-model="surName" required )
  div
    label(for="email") Email
    input#email(type="text" v-model="email" required )
  div
    label(for="password") Password
    input#password(type="password" v-model="password" required)

  button(type="submit") Sign up
  p
    | Do have an account?
    router-link(to="/login") Login
</template>
