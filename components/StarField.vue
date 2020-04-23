<template>
  <div ref="field" class="star-field"></div>
</template>

<script>
export default {
  props: {
    showStars: Boolean,
  },
  data: () => ({
    starsIntrval: 0,
  }),
  methods: {
    drawTheStars() {
      this.starsIntrval = setInterval(() => {
        this.createStar();
      }, 200);
    },
    createStar() {
      const place = this.$refs["field"].getBoundingClientRect();
      const star = document.createElement("div");
      star.className = `star stare_${Math.floor(Math.random() * 100)}`;
      star.style.left = Math.floor(Math.random() * place.width) + "px";
      star.style.top = Math.floor(Math.random() * place.height) + "px";
      this.$refs["field"].append(star);
      const animate = this.$anime
        .timeline({ duration: 1600, direction: "alternate" })
        .add({
          targets: `.${star.classList[1]}`,
          scale: [0, Math.floor(Math.random() * 5)],
          easing: "easeInOutQuart",
        });
      animate.finished.then(() => {
        star.remove();
      });
    },
  },
  watch: {
    showStars: {
      handler(val) {
        !val ? clearInterval(this.starsIntrval) : this.drawTheStars();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .star {
  position: absolute;
  z-index: -1;
  background: $light-blue-color;
  box-shadow: 0px 0px 15px 5px $light-blue-color, 0px 0px 5px 3px $pink-color;
  border-radius: 50%;
  width: 0.5px;
  height: 0.5px;
}
.star-field {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
