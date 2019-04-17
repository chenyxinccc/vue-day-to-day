<template>
  <transition name="el-fade-in-linear">
    <div v-if="visible">
      <div class="vue-toast" :class=getTypeClass :style="{top: top + 'px'}">
        <label class="vue-toast__label">
          {{message}}
        </label>
        <i
          class="el-icon-error vue-toast__icon"
          v-if="handelCLose"
          @click="close"/>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      constVm: null,
      visible: false,
      message: '',
      time: 4000,
      timeout: null,
      handelCLose: false,
      top: 30,
      type: 'default'
    }
  },
  computed: {
    getTypeClass () {
      return `vue-toast__${this.type}`
    }
  },
  mounted () {
    if (this.time) {
      this.timeout = setTimeout(() => {
        this.close()
      }, this.time)
    }
  },
  methods: {
    close () {
      clearTimeout(this.timeout)
      this.timeout = null
      this.$el.parentNode.removeChild(this.$el)
      if (this.constVm) {
        this.constVm.activeToasts.pop()
      }
    }
  },
  created () {
  },
  beforeDestroy () {
    console.log('close')
  }
}
</script>
<style lang="less" scoped>
.vue-toast__success{
  color: #67c23a;
  background-color: #f0f9eb;
  border: 2px solid #f0f9eb;
}
.vue-toast__warning{
  color: #e6a23c;
  background-color: #faecd8;
  border: 2px solid #faecd8;
}
.vue-toast__error{
  color: #f56c6c;
  background-color: #fef0f0;
  border: 2px solid #fef0f0;
}
.vue-toast__default{
  color: #909399;
  background-color: #edf2fc;
  border: 2px solid #edf2fc;
}
.vue-toast{
  width: auto;
  min-width: 80px;
  min-height: 20px;
  line-height: 1;
  padding: 5px 30px;
  border-radius: 4px;
  text-align: center;
  position: fixed;
  left: calc(50% + 90px);
  transform:translate(-50%, 0%);
  .vue-toast__label{
    font-size: 14px;
    display: inline-block;
    width: 100%;
    padding-right: 5%;
  }
  .vue-toast__icon{
    font-size: 6px;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translate(0, -50%);
    cursor: pointer;
  }
}
</style>
