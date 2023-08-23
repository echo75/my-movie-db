<template>
  <div class="container">
    <div class="bs-docs-section" id="examples">
      <br />
      <br />
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
                  <td class="td_delete">
                    <button class="btn-sm delete" type="button" :data-imdbid="movie.imdbID">
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
    <footer>
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
<script>
import axios from 'axios'
import config from '@/config.js' // Adjust the path to the config.js file

export default {
  data() {
    return {
      movies: [] // To hold the fetched movies
    }
  },
  mounted() {
    this.fetchMovies() // Moved fetchMovies to mounted hook to ensure data is loaded before attaching event listeners

    // Use event delegation to handle click events on delete buttons
    this.$el.addEventListener('click', this.handleDeleteClick)
  },
  beforeDestroy() {
    // Cleanup: Remove the event listener when the component is destroyed
    this.$el.removeEventListener('click', this.handleDeleteClick)
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get(
          `${config.apiUrl}/users/64df7e89ac6bb6f91e23a0fd/watchlist`
        )
        this.movies = response.data // Assuming the API response contains an array of movies
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },
    async deleteMovie(id) {
      try {
        const response = await axios.delete(
          `${config.apiUrl}/users/64df7e89ac6bb6f91e23a0fd/watchlist/${id}`
        )
        console.log(response)
      } catch (error) {
        console.error('Error deleting movie:', error)
      }
    },
    handleDeleteClick(event) {
      const target = event.target
      if (target.classList.contains('delete')) {
        if (!confirm('Do you really want to delete the movie from your Watched-List?')) return

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
    }
  }
}
</script>

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
.delete {
  background-color: #7fc0e0;
}

.delete:hover {
  background-color: #0079a1;
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
