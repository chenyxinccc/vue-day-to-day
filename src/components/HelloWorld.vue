<template>
  <div class="demo">
    <div class="box-a background" v-if="contextMenuData.isShow" :style="{ top: contextMenuData.axios.y + 'px', left: contextMenuData.axios.x + 'px' }" @contextmenu="(event) =>{event.preventDefault()}">
      <el-row class="tac">
        <el-col :span="12">
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">菜单</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">菜单</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="qunne-box"> -->
    <!-- qunne容器 -->
    <!--     <div data-options="region:'center'" id="canvas" class="qunne-demo">
      </div> -->
    <!-- 详情菜单 -->
    <!--       <el-card class="box-card" :style="{ top: infoLocation.viewY + 'px', left: infoLocation.viewX + 'px' }" v-if="infoLocation.showBox">
        <div slot="header" class="clearfix">
          <span>{{infoLocation.infoObj.name}}</span>
        </div>
        <div class="text item">
          {{infoLocation.infoObj.name}}
        </div>
      </el-card> -->
    <!-- 缩略图 -->
    <!--       <qunee-window
        :ref="QuneeWindowOverviewProp.ref"
        :visible.sync="QuneeWindowOverviewProp.visible"
        :title="'缩略图'"
        :placement="'right'">
        <div
          id="qunee-window-overview"
          style="height: 100%;">
        </div>
      </qunee-window> -->
    <!--       <div class='searchBtn' v-if='!QuneeWindowOverviewProp.visible' @click="QuneeWindowOverviewProp.visible = true">
        <i class="el-icon-search"></i>
      </div> -->
    <!-- </div> -->
    <div class="btn-fullscreen" @click="handleFullScreen">
        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" :title="fullscreen?`取消全屏`:`全屏`"  placement="bottom">
            <i class="el-icon-rank"></i>
        </el-tooltip>
    </div>
    <el-button @click="test">default</el-button>
    <el-button @click="addMessage('add')">default</el-button>
    <el-button @click="addMessage('success')" type="success">success</el-button>
    <el-button @click="addMessage('warning')" type="warning">warning</el-button>
    <el-button @click="addMessage('error')" type="danger">error</el-button>
    <el-button @click="closeMessage" type="primary">closeAll</el-button>
    <el-button @click="$router.push('/echarts')">echarts</el-button>
    <el-button @click="renderTest" type="primary">render</el-button>
    <div id="renderBox">
    </div>
    <el-button @click="$router.push({name: 'childfirst'})">childfirst</el-button>
    <el-button @click="$router.push('/HelloWorld/childlast')">childlast</el-button>
    <div class="view-box">
      <keep-alive>
        <router-view>
        </router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import $ from 'jquery'
import Q from '@/assets/quennDemo/Q'
import QuneeOverview from '@/assets/quennDemo/QuneeOverview';
import QuneeWindow from '@/assets/quennDemo/qunee-window.vue';
import stringify from 'json-stable-stringify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
// import hljsa from './hljs'
import Vue from 'vue';
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      fullscreen: false,
      number: 1,
      // 已渲染节点
      nodesObj: {},
      // 当前qunne实例
      graph: '',
      // 详细文本框
      infoLocation: {
        infoObj: {},
        showBox: false,
        viewX: 0,
        viewY: 0
      },
      // 右键菜单
      contextMenuData: {
        menuName: 'demo',
        isShow: false,
        axios: {
          x: null,
          y: null
        }
      },
      // 预览图实例
      QuneeWindowOverviewProp: {
        ref: 'qunee-window-overview',
        visible: true,
        overview: null
      },
      // 是否开启右键菜单
      isContextmenu: false,
      map: {},
      // 当前遍历的节点
      node: {}
    }
  },
  props: {},
  created() {},
  mounted() {},
  computed: {
    ...mapState(['count'])
  },
  components: {
    QuneeWindow
  },
  methods: {
    ...mapActions(['add', 'del']),
    test() {
      this.$http.get('/goods/list').then((data)=>{
        console.log(data)
      })
    },
    renderTest() {
      const vm = this;
      // component产生组件
      const button = Vue.component('ele', {
        render: function(createElement) {
          return createElement('el-button', {
            'class': {
              show: this.show
            },
            attrs: {
              id: 'elem',
              type: 'warning'
            },
            on: {
              click: this.handleClick
            }
          }, '警告提示');
        },
        data: function() {
          return {
            show: false
          }
        },
        methods: {
          handleClick: () => {
            this.addMessage();
          }
        }
      });
      /* mount会替换目标容器  */
      // new button().$mount('#renderBox')
      document.getElementById('renderBox').appendChild(new button().$mount().$el)


      // extend产生组件
      // const renderModel = Vue.extend({
      //   template: `<el-button type="primary" @click="closeMessage">{{title}}{{renderIndex}}!</el-button>`,
      //   data: function () {
      //     return {
      //       title: '文字信息',
      //       renderIndex: 1
      //     }
      //   },
      //   methods: {
      //     closeMessage: this.closeMessage
      //   }
      // })
      // document.getElementById('renderBox').appendChild(new renderModel().$mount().$el)
    },
    addMessage(type = 'warning') {
      this.$msg[type] && this.$msg[type]({
        message: `i'm: ${type}`, //显示文字内容
        handelCLose: false, //显示关闭按钮
        time: 0, //自动关闭时间 为0则不关闭
        top: 50 //距离顶部高度
      })
    },
    closeMessage() {
      this.$msg.allClose()
    },
    modifyCode() {
      let blocks = document.querySelectorAll("pre code");
      blocks.forEach(block => {
        hljs.highlightBlock(block);
      });
    },
    // 初始化画布及图层
    initQunne() {
      const vm = this;
      vm.graph = new Q.Graph(document.getElementById('canvas'));
      const layouter = new Q.TreeLayouter(vm.graph);
      layouter.layoutType = Q.Consts.LAYOUT_TYPE_EVEN;
      layouter.doLayout({
        callback: () => {
          vm.graph.zoomToOverview();
        }
      });
    },
    // 初始化事件
    initEvent() {
      const vm = this
      vm.graph.enableTooltip = {};
      vm.graph.onmousewheel = () => {
        vm.contextMenuData.isShow = false
        vm.infoLocation.showBox = false
      }
      vm.graph.addCustomInteraction({
        oncontextmenu(e, graph) {
          vm.$nextTick(() => {
            vm.hideTooltip();
          });
          if (!this.isContextmenu) {
            return;
          }
          vm.infoLocation.showBox = false;
          const nodeData = e.getData()
          if (!nodeData || !nodeData.type) return
          event.preventDefault()
          vm.contextMenuData.isShow = true
          vm.contextMenuData.axios = {
            x: event.clientX,
            y: event.clientY
          }
        },
        onclick(type, evt, graph) {
          vm.$nextTick(() => {
            vm.hideTooltip();
          });
          vm.contextMenuData.isShow = false
          vm.infoLocation.showBox = false
          const nodeData = type.getData()
          if (nodeData && nodeData.type === 1) {
            type.getData()
            vm.infoLocation.viewY = type.offsetY
            vm.infoLocation.viewX = type.offsetX
            vm.infoLocation.infoObj = nodeData
            vm.infoLocation.showBox = true
          } else {
            vm.infoLocation.showBox = false
            vm.infoLocation.infoObj = {}
          }
        },
        onDOMMouseScroll() {
          vm.contextMenuData.isShow = false
        }
      })
    },
    // 添加点线到画布
    //   translateToQuneeElements(json, graph) {
    //     const vm = this;
    //     vm.map = {};
    //     if(json.nodes){
    //       Q.forEach(json.nodes, function(data){
    //         data.type = 1;
    //         let node = vm.graph.createNode(data.name, data.x || 0, data.y || 0);
    //         node.set("data", data);
    //         vm.map[data.id] = node;
    //       });
    //     }
    //     if(json.edges){
    //       Q.forEach(json.edges, (data) => {
    //         data.type = 2;
    //         let from = vm.map[data.from];
    //         let to = vm.map[data.to];
    //         if(!from || !to){
    //           return;
    //         }
    //         let edge = vm.graph.createEdge(data.name, from, to);
    //         edge.set("data", data);
    //       }, vm.graph);
    //     }
    //   },
    // 初始化预览图
    initOverviewWindow() {
      const vm = this;
      vm.QuneeWindowOverviewProp.overview = new QuneeOverview($('#qunee-window-overview')[0]);
      vm.QuneeWindowOverviewProp.overview.setGraph(vm.graph);
    },
    // 右键菜单
    showMenu() {
      const vm = this;
      event.preventDefault()
      vm.contextMenuData.isShow = true
      var x = event.clientX
      var y = event.clientY
      vm.contextMenuData.axios = {
        x,
        y
      }
    },
    //   createNode(data){
    //     const node = vm.graph.createNode(data.name);
    //     vm.nodesObj[data.id] = node;
    //     console.log(vm.nodesObj)
    //     if(data.from){
    //       vm.graph.createEdge(vm.nodesObj[data.from], node);
    //     }
    //     return node;
    //   },
    // 遍历单个节点
    traverseNode(data) {
      const vm = this;
      const node = vm.graph.createNode(data.name);
      node.parentChildrenDirection = Q.Consts.DIRECTION_BOTTOM;
      node.type = 1;
      return node;
    },
    // 遍历树
    traverseTree(node, from) {
      const vm = this;
      if (!node) {
        return;
      }
      const childrenNode = vm.traverseNode(node);
      if (from) {
        // console.log(from, childrenNode);
        vm.graph.createEdge(from, childrenNode);
      }
      if (node.children && node.children.length > 0) {
        node.children.forEach((value, index) => {
          vm.traverseTree(value, childrenNode);
        })
      }
    },
    // 隐藏提示框
    hideTooltip() {
      $('.Q-Tooltip').remove();
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
}

</script>
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.qunne-box {
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}

.qunne-demo {
  height: 500px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: .3s;
  margin: 0 auto;
}

.box-card {
  width: 200px;
  height: 280px;
  position: absolute;
  top: 0;
  left: 0;
}

.box-a {
  position: fixed;
  z-index: 99;
}

.el-menu-vertical-demo {
  background: #fff;
}

.el-menu-item {
  margin: 0;
}

.searchBtn {
  width: 25px;
  height: 25px;
  line-height: 25px;
  border: 2px solid #428bca;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}

.view-box {
  border: 1px solid green;
  height: 300px;
}

</style>
