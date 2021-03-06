<template>
  <section class="container">
    <section class="heading">
      <glitchHeading text="dmtk.space" />
    </section>
    <div v-show="sunReady" class="star-field-one">
      <star-field :show-stars="showStars" />
    </div>
    <div v-show="sunReady" class="star-field-two">
      <star-field :show-stars="showStars" />
    </div>
    <section class="sun"><sun @sun-ready="afterSunIsReady" /></section>
    <div class="menu" v-show="sunReady">
      <div class="menu__title">&lt;Projects/&gt;</div>
      <neon-link
        :key="repo.id"
        :text="repo.name"
        :disabled="repo.diabled"
        :archived="repo.archived"
        :start-animation="sunReady"
        v-for="repo in gitHubRepos"
        @click.native="openModal(repo)"
      />
    </div>
    <section class="social">
      <a class="link" :href="'mailto:' + email">{{ email }}</a>
    </section>
    <section class="grid">
      <grid />
    </section>
    <modal
      v-if="showModal"
      :stop-lying="stopLying"
      :show-modal="showModal"
      :content="modalContent"
      @closeModal="closeModal"
    />
  </section>
</template>

<script>
import Grid from "~/components/Grid";
import Sun from "~/components/Sun";
import GlitchHeading from "~/components/GlitchHeading";
import Modal from "~/components/Modal";
import NeonLink from "~/components/NeonLink";
import StarField from "~/components/StarField";

export default {
  data: () => ({
    showModal: false,
    sunReady: false,
    stopLying: false,
    showStars: false,
    modalContent: {},
    gitHubRepos: [],
    modalOpenCount: 0,
    email: "deinos097@gmail.com",
  }),
  created() {
    this.$octokit.request("GET /users/Deinoseer/repos").then((response) => {
      response.data.forEach((rep) => {
        this.gitHubRepos.push({
          disabled: rep.disabled,
          archived: rep.archived,
          ssh_url: rep.ssh_url,
          svn_url: rep.svn_url,
          name: rep.name,
          homepage: rep.homepage,
        });
      });
    });
  },
  components: {
    Grid,
    Sun,
    GlitchHeading,
    Modal,
    NeonLink,
    StarField,
  },
  methods: {
    afterSunIsReady() {
      this.sunReady = true;
      this.showStars = true;
    },
    openModal($attrs) {
      this.modalContent = {
        ...$attrs,
      };
      this.showModal = true;
      this.showStars = false;
      this.modalOpenCount++;
    },
    closeModal() {
      this.modalContent = {};
      this.showModal = false;
      this.showStars = true;
    },
  },
  watch: {
    modalOpenCount: {
      handler(val) {
        val === 3 ? (this.stopLying = true) : false;
      },
    },
  },
};
</script>

<style scoped lang="scss">
.star-field-one {
  grid-area: 2/4/2/4;
}
.star-field-two {
  grid-area: 2/2/2/3;
}
.container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr 40vh;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  overflow: hidden;
  @include mw968() {
    grid-template-rows: 150px 1fr 1fr;
  }
}
.heading {
  grid-area: 1 / 1 / 1 / 6;
  margin-top: 30px;
  text-align: center;
}
.sun {
  grid-area: 2 / 3 / 2 / 4;
  justify-self: center;
  align-self: center;
}
.menu {
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  left: 10%;
  &__title {
    @include fontConsolas(0.8rem, $yellow-color);
    letter-spacing: 2px;
    text-shadow: 2px 3px 2px $red-color;
  }
}
.social {
  position: fixed;
  z-index: 999;
  bottom: 8px;
  right: 8px;
}
.grid {
  grid-area: 3 / 1 / 3 / 6;
  justify-self: center;
  align-self: end;
  width: 90%;
  height: 40vh;
  margin: 0 auto;
  @include mw1280() {
    width: 100%;
  }
}
</style>
