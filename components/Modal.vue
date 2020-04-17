<template>
  <div class="modal" v-if="showModal">
    <div class="modal__load" v-if="!contentLoaded">
      <span>.</span><span>.</span><span>.</span>loading
    </div>
    <div class="modal__close">close</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    contentLoaded: false,
  }),
  props: {
    showModal: Boolean,
  },
  mounted() {
    addEventListener(
      "click",
      (e) => {
        if (this.showModal) {
          const modal = ".modal";
          if (
            !e.target.closest(modal) ||
            e.target.classList.contains("modal__close")
          ) {
            const closeAnimate = this.$anime.timeline({ duration: 600 }).add({
              targets: modal,
              height: 0,
              opacity: [1, 0.6],
              easing: "easeInQuad",
            });
            closeAnimate.finished.then(() => {
              this.$emit("closeModal");
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
              borderTopWidth: [0, 4],
              borderBottomWidth: [0, 4],
              height: ["5%", "90%"],
              opacity: [0.7, 1],
              easing: "easeInCubic",
            })
            .add({
              targets: modal,
              borderRightWidth: [0, 4],
              borderLeftWidth: [0, 4],
              easing: "easeInCubic",
            })
            .add({
              targets: [".modal__load", ".modal__close"],
              opacity: [0, 1],
              easing: "linear",
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

<style lang="scss" scoped>
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
    user-select: none;
  }
  &__close {
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    @include font(1.3rem, $orange-color);
    padding-left: 10px;
    text-align: center;
    cursor: pointer;
    transition: $transition-time ease color;
    &:hover {
      color: $white-color;
    }
  }
}
</style>
