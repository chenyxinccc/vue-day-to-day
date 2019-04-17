<template>
  <div class="notFind-box">
    <h1>(ha,啥也没有)</h1>
    <h2>你要访问的页面没有被找到</h2>
  </div>
</template>
<script>

export default {
  name: 'notFind',
  data () {
    return {
    }
  }
}
</script>
<style scoped lang="less">
.notFind-box{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1{
    text-decoration:line-through
  }
}
</style>
