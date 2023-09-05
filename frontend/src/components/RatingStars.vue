<template>
  <div class="rating">
    <template v-for="star in computedRating">
      <i :class="star.icon"></i>
    </template>

    <span v-if="showRating">&nbsp; {{ rating }} of 10</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      //type: Number,
      required: true
    },
    showRating: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    computedRating() {
      const rating = parseFloat(this.value) / 2

      if (isNaN(rating) || rating < 0) {
        return []
      }

      const stars = Math.floor(rating)
      const halfStar = rating - stars >= 0.01

      return Array.from({ length: 5 }, (_, index) => ({
        icon:
          index < stars
            ? 'fas fa-star'
            : halfStar && index === stars
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
      }))
    },

    rating() {
      return parseFloat(this.value).toFixed(1)
    }
  }
}
</script>

<style scoped>
.fa,
.far,
.fas {
  color: #ffd700;
}
</style>
