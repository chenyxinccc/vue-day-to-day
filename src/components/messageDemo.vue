<template>
  <div>
    <p>jsx及message插件开发实践</p>
    <p>可输入按钮类型['add', 'success', 'warning'], 输入格式: success,成功按钮</p>
    <p>配置参照 @/components/messageDemo.vue</p>
    <el-input
      class="message-demo"
      placeholder="请输入新增按钮类型及名字"
      v-model="addType"
      @keydown.enter.native="addBtn">
      <i slot="suffix" class="el-input__icon el-icon-circle-plus-outline" @click="addBtn"></i>
    </el-input>
    <el-button @click="close" type="primary">close All</el-button>
    <div id="renderBox"/>
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  name: 'messageDemo',
  data () {
    return {
      addType: null
    }
  },
  methods: {
    addBtn () {
      this.renderTest(this.addType.split(','))
    },
    renderTest ([type, name]) {
      // component产生组件
      const Button = Vue.component('ele', {
        render: function (createElement) {
          return createElement('el-button', {
            'class': {
              show: this.show
            },
            attrs: {
              id: 'elem',
              type: type,
              size: 'small'
            },
            on: {
              click: this.handleClick
            }
          }, name)
        },
        data: function () {
          return {
            show: false
          }
        },
        methods: {
          handleClick: () => {
            this.addMessage(type)
          }
        }
      })
      /* mount会替换目标容器  */
      // new button().$mount('#renderBox')
      document.getElementById('renderBox').appendChild(new Button().$mount().$el)
      /* extend产生组件 */
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
    addMessage (type = 'add') {
      this.$msg[type] && this.$msg[type]({
        message: `i'm: ${type}`, // 显示文字内容
        handelCLose: true, // 显示关闭按钮
        time: 0, // 自动关闭时间 为0则不关闭
        top: 50 // 距离顶部高度
      })
    },
    close () {
      this.$msg.allClose()
    }
  }
}
</script>
<style lang="less" scoped>
.message-demo {
  width: 400px;
}
#renderBox{
  padding: 10px;
}
</style>
