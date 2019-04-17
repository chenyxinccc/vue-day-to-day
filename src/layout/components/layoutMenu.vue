<template>
<!--   <div id="app">
    <h2>list:</h2>
    <el-scrollbar wrap-class="list" wrap-style="color: red;" view-style="font-weight: bold;" view-class="view-box" :native="false">
      <div v-for="value in num" :key="vlaue">
        {{value}}
      </div>
    </el-scrollbar>
  </div> -->
    <el-menu class="el-menu-vertical" :default-active="$route.name" @open="handleOpen" @close="handleClose"
      @select="selectNav" :collapse="isCollapse" :background-color="theme" text-color="#fff" active-text-color="#409dff">
      <el-scrollbar wrap-class="layout-menu-scrollbar" ref="scroll">
        <!-- <div style="width:200px;height:1000px;background: red;">1231</div> -->
        <template v-for="(item, i) in routeData">
          <el-submenu v-if="item.children" :index="item.path" :key="i">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-submenu :index="item.path">
              <span slot="title">{{item.name}}</span>
              <el-menu-item v-for="(child, i) in item" :index="child.path" :key="i">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item :key="i" :index="item.path" v-else>
            <i class="el-icon-menu"></i>
            <span slot="title">
                {{item.name}}
            </span>
          </el-menu-item>
        </template>
      </el-scrollbar>
    </el-menu>
</template>

<script>
import routeData from '@/assets/routeData/data.js'

export default {
  name: 'layoutMenu',
  data () {
    return {
      isCollapse: false,
      routeData: [],
      num: 30
    }
  },
  mounted () {
    this.routeData = routeData
  },
  computed: {
    theme () {
      return this.$store.state.setting.theme || '#304155'
    }
  },
  methods: {
    selectNav (index, path) {
      this.$router.push(path[0])
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}

</script>
<style lang="less" scoped>
// #app {
//   height: 300px;
//   overflow: hidden;
// }
// 展示列表的区域，超过200px出现滚动条
// .list {
//   max-height: 200px;
// }

.el-menu-vertical {
  height: 100%;
  overflow: hidden;
  /deep/ .el-menu-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  /deep/ .el-submenu__title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .el-scrollbar{
    height: 100%;
  }
  /deep/ .layout-menu-scrollbar{
    overflow-x: hidden;
  }

}

</style>
