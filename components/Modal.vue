<template>
  <div class="modal" v-if="showModal">
    <div class="modal__load" v-if="!contentLoaded">
      <span>.</span><span>.</span><span>.</span>loading
    </div>
    <div v-else class="modal__content">
      <div class="modal__title">{{ content.name }}</div>
      <div class="modal__row">
        <div class="modal__column">
          <div class="modal__readme marked" v-html="previewText"></div>
        </div>
        <div class="modal__column">
          <div
            class="modal__github"
            :class="{ modal__github_copied: copied }"
            @click="copyClick"
            ref="cloneLink"
          >
            git clone {{ content.ssh_url }}
          </div>
          <div class="modal__github-link">
            <h3>Repo:</h3>
            <a class="link" target="_blank" :href="content.svn_url">{{
              content.svn_url
            }}</a>
          </div>
          <div class="modal__image">
            <img :src="image" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="modal__close" @click="closeModal">close</div>
  </div>
</template>

<script>
const marked = require("marked");

export default {
  data: () => ({
    contentLoaded: false,
    modalClass: ".modal",
    image: "",
    readmeText: "",
    copied: false,
  }),
  props: {
    stopLying: Boolean,
    showModal: Boolean,
    content: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.startOpenAnimation();
    Promise.all([this.getReadme(), this.getImage()]).then(() => {
      if (!this.stopLying) {
        setTimeout(() => {
          this.contentLoaded = true;
        }, 3000);
      } else {
        this.contentLoaded = true;
      }
    });
    addEventListener(
      "click",
      (e) => {
        if (this.showModal) {
          if (!e.target.closest(this.modalClass)) {
            this.startCloseAnimation();
          }
        }
      },
      true
    );
  },
  computed: {
    previewText() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
      });
      return marked(this.readmeText);
    },
  },
  methods: {
    copyClick() {
      this.copied = true;
      window.getSelection().selectAllChildren(this.$refs.cloneLink);
      document.execCommand("copy");
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    },
    getReadme() {
      return this.$octokit
        .request(`GET /repos/Deinoseer/${this.content.name}/contents/README.md`)
        .then((response) => {
          this.readmeText = decodeURIComponent(
            escape(atob(response.data.content))
          );
        });
    },
    getImage() {
      return this.$octokit
        .request(`GET /repos/Deinoseer/${this.content.name}/contents/demo.jpg`)
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
        this.$emit("closeModal");
      });
    },
    closeModal() {
      this.startCloseAnimation();
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
  overflow: hidden;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px $yellow-color;
    border-radius: 0;
  }
  ::selection {
    color: $dark-purple-color;
    background: $yellow-color;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient($yellow-color, $orange-color);
    width: 6px;
    transition: $transition-time ease all;
    &:hover {
      background: $orange-color;
    }
  }
  &__load {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    @include font(3rem, $orange-color);
    user-select: none;
    @include mw968() {
      font-size: 2rem;
    }
  }
  &__content {
    @include fontConsolas(1.1rem, $white-color);
    color: $white-color;
    height: 100%;
    overflow-y: auto;
    padding-right: 6px;
    margin-right: 4px;
  }
  &__row {
    display: flex;
    @include mw968() {
      flex-direction: column-reverse;
    }
  }
  &__column {
    flex: 0 1 50%;
    padding: 3rem 0;
    @include mw968() {
      flex: 1;
      padding: 2rem;
    }
    &:nth-child(1) {
      padding-left: 3rem;
      padding-right: 3rem;
      @include mw968() {
        padding: 0 2rem 2rem;
      }
    }
  }
  &__readme {
    line-height: 1.6rem;
  }
  &__image {
    img {
      max-width: 100%;
    }
  }
  &__github {
    position: relative;
    display: inline-flex;
    font-size: 1rem;
    line-height: 1rem;
    word-break: break-all;
    word-wrap: break-word;
    background-color: transparent;
    border: 1px solid $yellow-color;
    transform: skewX(-20deg);
    padding: 8px 15px;
    margin: 0 10px 10px;
    &-link {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      a {
        margin-left: 12px;
      }
    }
    &_copied {
      &:before {
        content: "copied";
        position: absolute;
        font-size: 12px;
        right: -49px;
        top: 50%;
        display: block;
        background: $hot-pink-color;
        padding: 3px 6px;
        transform: translateY(-50%);
      }
    }
  }
  &__title {
    text-align: center;
    margin-top: 50px;
    @include font(4rem, $yellow-color);
    text-shadow: 2px 3px 2px $red-color;
    @include mw968() {
      font-size: 2.5rem;
    }
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
