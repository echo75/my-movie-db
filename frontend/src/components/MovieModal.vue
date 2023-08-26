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
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMTM2NDkxMjQxMV5BMl5BanBnXkFtZTYwNTMxMDM4._V1_SX300.jpg"
                  alt="poster"
                  class="img-fluid responsive"
                />
              </div>
              <div class="col content">
                <div class="plott">
                  <h2>The Golden Compass</h2>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum hic nihil illum!
                  Dolorum repellendus, id iusto sunt minima ut rerum quis omnis aut laudantium autem
                  odit possimus quaerat animi molestiae. Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Dolorum hic nihil illum! Dolorum repellendus, id iusto sunt
                  minima ut rerum quis omnis aut laudantium autem odit possimus quaerat animi
                  molestiae. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum hic
                  nihil illum! Dolorum repellendus, id iusto sunt minima ut rerum quis omnis aut
                  laudantium autem odit possimus quaerat animi molestiae. Lorem ipsum, dolor sit
                  amet consectetur adipisicing elit. Dolorum hic nihil illum! Dolorum repellendus,
                  id iusto sunt minima ut rerum quis omnis aut laudantium autem odit possimus
                  quaerat animi molestiae. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Dolorum hic nihil illum! Dolorum repellendus, id iusto sunt minima ut rerum quis
                  omnis aut laudantium autem odit possimus quaerat animi molestiae.
                </div>
                <div class="ratingbox">
                  <h4>
                    Rating:
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fa fa-star-half-o"></i>
                    <i class="fa fa-star-o"></i>
                  </h4>
                </div>
                <div class="reviews">
                  <h4>Reviews:</h4>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum hic nihil illum!
                  Dolorum repellendus, id iusto sunt minima ut rerum quis omnis aut laudantium autem
                  odit possimus quaerat animi molestiae. Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Dolorum hic nihil illum! Dolorum repellendus, id iusto sunt
                  minima ut rerum quis omnis aut laudantium autem odit possimus quaerat animi
                  molestiae. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum hic
                  nihil illum! Dolorum repellendus, id iusto sunt minima ut rerum quis omnis aut
                  laudantium autem odit possimus quaerat animi molestiae. Lorem ipsum, dolor sit
                  amet consectetur adipisicing elit. Dolorum hic nihil illum! Dolorum repellendus,
                  id iusto sunt minima ut rerum quis omnis aut laudantium autem odit possimus
                  quaerat animi molestiae. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Dolorum hic nihil illum! Dolorum repellendus, id iusto sunt minima ut rerum quis
                  omnis aut laudantium autem odit possimus quaerat animi molestiae.
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
export default {
  name: 'MovieModal',
  data() {},
  props: {
    //imdbId: String // Define a prop to receive the data-imdbID value
  },
  methods: {}
}
</script>
<style scoped>
@import '@/assets/font-awesome.min.css';
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
.fas {
  color: #ffd700;
}
.reviews {
  height: auto;
  text-align: left;
  padding-top: 30px;
}
</style>
