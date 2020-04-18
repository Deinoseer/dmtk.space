<template>
  <div class="modal" v-if="showModal">
    <div class="modal__load" v-if="!contentLoaded">
      <span>.</span><span>.</span><span>.</span>loading
    </div>
    <div v-else class="modal__content">
      <div class="modal__title">{{ content.name }}</div>
      <div class="modal__row">
        <div class="modal__column">
          <div class="modal__github">git clone {{ content.ssh_url }}</div>
          <div class="modal__github-link">
            <a target="_blank" :href="content.svn_url">{{ content.svn_url }}</a>
          </div>
          <div class="modal__homepage" v-if="content.homepage">
            <a target="_blank" :href="content.homepage">{{
              content.homepage
            }}</a>
          </div>
          <div class="modal__readme" v-html="readmeText"></div>
        </div>
        <div class="modal__column">
          <div class="modal__image">
            <img :src="image" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="modal__close">close</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    contentLoaded: false,
    modalClass: ".modal",
    image: "",
    readmeText: "",
  }),
  props: {
    showModal: Boolean,
    content: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.getReadme();
    this.getImage();
    this.startOpenAnimation();
    addEventListener(
      "click",
      (e) => {
        if (this.showModal) {
          if (
            !e.target.closest(this.modalClass) ||
            e.target.classList.contains("modal__close")
          ) {
            this.startCloseAnimation();
          }
        }
      },
      true
    );
  },
  methods: {
    getReadme() {
      this.$octokit
        .request(`GET /repos/Deinoseer/${this.content.name}/contents/README.md`)
        .then((response) => {
          this.readmeText = decodeURIComponent(
            escape(atob(response.data.content))
          );
        });
    },
    getImage() {
      this.$octokit
        .request(`GET /repos/Deinoseer/${this.content.name}/contents/demo.png`)
        .then((response) => {
          this.image = response.data.download_url;
        })
        .catch(() => {});
    },
    startOpenAnimation() {
      const openAnimate = this.$anime
        .timeline({ duration: 600 })
        .add({
          targets: this.modalClass,
          borderTopWidth: [0, 4],
          borderBottomWidth: [0, 4],
          height: ["5%", "90%"],
          opacity: [0.7, 1],
          easing: "easeInCubic",
        })
        .add({
          targets: this.modalClass,
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
        setTimeout(() => {
          this.contentLoaded = true;
        }, 3000);
      });
    },
    startCloseAnimation() {
      const closeAnimate = this.$anime.timeline({ duration: 600 }).add({
        targets: this.modalClass,
        height: 0,
        opacity: [1, 0.6],
        easing: "easeInQuad",
      });
      closeAnimate.finished.then(() => {
        this.contentLoaded = false;
        this.$emit("closeModal");
      });
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
  overflow: auto;
  &__load {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    @include font(3rem, $orange-color);
    user-select: none;
  }
  &__content {
    //@include font(2rem, $white-color);
    color: $white-color;
  }
  &__row {
    display: flex;
  }
  &__column {
    flex: 0 1 50%;
  }
  &__readme {
    white-space: pre;
  }
  &__title {
    text-align: center;
    margin-top: 50px;
    @include font(4rem, $yellow-color);
    text-shadow: 2px 3px 2px $red-color;
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
