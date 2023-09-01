<template>
  <div
    class="modal fade review-modal"
    id="exampleModalCenteredScrollable"
    tabindex="-1"
    aria-labelledby="exampleModalCenteredScrollableTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalCenteredScrollableTitle">Rate this Movie</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container text-center">
            <div class="row">
              <div class="col-md-auto poster">
                <div v-if="movieInfo?.Poster && movieInfo?.Poster != 'N/A'">
                  <img v-bind:src="movieInfo?.Poster" alt="poster" class="img-fluid responsive" />
                </div>
                <div v-else>
                  <img
                    src="https://via.placeholder.com/300x450"
                    alt="poster"
                    class="img-fluid responsive"
                  />
                </div>
              </div>
              <div class="col content">
                <div class="plott">
                  <h2>{{ movieInfo?.Title }}</h2>
                </div>
                <div class="ratingbox">
                  <h4>
                    Rating:
                    <div
                      v-show="
                        (movieInfo && movieInfo.imdbRating == 'N/A') || movieInfo.imdbRating == 0
                      "
                      class="rating"
                    >
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                    <div
                      v-show="movieInfo && movieInfo.imdbRating >= 0 && movieInfo.imdbRating < 1"
                      class="rating"
                    >
                      <i class="fas fa-star-half-alt"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                    <div
                      v-show="movieInfo && movieInfo.imdbRating >= 1 && movieInfo.imdbRating < 2"
                      class="rating"
                    >
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                    <div
                      v-show="movieInfo && movieInfo.imdbRating >= 2 && movieInfo.imdbRating < 3"
                      class="rating"
                    >
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star-half-alt"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                    <div
                      v-show="movieInfo && movieInfo.imdbRating >= 3 && movieInfo.imdbRating < 4"
                      class="rating"
                    >
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                    <div
                      v-show="movieInfo && movieInfo.imdbRating >= 4 && movieInfo.imdbRating < 5"
                      class="rating"
                    >
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star-half-alt"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                    <div
                      v-show="movieInfo && movieInfo.imdbRating >= 5 && movieInfo.imdbRating < 6"
                      class="rating"
                    >
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                    <div
                      v-show="movieInfo && movieInfo.imdbRating >= 6 && movieInfo.imdbRating < 7"
                      class="rating"
                    >
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star-half-alt"></i>
                      <i class="far fa-star"></i>
                    </div>
                    <div
                      v-show="movieInfo && movieInfo.imdbRating >= 7 && movieInfo.imdbRating < 8"
                      class="rating"
                    >
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                    <div
                      v-show="movieInfo && movieInfo.imdbRating >= 8 && movieInfo.imdbRating < 9"
                      class="rating"
                    >
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star-half-alt"></i>
                    </div>
                    <div
                      v-show="movieInfo && movieInfo.imdbRating >= 9 && movieInfo.imdbRating < 10"
                      class="rating"
                    >
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                    <div class="rating" v-if="movieInfo.imdbRating === 'N/A'">
                      &nbsp;&nbsp; (no rating)
                    </div>
                    <div class="rating" v-else>&nbsp;&nbsp; {{ movieInfo.imdbRating }} of 10</div>
                  </h4>
                </div>
                <rating-stars :value="movieInfo.imdbRating"></rating-stars>
                <div class="ratingbox">
                  <h4>Write a Review:</h4>
                  <form @submit.prevent="handleReview">
                    <textarea v-model="text" name="text" id="text" cols="30" rows="10"></textarea>
                    <button type="submit" class="btn btn-outline-dark me-2">Submit</button>
                  </form>
                </div>
                <div class="reviews">
                  <h4>Reviews:</h4>

                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum hic nihil
                    illum! Dolorum repellendus, id iusto sunt minima ut rerum quis omnis aut
                    laudantium autem odit possimus quaerat animi molestiae. Lorem ipsum, dolor sit
                    amet consectetur adipisicing elit. Dolorum hic nihil illum! Dolorum repellendus,
                    id iusto sunt minima ut rerum quis omnis aut laudantium autem odit possimus
                    quaerat animi molestiae. Lorem ipsum, dolor sit amet consectetur adipisicing
                    elit. Dolorum hic nihil illum! Dolorum repellendus, id iusto sunt minima ut
                    rerum quis omnis aut laudantium autem odit possimus quaerat animi molestiae.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum hic nihil
                    illum! Dolorum repellendus, id iusto sunt minima ut rerum quis omnis aut
                    laudantium autem odit possimus quaerat animi molestiae. Lorem ipsum, dolor sit
                    amet consectetur adipisicing elit. Dolorum hic nihil illum! Dolorum repellendus,
                    id iusto sunt minima ut rerum quis omnis aut laudantium autem odit possimus
                    quaerat animi molestiae.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-light me-2" data-bs-dismiss="modal">
            Close
          </button>
          <!--button type="button" class="btn btn-outline-light me-2">Save changes</button-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/fontawesome.min.js'
import axios from 'axios'
import RatingStars from '@/components/RatingStars.vue'

export default {
  name: 'ReviewModal',
  components: {
    RatingStars
  },
  data() {
    return { text: '', rating: 5 }
  },
  props: {
    movieInfo: {
      type: Object,
      required: false
    }
  },
  methods: {
    async handleReview() {
      console.log('review submitted')
      await axios.post('http://localhost:3000/reviews', {
        imdbID: this.movieInfo.imdbID,
        text: this.text,
        rating: this.rating
      })
    }
  }
}
</script>
<style scoped>
.modal {
  --bs-modal-width: 1200px;
}

.modal-header {
  background-color: #000000;
  color: #ffffff;
}
.modal-footer {
  background-color: #000000;
  color: #ffffff;
}
.nav-link.active {
  font-weight: 700;
  color: #ffca2b !important;
}
.nav-link:hover {
  color: #ffca2b !important;
}
.btn:hover {
  color: #212529;
  background-color: #ffca2b;
  border-color: #ffca2b;
}

textarea {
  width: 100%;
  height: 250px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #000000;
  border-radius: 4px;
  resize: none;
}
textarea:focus {
  outline: none !important;
  border: 2px solid #000000;
}

.responsive {
  width: 100%;
  height: auto;
}
.btn-close {
  color: #fff;
  text-shadow: 0 1px 0 #fff;
  background-color: #ffffff;
}
.poster {
  height: auto;
  text-align: left;
  padding-top: 22px;
}

.content {
  height: auto;
  text-align: left;
  padding-left: 30px;
  padding-top: 22px;
}
.ratingbox {
  height: auto;
  text-align: left;
  padding-top: 30px;
}
/* rating: */
div.rating {
  display: inline-block;
  padding-bottom: 12px;
}
.fa,
.far,
.fas {
  color: #ffd700;
}
.reviews {
  height: auto;
  text-align: left;
  padding-top: 30px;
}
</style>
