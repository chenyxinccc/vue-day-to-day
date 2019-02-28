import Vue from 'vue'
import template from './toast.vue'

// toast基础构建类
class Rectangle {
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
    // 将组件DOM实体插入
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

  // 关闭当前message
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

  // 关闭全部message
  allClose () {
    for (let i = this.activeToasts.length - 1; i >= 0; i--) {
      this.activeToasts[i].close()
    }
    this.activeToasts = []
  }

  // 提供给vue的安装方法
  static install (Vue, options) {
    Vue.prototype.$msg = new Rectangle()
  }
}

export default Rectangle
