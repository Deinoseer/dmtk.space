<template>
  <section class="container">
    <section class="heading"><glitchHeading text="dmtk.space" /></section>
    <section class="sun"><sun /></section>
    <aside class="menu">
      <div class="neon" @click="showModal = true">vue todo</div>
      <div class="neon">vue svg-kit</div>
      <div class="neon">sevensuns</div>
      <div class="neon">vue crypto</div>
    </aside>
    <section class="social">
      <!-- <a href="mailto:deinos097@gmail.com">deinos097@gmail.com</a> -->
    </section>
    <section class="grid">
      <grid />
    </section>
    <modal :show-modal="showModal" @closeModal="showModal = false" />
  </section>
</template>

<script>
import Grid from "~/components/Grid";
import Sun from "~/components/Sun";
import GlitchHeading from "~/components/GlitchHeading";
import Modal from "~/components/Modal";

export default {
  data: () => ({
    showModal: false,
  }),
  components: {
    Grid,
    Sun,
    GlitchHeading,
    Modal,
  },
};
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr 40vh repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  overflow: hidden;
}
.heading {
  grid-area: 1 / 2 / 2 / 5;
  margin-top: 30px;
}
.sun {
  grid-area: 2 / 3 / 3 / 4;
  justify-self: center;
}
.menu {
  grid-area: 2 / 2 / 3 / 3;
}
.social {
  grid-area: 2 / 4 / 3 / 5;
}
.grid {
  grid-area: 3 / 1 / 4 / 6;
  justify-self: center;
  align-self: center;
  width: 85%;
  margin: auto;
  height: 40vh;
}
.neon {
  @include font(3rem, $white-color);
  cursor: pointer;
  user-select: none;
  & + & {
    margin-top: 8px;
  }
  &:hover {
    @include neon($light-blue-color);
  }
}
</style>
