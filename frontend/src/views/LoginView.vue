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
      this.$router.push('/login')
    }
  }
}
import '../assets/login.css' // Import login.css only for this component
</script>

<template lang="pug">
.logincontainer
  .d-flex.justify-content-center.h-100
    .card
      .card-header
        h3 Sign In
        p(v-if="user") You are logged in as {{ user?.firstName }} {{ user?.surName }}
      .card-body
        form(@submit.prevent="doLogin" v-if="!user")
          .input-group.form-group
            .input-group-prepend
              span.input-group-text
                i.fas.fa-envelope
            input#email.form-control(type="text" v-model="email" placeholder='email' required autofocus)
          .input-group.form-group
            .input-group-prepend
              span.input-group-text
                i.fas.fa-key
            input#password.form-control(type="password" v-model="password" placeholder='password' required)
          .form-group
            input.btn.float-right.login_btn(type='submit' value='Login')
      .card-footer
        .d-flex.justify-content-center.links
          | Don&apos;t have an account?
          a(href='/signup') Sign Up
        .d-flex.justify-content-center
          a(href='#') Forgot your password?
</template>
<style>
.card {
  height: 370px !important;
}
</style>
