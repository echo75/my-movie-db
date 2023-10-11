<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
import '@/assets/fontawesome.min.js'

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
import '../assets/login.css' // Import login.css only for this component
</script>

<template lang="pug">
.logincontainer
  .d-flex.justify-content-center.h-100
    .card_signup
      .card-header
        h3 Sign up
        p(v-if="user") You are logged in as {{ user?.firstName }} {{ user?.surName }}
      .card-body
        form(@submit.prevent="doSignUp")
          .input-group.form-group
            .input-group-prepend
              span.input-group-text
                i.fas.fa-user
            input#firstName.form-control(type="text" v-model="firstName" placeholder='firstname' required autofocus)
          .input-group.form-group
            .input-group-prepend
              span.input-group-text
                i.fas.fa-user
            input#surName.form-control(type="text" v-model="surName" placeholder='surname' required)
          .input-group.form-group
            .input-group-prepend
              span.input-group-text
                i.fas.fa-envelope
            input#email.form-control(type="email" v-model="email" placeholder='email' required)
          .input-group.form-group
            .input-group-prepend
              span.input-group-text
                i.fas.fa-key
            input#password.form-control(type="password" v-model="password" placeholder='password' required)
          .form-group
            input.btn.float-right.login_btn(type='submit' value='Sign up')
            br
      .card-footer
        .d-flex.justify-content-center.links
          | Do have an account?
          a(href='/login') Login
        .d-flex.justify-content-center
          a(href='#') Forgot your password?
</template>
<style>
/* .card {
  height: 370px !important;
} */

@media (min-width: 1400px) {
  .container-xxl,
  .container-xl,
  .container-lg,
  .container-md,
  .container-sm,
  .container {
    max-width: 1320px !important;
  }
}
.container {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-right: auto;
  margin-left: auto;
}
</style>
