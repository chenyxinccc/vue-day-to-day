<template>
  <div id="app">
    <music v-if="isShow"></music>
    <router-view/>
  </div>
</template>

<script>
import Music from '@/components/music'
export default {
  name: 'App',
  components: {
    Music
  },
  computed: {
    isShow () {
      if (this.$route.name !== 'notFind') {
        return true
      }
    }
  }
}
</script>

<style>
html,body{
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
