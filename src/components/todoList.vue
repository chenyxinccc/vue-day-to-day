<template>
  <div class="vue-todoList">
    <el-input placeholder="输入代办" v-model="addEventString" @keyup.enter.native="addEvent" class="vue-todoList-input">
      <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="resetEvent"></i>
    </el-input>
    <div v-for="(item, index) in list" :key="index" class="list-envet-box" :class="{'list-envet-compelet': item.compelet}">
      <span class="list-envet-title" @dblclick="completeEvent(index)"> {{item.title}} </span>
      <span class="list-envet-time">{{item.time}}</span>
      <i class="el-icon-close" title="删除该事件" @click="delEvent(index)" />
    </div>
    <!-- <card v-for="(item, index) in list" :key="index" @close="close" :endValue="item.time" width="200"/> -->
  </div>
</template>
<script>
import card from './numberCard'
export default {
  name: 'todoList',
  data () {
    return {
      list: [],
      addEventString: ''
    }
  },
  components: {
    card
  },
  mounted () {
    const localData = localStorage.getItem('listData')
    this.list = (localData && JSON.parse(localData)) || []
  },
  beforeDestroy () {
    localStorage.setItem('listData', JSON.stringify(this.list))
  },
  methods: {
    addEvent () {
      const date = new Date()
      this.list.push({
        title: this.addEventString,
        time: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
        compelet: false
      })
      this.addEventString = ''
    },
    resetEvent () {
      this.addEventString = ''
    },
    completeEvent (index) {
      if (this.list[index].compelet) {
        this.$set(this.list[index], 'compelet', false)
      } else {
        this.$set(this.list[index], 'compelet', true)
      }
    },
    delEvent (index) {
      this.list.splice(index, 1)
    }
  }
}

</script>
<style lang="less" scoped>
.vue-todoList {
  .vue-todoList-input {
    width: 200px;
  }

  .list-envet-compelet {
    .list-envet-title {
      text-decoration:line-through;
    }
  }

  .list-envet-box {
    width: 400px;
    heigth: 50px;
    border: 1px solid #eee;
    border-radius: 5px;
    line-height: 50px;
    overflow: hidden;
    display: flex;
    align-items: center;
    margin: 10px auto 0;
    position: relative;
    span {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .list-envet-title {
      width: 50%;
      cursor: pointer;
      display: inline-block;
      outline-right: 1px solid #eee;
      float: left;
    }

    .list-envet-time {
      display: inline-block;
      width: 44%;
      padding-right: 10px;
      float: left;
    }

    i {
      width: 10px;
      float: right;
      cursor: pointer;
    }

    &::before{
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
      z-index: -1;
      -webkit-transition: width 0.5s;
      -moz-transition: width 0.5s;
      transition: width 0.5s;
    }

    &:hover::before{
      width: 100%;
    }
  }
}
</style>
