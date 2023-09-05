<template>
  <div
    class="modal fade movie-modal"
    id="exampleModalFullscreen"
    tabindex="-1"
    aria-labelledby="exampleModalFullscreenLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header p-3 text-bg-dark">
          <h1 class="modal-title fs-4" id="exampleModalFullscreenLabel">Movie Details</h1>
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
                  <p>{{ movieInfo?.Plot }}</p>
                </div>

                <div class="ratingbox">
                  <div class="rating" v-if="movieInfo.imdbRating === 'N/A'">
                    <h4>&nbsp;&nbsp; (no rating)</h4>
                  </div>
                  <div class="rating" v-else>
                    <h4>
                      Rating: &nbsp;
                      <rating-stars :value="movieInfo.imdbRating"></rating-stars>
                    </h4>
                  </div>
                </div>

                <div>
                  <h4>Actors:</h4>
                  <p>{{ movieInfo?.Actors }}</p>
                </div>
                <div>
                  <h4>Director:</h4>
                  <p>{{ movieInfo?.Director }}</p>
                </div>
                <div>
                  <h4>Genre:</h4>
                  <p>{{ movieInfo?.Genre }}</p>
                </div>
                <div>
                  <h4>Released:</h4>
                  <p>{{ movieInfo?.Released }}</p>
                </div>
                <div>
                  <h4>Runtime:</h4>
                  <p>{{ movieInfo?.Runtime }}</p>
                </div>
                <div class="reviews">
                  <h4>Reviews:</h4>
                  <div v-if="movieReview.length === 0">
                    <p>No reviews yet</p>
                  </div>
                  <div v-else>
                    <div v-for="review in movieReview" :key="review._id">
                      <h5>{{ review.author.firstName }} {{ review.author.surName }}</h5>
                      <p>{{ review.text }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer p-3 text-bg-dark">
          <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/fontawesome.min.js'
import RatingStars from '@/components/RatingStars.vue'
export default {
  name: 'MovieModal',
  components: {
    RatingStars
  },
  data() {
    return {}
  },
  props: {
    movieInfo: {
      type: Object,
      required: false
    },
    movieReview: {
      type: Array,
      required: false
    }
  },
  methods: {}
}
</script>
<style scoped>
div.rating {
  display: inline-block;
  padding-bottom: 12px;
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
