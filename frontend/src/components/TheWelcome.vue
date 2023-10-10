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
            h2 Movie DB Users
            ul
              li(v-for="user in data" :key="user.id") {{ user.firstName }} {{ user.surName }}
</template>
