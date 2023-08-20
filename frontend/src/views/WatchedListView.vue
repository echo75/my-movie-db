<template lang="pug">
.container
  .row
    .col-lg-12
      br
  #examples.bs-docs-section
    .row
      .col-lg-12
        .page-header
          h1 Movies I have watched
          br
    .row
      .col-lg-12
        .bs-component
          table#movie_table.table-striped
            tr
              td.td_image
                img(src='https://m.media-amazon.com/images/M/MV5BMTA3NTY2MjA0NzFeQTJeQWpwZ15BbWU3MDgwNTA3NDE@._V1_SX300.jpg' width='27' height='40')
              td Curse of the Golden Flower
              td 2006
              td.td_delete
                button#delete_button_1.btn-sm.delete(type='button' data-imdbid='tt0473444')
                  | Delete
            tr
              td.td_image
                img(src='https://m.media-amazon.com/images/M/MV5BMTgzODIwNzcyMF5BMl5BanBnXkFtZTcwMTg0MTQ1MQ@@._V1_SX300.jpg' width='27' height='40')
              td Elizabeth: The Golden Age
              td 2007
              td.td_delete
                button#delete_button_2.btn-sm.delete(type='button' data-imdbid='tt0414055')
                  | Delete
            tr
              td.td_image
                img(src='https://m.media-amazon.com/images/M/MV5BMjA5NzgyMjc2Nl5BMl5BanBnXkFtZTcwOTU3MDI3MQ@@._V1_SX300.jpg' width='27' height='40')
              td Hellboy II: The Golden Army
              td 2008
              td.td_delete
                button#delete_button_3.btn-sm.delete(type='button' data-imdbid='tt0411477')
                  | Delete
            tr
              td.td_image
                img(src='https://m.media-amazon.com/images/M/MV5BMjQ3OTgzMzY4NF5BMl5BanBnXkFtZTgwOTc4OTQyMzI@._V1_SX300.jpg' width='27' height='40')
              td Kingsman: The Golden Circle
              td 2017
              td.td_delete
                button#delete_button_4.btn-sm.delete(type='button' data-imdbid='tt4649466')
                  | Delete
            tr
              td.td_image
                img(src='https://m.media-amazon.com/images/M/MV5BYmY0MTJmNTktOGZiMC00YmU0LTlhZjQtODBlMmNkNTE3MmVlXkEyXkFqcGdeQXVyMTUyOTc1NDYz._V1_SX300.jpg' width='27' height='40')
              td The Golden Child
              td 1986
              td.td_delete
                button#delete_button_5.btn-sm.delete(type='button' data-imdbid='tt0091129')
                  | Delete
            tr
              td.td_image
                img(src='https://m.media-amazon.com/images/M/MV5BMTM2NDkxMjQxMV5BMl5BanBnXkFtZTYwNTMxMDM4._V1_SX300.jpg' width='27' height='40')
              td The Golden Compass
              td 2007
              td.td_delete
                button#delete_button_6.btn-sm.delete(type='button' data-imdbid='tt0385752')
                  | Delete
            tr
              td.td_image
                img(src='https://m.media-amazon.com/images/M/MV5BOGMyNWJhZmYtNGQxYi00Y2ZjLWJmNjktNTgzZWJjOTg4YjM3L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg' width='27' height='40')
              td The Lord of the Rings
              td 1978
              td.td_delete
                button#delete_button_7.btn-sm.delete(type='button' data-imdbid='tt0077869')
                  | Delete
            tr
              td.td_image
                img(src='https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg' width='27' height='40')
              td The Lord of the Rings: The Return of the King
              td 2003
              td.td_delete
                button#delete_button_8.btn-sm.delete(type='button' data-imdbid='tt0167260')
                  | Delete
            tr
              td.td_image
                img(src='https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg' width='27' height='40')
              td The Lord of the Rings: The Two Towers
              td 2002
              td.td_delete
                button#delete_button_9.btn-sm.delete(type='button' data-imdbid='tt0167261')
                  | Delete
    .row
      .col-lg-12
        .bs-component
          #someContainer
  footer
    .row
      .col-lg-12
        ul.list-unstyled
          li.pull-right
            a#ScrollToTop(href='#' target='_self') Back up

</template>
<script>
export default {
  mounted() {
    var deleteButtons = document.querySelectorAll('.delete')

    deleteButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        if (!confirm('Do you really want to delete the movie from your Watched-List?')) return
        button.closest('.delete').style.backgroundColor = '#ff2222'
        var tr = button.closest('tr')
        fadeOutAndRemove(tr)
      })
    })

    function fadeOutAndRemove(element) {
      var opacity = 1
      var interval = setInterval(function () {
        if (opacity > 0) {
          opacity -= 0.1
          element.style.opacity = opacity
        } else {
          clearInterval(interval)
          element.parentNode.removeChild(element)
        }
      }, 40) // Adjust the fading speed as needed
    }
  },
  methods: {}
  // Other component options here
}
</script>
<style scoped>
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

element.style {
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
