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

            p.padding-left My Movie DB serves as a virtual library for organizing the movies you plan to watch and those you've already seen.
              br
              |You can also share reviews with other users on the My Movie DB platform.

            p.padding-left
              strong Here's a more concise and clear way to express the process:

            ol
              li Begin by searching for a movie using the search function.
              li Once you find a movie, add it to your "My Watch List." Here, you can access movie details and ratings.
                br
                |If you decide not to watch the movie, you can remove it from your list.
              li Watch the movie and then save it to "My Watched List." If you wish, you can write a review,
                br
                |and it will be stored in your "My Watched List" for future reference.
            div.padding-left
              strong How to sign up and log in:
              br
              | If you want to benefit from the functionality of the site, it's best to log in - with or without your own account.
              br
              | For more information, please visit the <a href="/about" target="_self">About</a> page!
              br
              br
              br
              br
              br
              br
</template>

<style scoped>
.padding-left {
  padding-left: 12px;
}
a {
  color: #008cba;
  text-decoration: none;
}
</style>
