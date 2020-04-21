<template>
  <div class="sun" :class="{ sun_fade: loaded }">
    <div v-for="i in 10" :key="i" class="sun__part"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loaded: false,
  }),
  mounted() {
    const sunEl = ".sun";
    const sunAnimate = this.$anime
      .timeline({
        duration: 4000,
      })
      .add({
        targets: sunEl,
        translateY: [500, 0],
        opacity: [0, 1],
        easing: "linear",
      });
    sunAnimate.finished.then(() => {
      this.loaded = true;
      this.$emit("sun-ready", true);
      this.$anime
        .timeline({
          loop: true,
          direction: "alternate",
          duration: 2000,
        })
        .add({
          targets: ".sun .sun__part",
          scale: 2,
          easing: "easeInOutCirc",
          delay: this.$anime.stagger(100),
        });
    });
  },
};
</script>

<style lang="scss" scoped>
.sun {
  position: relative;
  z-index: -1;
  display: block;
  width: 300px;
  height: 300px;
  background: transparent;
  border-radius: 50%;
  overflow: hidden;
  @include mw1280() {
    width: 280px;
    height: 280px;
  }
  @include mw968() {
    width: 250px;
    height: 250px;
  }
  &_fade {
    animation: fade 3s linear alternate infinite;
    @include keyframes(fade) {
      to {
        box-shadow: 0 0 30px 10px #fff, 0 0 50px 30px $orange-color,
          0 0 70px 60px $purple-color;
      }
    }
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(255, 239, 20, 0.8),
      rgba(255, 0, 128, 0.8)
    );
  }
  &__part {
    background: $yellow-color;
    height: 5%;
    & + & {
      margin-top: 4px;
    }
    &:nth-child(1) {
      height: 45%;
    }
    &:nth-child(2) {
      margin-top: 3px;
    }
    &:nth-child(n + 6) {
      margin-top: 6px;
    }
  }
}
</style>
