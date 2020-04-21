<template>
  <div class="grid">
    <div v-for="i in 100" :key="i" class="grid__square"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const gridEl = ".grid .grid__square";
    this.$anime
      .timeline()
      .add({
        targets: gridEl,
        opacity: 1,
        easing: "linear",
        delay: this.$anime.stagger(30),
      })
      .finished.then(() => {
        this.$anime
          .timeline({
            loop: true,
            direction: "alternate",
          })
          .add({
            targets: gridEl,
            boxShadow: [
              {
                value: [
                  "inset 0px 0px 3px 1px #fff, inset 0px 0px 10px 5px #7700a6",
                ],
              },
            ],
            easing: "linear",
            delay: this.$anime.stagger(600, { grid: [10, 10], from: "center" }),
          });
      });
  },
};
</script>

<style lang="scss" scoped>
.grid {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: stretch;
  flex-direction: column;
  overflow: hidden;
  transform: perspective(150px) rotateX(20deg);
  z-index: 0;
  background: linear-gradient($dark-purple-color1, $dark-purple-color 70%);
  @include mw968() {
    transform: perspective(80px) rotateX(20deg);
  }
  @include mw480() {
    transform: perspective(45px) rotateX(15deg);
  }
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 10px;
    background: $dark-purple-color1;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &__square {
    width: 10%;
    height: 50px;
    border: 1px solid;
    border-width: 1px;
    opacity: 0;
    border-image: linear-gradient(to top, $purple-color, $hot-pink-color) 1
      stretch;
    transition: $transition-time ease box-shadow;
    @include mw968() {
      height: 30px;
    }
    @include mw480() {
      width: 20%;
      height: 32px;
    }
  }
}
</style>
