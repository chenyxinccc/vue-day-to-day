<template>
<div class="echarts-demo" ref="echartsDemo">
  <div class="echarts-demo-fullscreen" @click="handleFullScreen">
      <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" :title="fullscreen?`取消全屏`:`全屏`"  placement="bottom">
          <i class="el-icon-rank"></i>
      </el-tooltip>
  </div>
  <div class="echarts-demo-content">
    <div ref="main" class="main"></div>
  </div>
</div>
</template>
<script>
import echarts from 'echarts'

let category = []
let dottedBase = +new Date()
let lineData = []
let barData = []

for (let i = 0; i < 20; i++) {
  let date = new Date(dottedBase += 1000 * 3600 * 24)
  category.push([
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ].join('-'))
  let b = Math.random() * 200
  let d = Math.random() * 200
  barData.push(b)
  lineData.push(d + b)
}
export default {
  data () {
    return {
      aesKey: '',
      fullscreen: false,
      // 初始化空对象
      chart: null,
      // 初始化图表配置
      option: {
        backgroundColor: '#2f4156',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#333'
            }
          }
        },
        legend: {
          data: ['title1', 'title2'],
          textStyle: {
            color: '#ccc'
          }
        },
        xAxis: {
          type: 'value',
          nameRotate: 100,
          axisLine: {
            lineStyle: {
              color: '#56AAFC'
            }
          },
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#56AAFC'],
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: category,
          nameTextStyle: {
            color: '#56AAFC'
          },
          axisLine: {
            lineStyle: {
              color: '#56AAFC',
              width: 1
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#56AAFC'],
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: { // 坐标轴小标记
            textStyle: { // 属性lineStyle控制线条样式
              fontWeight: 'bolder',
              color: '#56AAFC',
              shadowColor: '#56AAFC', // 默认透明
              shadowBlur: 10,
              fontSize: 10
            },
            lineStyle: {
              color: '#56AAFC',
              width: 1
            }
          }
        },
        series: [{
          name: 'title1',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: [0, 5, 5, 0],
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#14c8d4'},
                  {offset: 1, color: '#43eec6'}
                ]
              )
            }
          },
          data: barData
        }, {
          name: 'title2',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: [0, 5, 5, 0],
              color: new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                  {offset: 0, color: '#359917'},
                  {offset: 1, color: '#E7D5D5'}
                ]
              )
            }
          },
          data: [100, 200, 300, 400]
        }]
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.drawGraph('main')
    })
  },
  methods: {
    drawGraph (ref) {
      // 绘图方法
      this.chart = echarts.init(this.$refs[ref])
      this.chart.setOption(this.option)
      window.onresize = this.chart.resize
    },
    // 全屏事件
    handleFullScreen () {
      let element = this.$refs['echartsDemo']
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  },
  destroyed () {
    window.onresize = null
  }
}
</script>
<style lang="less" scoped>
  .echarts-demo{
    height: 100%;
    position: relative;
    .echarts-demo-content{
      height: 100%;
      .main {
        width: 100%;
        height: 100%;
        margin: auto;
        display: inline-block;
      }
    }
    .echarts-demo-fullscreen{
      display: inline-block;
      width: 20px;
      height: 20px;
      right: 6px;
      top: 14px;
      border-radius: 5px;
      position: absolute;
      z-index: 99;
      background-color: #fff;
      line-height: 22px;
      cursor: pointer;
    }
  }
</style>
