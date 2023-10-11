<template>
  <div class="container">
    <div class="bs-docs-section" id="examples">
      <div class="row">
        <div class="col-md-12 mt-5">
          <h2 class="mb-3">My Watch List</h2>
          <p class="padding-left" v-if="movies.length != 0">Here is a selection of movies you've stored from the OMDd, and you're looking forward to watching them on your TV.<br>
            But first read about the movie and decide whether you'd like to watch it or not.</p>
          <p class="padding-left" v-if="movies.length === 0">You don't have any movies saved from the OMDd that you're eager to watch on your TV.<br>
            Navigate to the <a href="/search" target="_self">Search</a> function and find a great movie for yourself.</p>
      </div>
    </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="bs-component">
            <table id="movie_table" class="table-striped">
              <tbody>
                <tr v-for="movie in movies" :key="movie.id">
                  <td class="td_image">
                    <ul class="enlarge">
                      <!--We give the list a class so that we can style it seperately from other unordered lists-->
                      <!--First Image-->
                      <li>
                        <img
                          v-if="movie.Poster === 'N/A'"
                          src="@/assets/placeholder.jpg"
                          width="27"
                          height="40"
                          alt="No Poster Available"
                        />
                        <img
                          v-else="movie.Poster"
                          :src="movie.Poster"
                          width="27"
                          height="40"
                          alt="Movie Poster"
                        /><!--thumbnail image-->
                        <span>
                          <!--span contains the popup image-->
                          <img
                            v-if="movie.Poster === 'N/A'"
                            src="@/assets/placeholder.jpg"
                            style="width: 800%; height: 800%"
                            alt="No Poster Available"
                          />
                          <img
                            v-else="movie.Poster"
                            :src="movie.Poster"
                            style="width: 800%; height: 800%"
                            alt="Movie Poster"
                          />
                          <!--popup image-->
                        </span>
                      </li>
                    </ul>
                  </td>
                  <td>{{ movie.Title }}</td>
                  <td>{{ movie.Year }}</td>
                  <td class="td_delete" @click="handleButtonClick">
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm about"
                      style="margin: 1px 2px"
                      :data-imdbid="movie.imdbID"
                      data-bs-toggle="modal"
                      data-bs-target=".movie-modal"
                    >
                      About this movie
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm watched"
                      style="margin: 1 2px"
                      :data-imdbid="movie.imdbID"
                    >
                      Mark as watched
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm delete"
                      style="margin: 1px 2px"
                      :data-imdbid="movie.imdbID"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="bs-component">
            <div id="someContainer"></div>
          </div>
        </div>
      </div>
    </div>
    <footer v-if="movies.length != 0">
      <div class="row">
        <div class="col-lg-12">
          <ul class="list-unstyled">
            <li class="pull-right"><a id="ScrollToTop" href="#" target="_self">Back up</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
  <movie-modal :movie-info="movieInfo" :movie-review="movieReview"></movie-modal>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
import { useAccountStore } from '@/stores/account' // Import the account store
import { mapState } from 'pinia'
import MovieModal from '../components/MovieModal.vue' // Import the component

export default {
  data() {
    return {
      movies: [], // To hold the fetched movies
      clickedImdbId: '', // Store clicked imdbId
      movieInfo: {}, // Store detailed movie info
      movieReview: [] // Store reviews
    }
  },
  props: {
    imdbId: String // Define the prop to receive the IMDb ID
  },
  components: {
    MovieModal // Register the component
  },
  computed: {
    ...mapState(useAccountStore, ['user']) // Map the user state to a local computed property
  },
  mounted() {
    this.fetchMovies() // Moved fetchMovies to mounted hook to ensure data is loaded before attaching event listeners
  },

  methods: {
    handleButtonClick(event) {
      const target = event.target

      if (target.classList.contains('delete')) {
        this.handleDeleteClick(event)
      } else if (target.classList.contains('about')) {
        this.handleAboutClick(event)
        this.fetchDetailedInfo(event)
        this.fetchReviews(event)
      } else if (target.classList.contains('watched')) {
        this.handleWatchedClick(event)
      }
    },
    async fetchMovies() {
      try {
        const response = await axios.get(`/users/${this.user._id}/watchlist`)
        this.movies = response.data // Assuming the API response contains an array of movies
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },
    async deleteMovie(id) {
      try {
        const response = await axios.delete(`/users/${this.user._id}/watchlist/${id}`)
        console.log(response)
      } catch (error) {
        console.error('Error deleting movie:', error)
      }
    },
    async moveMovie(id) {
      try {
        const response = await axios.post(`/users/${this.user._id}/watchedlist/${id}`)
        console.log(response)
      } catch (error) {
        console.error('Error marking movie as watched:', error)
      }
    },
    handleWatchedClick(event) {
      const target = event.target
      if (target.classList.contains('watched')) {
        if (!confirm('Do you really want to move this movie to your Watched-List?')) return

        var id = target.getAttribute('data-imdbID')

        // Call the deleteMovie method with the retrieved id
        this.moveMovie(id)

        target.closest('.watched').style.backgroundColor = '#35ad14'
        const tr = target.closest('tr')
        this.fadeOutAndRemove(tr)
      }
    },
    handleDeleteClick(event) {
      const target = event.target
      if (target.classList.contains('delete')) {
        if (!confirm('Do you really want to delete the movie from your Watch-List?')) return

        var id = target.getAttribute('data-imdbID')

        // Call the deleteMovie method with the retrieved id
        this.deleteMovie(id)

        target.closest('.delete').style.backgroundColor = '#ff2222'
        const tr = target.closest('tr')
        this.fadeOutAndRemove(tr)
      }
    },
    fadeOutAndRemove(element) {
      var opacity = 1
      var interval = setInterval(() => {
        if (opacity > 0) {
          opacity -= 0.1
          element.style.opacity = opacity
        } else {
          clearInterval(interval)
          element.parentNode.removeChild(element)
        }
      }, 40) // Adjust the fading speed as needed
    },
    handleAboutClick(event) {
      const target = event.target
      if (target.classList.contains('about')) {
        var id = target.getAttribute('data-imdbID')
        console.log(id)
        this.clickedImdbId = id
      }
    },
    async fetchDetailedInfo(event) {
      const target = event.target
      const imdbID = target.getAttribute('data-imdbID')
      try {
        const response = await axios.get('/movies/details', {
          params: {
            imdbID: imdbID
          }
        })
        console.log(response.data)
        this.movieInfo = response.data
      } catch (error) {
        console.error('Error fetching detailed info:', error)
      }
    },
    // get all reviews of all users for a specific movie
    async fetchReviews(event) {
      const target = event.target
      const imdbID = target.getAttribute('data-imdbID')
      try {
        const response = await axios.get(`/reviews/${imdbID}`)
        console.log(response.data)
        this.movieReview = response.data
      } catch (error) {
        console.error('Error fetching detailed info:', error)
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/font-awesome.min.css';
@import '@/assets/hovermoviepic.css';

:root {
  --grey: #dddddd;
}

#movie_table {
  width: 100%;
}

#movie_table td {
  min-width: 40px;
  text-align: left;
  padding: 2px 0;
  height: 42px;
}

td.td_delete {
  text-align: right !important;
}

.input_movie {
  width: 240px;
  background: transparent;
  border: none;
}

.input_year {
  width: 40px;
  background: transparent;
  border: none;
}

/* Buttons */
.watched,
.about,
.delete {
  border: rgb(3, 24, 93) solid 1px;
  color: #ffca2c;
  background-color: #2c3035;
}
.watched:hover,
.delete:hover,
.about:hover {
  color: #ffffff;
  background-color: #727d87;
}

/* Stars */
.fa,
.fas {
  font-weight: 900;
  color: gold;
}

#movie_table td {
  min-width: 40px;
  text-align: left;
  padding: 2px 0;
  height: 42px;
}

.table-striped > tbody > tr:nth-child(odd) > td,
.table-striped > tbody > tr:nth-child(odd) > th {
  background-color: #eeeeee;
}

td,
th {
  padding: 0;
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

User-Agent-Stylesheet td {
  display: table-cell;
  vertical-align: inherit;
}

table {
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

table {
  background-color: transparent;
}

th {
  text-align: left;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 21px;
}

.table > * > tr > th,
.table > * > tr > td {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid var(--grey);
}

.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid var(--grey);
}

.table > caption + thead > tr:first-child > th,
.table > colgroup + thead > tr:first-child > th,
.table > thead:first-child > tr:first-child > th,
.table > caption + thead > tr:first-child > td,
.table > colgroup + thead > tr:first-child > td,
.table > thead:first-child > tr:first-child > td {
  border-top: 0;
}

.table > tbody + tbody {
  border-top: 2px solid var(--grey);
}

.table .table {
  background-color: var(--grey);
}

.table-condensed > * > tr > th,
.table-condensed > * > tr > td {
  padding: 5px;
}

.table-bordered {
  border: 1px solid var(--grey);
}

.table-bordered > * > tr > th,
.table-bordered > * > tr > td {
  border: 1px solid var(--grey);
}

.table-bordered > thead > tr > th,
.table-bordered > thead > tr > td {
  border-bottom-width: 2px;
}

.table-striped > tbody > tr:nth-child(odd) > td,
.table-striped > tbody > tr:nth-child(odd) > th {
  background-color: #eeeeee;
}

.table-hover > tbody > tr:hover > td,
.table-hover > tbody > tr:hover > th {
  background-color: #f5f5f5;
}

table col[class*='col-'] {
  position: static;
  float: none;
  display: table-column;
}

table td[class*='col-'],
table th[class*='col-'] {
  position: static;
  float: none;
  display: table-cell;
}

.pull-right {
  float: right !important;
}

a {
  color: #008cba;
  text-decoration: none;
}

.list-unstyled {
  padding-top: 8px;
}
</style>
