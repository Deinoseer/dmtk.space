<template>
  <div class="heading" :class="{ glitch: glitch }">{{ text }}</div>
</template>

<script>
export default {
  data: () => ({
    glitch: false,
  }),
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  mounted() {
    setInterval(() => {
      this.glitch = true;
      setTimeout(() => {
        this.glitch = false;
      }, 400);
    }, Math.floor(Math.random() * 10000));
  },
};
</script>

<style lang="scss" scoped>
.heading {
  @include font(10rem, $white-color, 700);
  line-height: 1;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  user-select: none;
}
</style>
