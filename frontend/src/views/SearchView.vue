<script>
import axios from 'axios'
//import config from '@/config.js'
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

import { useAccountStore } from '@/stores/account' // Import the account store
import { mapState } from 'pinia'

export default {
  data() {
    return {
      search_s: '',
      movies: [], // To hold the fetched movies
      hasFetchedOnce: false // Flag to track if fetchMovies has been called at least once
    }
  },
  computed: {
    ...mapState(useAccountStore, ['user']) // Map the user state to a local computed property
  },
  created() {
    this.fetchMovies()
  },
  mounted() {
    // Use event delegation to handle click events on delete buttons
    this.$el.addEventListener('click', this.handleSaveClick)
  },
  beforeDestroy() {
    // Cleanup: Remove the event listener when the component is destroyed
    this.$el.removeEventListener('click', this.handleSaveClick)
  },
  methods: {
    async fetchMovies() {
      if (this.search_s.length < 3) {
        if (this.hasFetchedOnce) {
          alert('Please input more then 3 characters')
        }
        return false
      }
      if (!this.search_s) {
        // If search query is empty, clear the movies array
        this.movies = []
        return
      }
      try {
        const response = await axios.get('/movies', {
          params: {
            title: this.search_s
          }
        })
        this.movies = response.data // Assuming the API response contains an array of movies
        this.hasFetchedOnce = true // Set the flag to true after the first fetch
        console.log(this.movies)
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },
    async saveMovie(id, title, year, type, poster) {
      try {
        const response = await axios.post(`/users/${this.user._id}/watchlist`, {
          imdbID: id,
          Title: title,
          Year: year,
          Type: type,
          Poster: poster
        })
        console.log(response)
      } catch (error) {
        console.error('Error saving movie:', error)
      }
    },
    handleSaveClick(event) {
      const target = event.target
      if (target.classList.contains('save')) {
        if (!confirm('Do you really want to save the movie from your Watched-List?')) return

        const id = target.getAttribute('data-imdbid')
        const title = target.getAttribute('data-title')
        const year = target.getAttribute('data-year')
        const type = target.getAttribute('data-type')
        const poster = target.getAttribute('data-poster')
        // Call the saveMovie method with the retrieved id
        this.saveMovie(id, title, year, type, poster)

        target.closest('.save').style.backgroundColor = '#129b29'
        target.closest('.save').style.color = '#ffffff'
        target.closest('.save').innerHTML = 'Saved'
        target.closest('.save').disabled = true

        //const tr = target.closest('tr')
        //this.fadeOutAndRemove(tr)
      }
    },
    // fadeOutAndRemove(element) {
    //   var opacity = 1
    //   var interval = setInterval(() => {
    //     if (opacity > 0) {
    //       opacity -= 0.1
    //       element.style.opacity = opacity
    //     } else {
    //       clearInterval(interval)
    //       element.parentNode.removeChild(element)
    //     }
    //   }, 40) // Adjust the fading speed as needed
    // },
    resetSearch() {
      this.search_s = '' // Reset the search query
      this.movies = [] // Clear the movies array
    }
  }
}
</script>
<template>
  <div class="container">
    <div class="bs-docs-section" id="examples">
      <form @submit.prevent="fetchMovies" class="well form-search">
        <div class="row">
          <div class="col-md-12">
            <br />
            <br />
            <div class="input-group">
              <label class="control-label" for="search_s"></label>
              <input type="text" id="search_s" v-model="search_s" class="input-small" />
              <button id="search-by-title-button" type="submit" class="btn btn-warning">
                Find Movies
              </button>
              <button
                id="search-by-title-reset"
                type="button"
                class="btn btn-secondary"
                @click="resetSearch"
              >
                Reset List
              </button>
            </div>
          </div>
        </div>
      </form>
      <br />
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
                  <td class="td_save">
                    <button
                      class="btn-sm save"
                      type="button"
                      :data-imdbid="movie.imdbID"
                      :data-title="movie.Title"
                      :data-year="movie.Year"
                      :data-type="movie.Type"
                      :data-poster="movie.Poster"
                      :style="{ width: !user ? '128px' : '80px' }"
                      :disabled="!user"
                    >
                      {{ user ? 'Save' : 'Login to Save' }}
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
</template>
<style scoped>
@import '@/assets/hovermoviepic.css';
#movie_table {
  width: 100%;
}

#movie_table td {
  min-width: 40px;
  text-align: left;
  padding: 2px 0;
  height: 42px;
}

td.td_save {
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
.save {
  background-color: #7fc0e0;
  width: 80px;
}

.save:hover {
  background-color: #0079a1;
  color: #ffffff;
}

.btn-sm {
  padding: 8px 16px;
}

.btn-sm,
.btn-group-sm > .btn {
  font-size: 15px;
  border: 1px solid transparent;
  border-radius: 0px;
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

.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #dddddd;
}

.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #dddddd;
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
  border-top: 2px solid #dddddd;
}

.table .table {
  background-color: #ffffff;
}

.table-condensed > thead > tr > th,
.table-condensed > tbody > tr > th,
.table-condensed > tfoot > tr > th,
.table-condensed > thead > tr > td,
.table-condensed > tbody > tr > td,
.table-condensed > tfoot > tr > td {
  padding: 5px;
}

.table-bordered {
  border: 1px solid #dddddd;
}

.table-bordered > thead > tr > th,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > tbody > tr > td,
.table-bordered > tfoot > tr > td {
  border: 1px solid #dddddd;
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
