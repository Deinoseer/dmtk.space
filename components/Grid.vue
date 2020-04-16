<template>
  <div class="grid">
    <div v-for="i in 200" :key="i" class="grid__square"></div>
  </div>
</template>

<script>
export default {};
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
  width: 80%;
  height: 40vh;
  margin-top: auto;
  transform: perspective(150px) rotateX(20deg);
  z-index: 0;
  background: linear-gradient($black-color, $dark-purple-color 70%);
  animation: move 1.5s linear alternate infinite;
  @include keyframes(move) {
    to {
      transform: perspective(150px) rotateX(20deg) translateY(50px);
    }
  }
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 10px;
    background: $black-color;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &__square {
    width: 10%;
    height: 50px;
    border: 1px solid;
    border-image-slice: 1;
    border-width: 1px;
    border-image-source: linear-gradient(
      to top,
      $purple-color,
      $hot-pink-color
    );
    transition: 0.5s ease box-shadow;
    &:hover {
      box-shadow: inset 0px 0px 20px 0px $hot-pink-color;
    }
  }
}
</style>
