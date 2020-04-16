<template>
  <div class="test">
    <nuxt-link to="/">
      home
    </nuxt-link>
    <div class="test" :data="test" :temp="test" @click="method" :why="test">
      {{ test }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    test: "data",
  }),
  methods: {
    method() {
      this.test = this.test === "data" ? "lol" : "data";
    },
  },
};
</script>

<style lang="scss">
.test {
  background: rgb(153, 37, 199);
}
</style>
