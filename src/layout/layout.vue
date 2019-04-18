<template>
  <div class="layout" :class="{'layout-shrink': isShrink}">
    <div class="layout-left-nav">
      <layout-menu :isShrink="isShrink" @setShrink="setShrink"/>
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
      isShrink: false,
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
  },
  methods: {
    setShrink () {
      this.isShrink = !this.isShrink
      // 补充提交resize事件, 防止echarts图标大小未更新
      this.$nextTick(() => {
        window.onresize && window.onresize()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.layout {
  height: 100%;

  .layout-left-nav {
    width: 180px;
    height: 100%;
    position: absolute;
    z-index: 99;
    transition: width .4s;
  }

  .layout-right-view {
    width: 100%;
    height: 100%;
    position: absolute;
    padding-left: 180px;
    transition: left .4s;
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
    }

    /deep/ .layout-view-content {
      height: 100%;
      width: 100%;
      min-width: 800px;
      padding: 10px 0 10px 10px;
    }
  }

}
.layout-shrink {
  .layout-left-nav {
    width: 64px;
  }
  .layout-right-view {
    padding-left: 64px;
  }
}
</style>
