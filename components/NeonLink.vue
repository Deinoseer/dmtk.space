<template>
  <div class="neon">
    <span v-if="!disabled && !archived">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    disabled: Boolean,
    archived: Boolean,
    startAnimation: Boolean,
  },
  methods: {
    setMenuAnimation() {
      this.$nextTick(() => {
        this.$anime.timeline().add({
          targets: ".neon",
          scale: [0, 1],
          opacity: [0, 1],
          translateX: [-999, 0],
          easing: "easeOutQuad",
          delay: this.$anime.stagger(600),
        });
      });
    },
  },
  watch: {
    startAnimation: {
      handler(val) {
        if (val === true) {
          this.setMenuAnimation();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.neon {
  @include font(2.5rem, $white-color);
  cursor: pointer;
  user-select: none;
  @include mw480() {
    font-size: 2rem;
  }
  & + & {
    margin-top: 8px;
  }
  &:hover {
    @include neon($light-blue-color);
  }
}
</style>
