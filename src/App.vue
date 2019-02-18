<template>
  <div id="app">
    <Music></Music>
    <router-view/>
  </div>
</template>

<script>
import Music from '@/components/Music'
export default {
  name: 'App',
  components: {
    Music
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
