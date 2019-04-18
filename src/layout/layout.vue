<template>
  <div class="layout">
    <div class="layout-left-nav">
      <layout-menu></layout-menu>
    </div>
    <div class="layout-right-view">
      <layout-nav></layout-nav>
      <el-scrollbar wrap-class="layout-scrollbar" ref="scroll">
        <router-view class="layout-view-content" v-loading="loading"></router-view>
      </el-scrollbar>
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
  }

  .layout-right-view {
    width: calc(100% - 180px);
    height: 100%;
    position: absolute;
    left: 180px;
    overflow: hidden;

    /deep/ .el-scrollbar{
      height: 100%;
      .el-scrollbar__view{
        height: 100%;
      }
    }
    /deep/ .el-scrollbar__wrap {
      overflow: visible;
      overflow-x: hidden;
      margin: 0 !important;
    }

    /deep/ .layout-view-content {
      height: 100%;
      width: 100%;
      min-width: 800px;
      padding: 10px 0 10px 10px;
    }
  }
}

</style>
