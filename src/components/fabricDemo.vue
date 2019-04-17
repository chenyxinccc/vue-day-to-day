<template>
  <div class="fabric-content">
    <canvas id="canvas" width="800px" height="800px"></canvas>
  </div>
</template>
<script>

import fabric from 'fabric'
export default {
  name: 'fabricDemo',
  data () {
    return {
      fabricObject: null, // fabric对象
      fabricContainer: null// fabric实例
    }
  },
  mounted () {
    this.initCanvas()
  },
  methods: {
    initCanvas () {
      this.fabricObject = fabric.fabric
      this.fabricContainer = new this.fabricObject.Canvas('canvas')
      const rect = new this.fabricObject.Rect({
        top: 100,
        left: 100,
        width: 60,
        height: 70,
        fill: 'red',
        angle: 45
      })
      this.fabricContainer.add(rect)
    }
  }
}
</script>
<style lang="less">
.fabric-content{
  width: 100%;
  text-align: center;
  .canvas-container {
    margin: 0 auto;
    display: inline-block;
  }
  #canvas{
    border: 1px solid #eee;
    border-radius: 5px;
  }
}
</style>
