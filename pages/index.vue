<template>
  <section class="container">
    <section class="heading"><glitchHeading text="dmtk.space" /></section>
    <section class="sun"><sun /></section>
    <div class="menu">
      <div class="menu__title">&lt;Projects/&gt;</div>
      <div
        class="neon"
        :key="repo.id"
        v-for="repo in gitHubRepos"
        @click="openModal(repo)"
      >
        <span v-if="!repo.disabled && !repo.archived">{{ repo.name }}</span>
      </div>
    </div>
    <section class="social">
      <a class="link" href="mailto:deinos097@gmail.com">deinos097@gmail.com</a>
    </section>
    <section class="grid">
      <grid />
    </section>
    <modal
      v-if="showModal"
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

export default {
  data: () => ({
    showModal: false,
    modalContent: {},
    gitHubRepos: [],
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
  },
  methods: {
    openModal($attrs) {
      this.modalContent = {
        ...$attrs,
      };
      this.showModal = true;
    },
    closeModal() {
      this.modalContent = {};
      this.showModal = false;
    },
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
  text-align: center;
}
.sun {
  grid-area: 2 / 3 / 3 / 4;
  justify-self: center;
}
.menu {
  position: relative;
  grid-area: 2 / 1 / 3 / 3;
  justify-self: flex-end;
  align-self: center;
  &__title {
    @include fontConsolas(0.8rem, $yellow-color);
    letter-spacing: 2px;
    text-shadow: 2px 3px 2px $red-color;
  }
}
.social {
  position: absolute;
  z-index: 999;
  bottom: 8px;
  right: 8px;
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
  @include font(2.5rem, $white-color);
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
