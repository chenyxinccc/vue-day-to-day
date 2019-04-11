/**
 * 消息提示插件
 * use => this.$msg[type]
 * options:
 *   param [message] 消息文本内容
 *   param [handelCLose] 是否展示关闭按钮   default: false
 *   param [time] 自动关闭时间 为0则不关闭   default: 4000  unit: ms
 *   param [top]  距离顶部高度              default: 30    unit: px
 *   author chenyx
 */

import Vue from 'vue'
import template from './toast.vue'

// toast基础构建类
class Hint {
  constructor () {
    this.toast = undefined
    this.activeToasts = []
    // 获取组件模板
    this.Template = Vue.extend(template)
  }
  // 新增message
  add (options, type = 'default') {
    options = options || {}
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    options.constVm = this
    // 产生组件模板
    this.toast = new this.Template({data: options})
    // 产生组件实例
    this.toast.vm = this.toast.$mount()
    this.toast.visible = true
    // 将组件DOM实体加入
    document.body.appendChild(this.toast.vm.$el)
    this.activeToasts.push(this.toast)
  }
  success (options) {
    this.add(options, 'success')
  }

  error (options) {
    this.add(options, 'error')
  }

  warning (options) {
    this.add(options, 'warning')
  }

  // 关闭当前提示
  close () {
    let activeIndex
    const activeLength = this.activeToasts.length
    this.toast.close()
    for (let i; i < activeLength; i++) {
      if (activeLength[i].id === this.toast.id) {
        activeIndex = i
        break
      }
    }
    this.activeToasts.splice(activeIndex, 1)
  }

  // 关闭全部提示
  allClose () {
    const length = this.activeToasts.length
    for (let i = length - 1; i >= 0; i--) {
      this.activeToasts[i].close()
    }
    this.activeToasts = []
  }

  // 提供给vue的安装方法
  static install (Vue, options) {
    Vue.prototype.$msg = new Hint()
  }
}

export default Hint
