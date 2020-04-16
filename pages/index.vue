<template>
  <section class="container">
    <glitchHeading text="dmtk.space" />
    <sun />
    <div class="content">
      <div class="neon">vue multi</div>
      <div class="neon">vue link</div>
      <div class="neon">ane next</div>
      <div class="neon">xup multi</div>
    </div>
    <grid />
  </section>
</template>

<script>
//import AppLogo from "~/components/AppLogo.vue";
import Grid from "~/components/Grid";
import Sun from "~/components/Sun";
import GlitchHeading from "~/components/GlitchHeading";

export default {
  data: () => ({
    glitch: false,
  }),
  components: {
    Grid,
    Sun,
    GlitchHeading,
    // AppLogo,
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
}
.content {
  position: absolute;
  left: 20%;
  top: 35%;
}
.neon {
  @include font(3rem, $white-color);
  cursor: pointer;
  &:hover {
    @include neon($light-blue-color);
  }
}
</style>
