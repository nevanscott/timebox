<template>
  <component :is="type" class="timer">
    <Button @click="toggle">Play</Button>
    <time :datetime="remainingDurationFormat">
      {{ remaining }}
    </time>
  </component>
</template>

<script>
/**
 * An interactive timer.
 */
export default {
  name: "Timer",
  status: "prototype",
  release: "1.0.0",
  data: function() {
    return {
      duration: 12,
      elapsed: 0,
    }
  },
  props: {
    /**
     * The html element name used for the timer.
     */
    type: {
      type: String,
      default: "article",
    },
  },
  computed: {
    remaining: function() {
      return this.duration - this.elapsed
    },
  },
  methods: {
    toggle: function() {
      if (this.t) {
        window.clearInterval(this.t)
        this.t = false
      } else {
        if (this.elapsed == this.duration) {
          this.elapsed = 0
        }
        this.t = window.setInterval(() => {
          this.elapsed++
          if (this.elapsed == this.duration) {
            window.clearInterval(this.t)
            this.t = false
          }
        }, 1000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.timer {
  background: $color-white;
  border: solid 2px $color-silver;
  padding: $space-s;
  color: $color-rich-black;
  font-family: $font-text;
  font-weight: $weight-normal;
  font-size: $size-m;
  line-height: $line-height-m;
  time {
    font-size: $size-xl;
  }
}
</style>

<docs>
  ```jsx
  <Timer />
  ```
</docs>
