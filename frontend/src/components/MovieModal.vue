<template>
  <div
    class="modal fade movie-modal"
    tabindex="-1"
    aria-labelledby="exampleModalFullscreenLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header p-3 text-bg-dark">
          <h1 class="modal-title fs-4" id="exampleModalFullscreenLabel">Full screen modal</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Movie {{ movie.Title }} <br /></div>
        <div class="modal-footer p-3 text-bg-dark">
          <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieModal',
  data() {},
  props: {
    //imdbId: String // Define a prop to receive the data-imdbID value
  },
  methods: {}
}
</script>
