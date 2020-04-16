<template>
  <div class="sun">
    <div v-for="i in 10" :key="i" class="sun__part"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sun {
  position: absolute;
  z-index: -1;
  top: 30%;
  display: block;
  width: 300px;
  height: 300px;
  background: transparent;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 0px 15px 5px $hot-pink-color;
  &:before {
    content: "";
    display: block;
    position: absolute;
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
