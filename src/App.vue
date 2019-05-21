<template>
  <div id="app" class="container">
    <div id="top-nav" v-if="!$route.meta.hideTopNav">TOP NAV</div>
    <router-view id="main-view"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style src="./scss/main.scss" lang="scss"></style>

<style lang="scss" scoped>
  #app,
  #main-view {
    height: 100%;
  }
</style>
