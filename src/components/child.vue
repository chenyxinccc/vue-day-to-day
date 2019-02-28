<template>
<div>
  <el-input v-model="a"/>
  子页面
  <router-view/>
</div>
</template>a
<script>

export default {
  name: 'child',
  data () {
    return {
      a: 1
    }
  },
  methods: {
  },
  created () {
  }
}
</script>
