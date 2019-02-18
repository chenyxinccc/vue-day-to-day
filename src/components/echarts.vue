<template>
<div>
  <div class="content">
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
      // 初始化空对象
      chart: null,
      // 初始化图表配置
      option: {
        backgroundColor: '#0f375f',
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
  methods: {
    drawGraph (ref) {
      // 绘图方法
      this.chart = echarts.init(this.$refs[ref])
      this.chart.setOption(this.option)
      window.onresize = this.chart.resize
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.drawGraph('main')
    })
  },
  destroyed () {
    window.onresize = null
  }
}
</script>
<style lang="less">
  .main {
    /*需要制定具体高度，以px为单位*/
    width: 100%;
    height: 800px;
    margin: auto;
    display: inline-block;
  }
</style>
