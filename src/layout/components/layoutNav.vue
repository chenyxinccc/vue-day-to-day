<template>
  <div class="layout-nav">
    <active-tab/>
    <theme-picker class="layout-them" @change="themeChange" />
  </div>
</template>
<script>
import activeTab from './activeTab.vue'
import ThemePicker from '@/components/ThemePicker'

export default {
  name: 'layoutNav',
  data () {
    return {
    }
  },
  components: {
    activeTab,
    ThemePicker
  },
  methods: {
    themeChange (val) {
      this.$store.dispatch('setting/commitSetLoading', val)
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
.layout-nav{
  border-bottom: 1px solid #eee;
  .layout-them{
    position: absolute;
    right: 4px;
    top: 6px;
  }
}
</style>
