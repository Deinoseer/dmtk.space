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
    <div class="modal" v-if="showModal">
      <div class="modal__load">
        <span>.</span><span>.</span><span>.</span>loading
      </div>
      <div class="modal__close">x</div>
    </div>
  </section>
</template>

<script>
import Grid from "~/components/Grid";
import Sun from "~/components/Sun";
import GlitchHeading from "~/components/GlitchHeading";

export default {
  data: () => ({
    showModal: false,
  }),
  components: {
    Grid,
    Sun,
    GlitchHeading,
  },
  mounted() {
    addEventListener(
      "click",
      (e) => {
        if (this.showModal) {
          const modal = ".modal";
          if (!e.target.closest(modal)) {
            const closeAnimate = this.$anime.timeline({ duration: 600 }).add({
              targets: modal,
              height: 0,
              opacity: [1, 0.6],
              easing: "easeInQuad",
            });
            closeAnimate.finished.then(() => {
              this.showModal = false;
            });
          }
        }
      },
      true
    );
  },
  watch: {
    showModal: {
      handler(val) {
        if (val === false) {
          return;
        }
        this.$nextTick(() => {
          const modal = ".modal";
          const openAnimate = this.$anime
            .timeline({ duration: 600 })
            .add({
              targets: modal,
              borderTopWidth: [0, 5],
              borderBottomWidth: [0, 5],
              height: ["10%", "90%"],
              opacity: [0.6, 1],
              easing: "easeInQuad",
            })
            .add({
              targets: modal,
              borderRightWidth: [0, 5],
              borderLeftWidth: [0, 5],
              easing: "easeInQuad",
            });
          openAnimate.finished.then(() => {
            this.$anime
              .timeline({
                loop: true,
              })
              .add({
                targets: ".modal__load span",
                opacity: [0, 1],
                easing: "steps(3)",
                delay: this.$anime.stagger(300),
              });
          });
        });
      },
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 90%;
  height: 90%;
  background: $dark-purple-color1;
  border: 1px solid $orange-color;
  box-sizing: content-box;
  &__load {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    @include font(3rem, $orange-color);
  }
}
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
  &:hover {
    @include neon($light-blue-color);
  }
}
</style>
