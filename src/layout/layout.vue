<template>
  <div class="layout">
    <div class="layout-left-nav">
      <layout-menu></layout-menu>
    </div>
    <div class="layout-right-view">
      <layout-nav></layout-nav>
      <router-view class="layout-view-content" v-loading="loading"></router-view>
    </div>
  </div>
</template>

<script>
import layoutMenu from './components/layoutMenu.vue'
import layoutNav from './components/layoutNav.vue'
import {mapState} from 'vuex'

export default {
  name: 'layout',
  data () {
    return {
      isCollapse: false,
      routeData: []
    }
  },
  computed: {
    ...mapState({
      loading: 'loading/loading'
    })
  },
  components: {
    layoutMenu,
    layoutNav
  }
}

</script>
<style lang="less" scoped>
.layout {
  height: 100%;

  .layout-left-nav {
    width: 180px;
    height: 100%;
    float: left;
    overflow: scroll;
  }

  .layout-right-view {
    width: calc(100% - 180px);
    height: 100%;
    position: absolute;
    left: 180px;
    .layout-view-content {
      height: 100%;
      min-height: 600px;
      min-width: 800px;
      padding: 10px 0 10px 10px;
      overflow: scroll;
    }
  }
}

</style>
