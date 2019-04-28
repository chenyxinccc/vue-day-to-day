<template>
  <div>
    <div class="card-box" :style="{width: width + 'px'}">
      <div class="card-content" :title="endValue">
        <count-to :start-val="0" :end-val="endValue" :duration="3000" class="card-panel-num" />
      </div>

      <span class="card-icon" title="关闭" @click="cardClose">
        <i class="el-icon-circle-close"/>
      </span>

    </div>
  </div>
</template>
<script>
import CountTo from 'vue-count-to'
export default {
  name: 'numberCard',
  components: {
    CountTo
  },
  props: {
    endValue: {
      required: true,
      type: Number
    },
    width: {
      default: 200,
      type: [Number, String]
    }
  },
  data () {
    return {
      showIcon: false
    }
  },
  methods: {
    cardClose () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
.card-box {
  height: 50px;
  border: 1px solid #eee;
  border-radius: 5px;
  transition: all .2s;
  position: relative;
  overflow: hidden;
  .card-icon {
    width: 30%;
    height: 100%;
    display: flex;
    float: right;
    align-items: center;
    justify-content: center;
    z-index: 99;
    cursor: pointer;
  }
  .card-content {
    width: 70%;
    height: 100%;
    line-height: 50px;
    display: inline-block;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    .card-panel-num {
      font-size: 20px;
    }
  }
  &:hover {
    .card-icon{
      i {
        -webkit-animation:myRotate .6s linear;
        animation:myRotate .6s linear;
      }
    }
  }
  &:hover::before{
    width: 100%;
  }
}

.card-box::before{
  width: 0;
  height: 50px;
  line-height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 20px;
  overflow: hidden;
  text-indent: 50px;
  color: #fff;
  background: #42b983;
  content: '';
  /*content: attr(data-hover);*/
  z-index: -1;
  -webkit-transition: width 0.5s;
  -moz-transition: width 0.5s;
  transition: width 0.5s;
}

@keyframes myRotate {
    0%{ transform: rotate(0deg);}
    100%{ transform: rotate(360deg);}
}
@-webkit-keyframes myRotate{
    0%{ -webkit-transform: rotate(0deg);}
    100%{ -webkit-transform: rotate(360deg);}
}
@keyframes myRotate{
    0%{ -webkit-transform: rotate(0deg);}
    100%{ -webkit-transform: rotate(360deg);}
}
</style>
