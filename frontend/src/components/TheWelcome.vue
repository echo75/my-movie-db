<script setup>
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const { data } = await axios.get('/users')
</script>

<template lang="pug">
div.container
    div.bs-docs-section
        div.row
            div.col-md-12.mt-5
            h2.mb-3 My Movie DB
            p.padding-left This is a simple Vue.js frontend with a Node.js backend. The backend is using Express.js and MongoDB.
</template>

<style scoped>
.padding-left {
  padding-left: 12px;
}
</style>
