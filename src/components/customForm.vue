<template>
<div class="custom-form__box">
   <div
      class="custom-form__left"
      @drop="drop"
      @dragover="dragover">
    <p
      :key="index"
      draggable="true"
      :id="'dropList'+ item.name"
      @dragstart ="dragstart(item, index, 'left')"
      v-for="(item, index) of list"
      :class="item.class"
      >{{item.name}}</p>
   </div>
   <div
      class="custom-form__right"
      @drop="drop"
      @dragover="dragover">
      <p
        v-for="(item, index) of rightList"
        :key="index"
        :id="'dropList'+ item.name"
        draggable="true"
        @drop="dropSetList(item)"
        @dragenter="dragenter(item)"
        @dragover="dragover(item)"
        @dragstart ="dragstart(item, index, 'right')"
        >{{item.name}}</p>
   </div>
</div>
</template>
<script>
export default {
  name: 'customForm',
  data () {
    return {
      list: [
        {
          name: 'first',
          class: ''
        },
        {
          name: 'number two',
          class: ''
        },
        {
          name: 'number three',
          class: ''
        },
        {
          name: 'last',
          class: ''
        }
      ],
      rightList: [],
      dragObj: {},
      drageDomId: ''
    }
  },
  methods: {
    dragstart (item, index, model) {
      this.dragObj = {
        item,
        index,
        model,
        id: `dropList${item.name}`
      }
      this.dragCss(`dropList${item.name}`, '1px dashed #66CC99', 'rgba(204,204,204,0.3)', '4px')
    },
    drop (e) {
      e.preventDefault()
      if (e && e.stopPropagation) {
        e.stopPropagation()
      } else {
        window.event.cancelBubble = true
      }
      this.dragCss(this.dragObj.id, '', '', '')
      if (this.dragObj.model === 'left' && e.target.className === 'custom-form__right') {
        const pObj = this.list.splice(this.dragObj.index, 1)
        this.rightList.push(pObj[0])
      } else if (this.dragObj.model === 'right' && e.target.className === 'custom-form__left') {
        const pObj = this.rightList.splice(this.dragObj.index, 1)
        this.list.push(pObj[0])
      }
    },
    dropSetList (item) {
      event.preventDefault()
      if (event && event.stopPropagation) {
        event.stopPropagation()
      } else {
        window.event.cancelBubble = true
      }
      // const index = this.rightList.findIndex((v, i) => {
      //   return item.name === v.name
      // })
    },
    dragCss (obj, border, background, borderradius) {
      const moveObj = document.getElementById(obj)
      if (!moveObj) {
        return
      }
      moveObj.style.border = border
      moveObj.style.background = background
      moveObj.style.borderRadius = borderradius
    },
    dragenter (item) {
      console.log(1213)
    },
    dragover (item) {
      event.preventDefault()
      // console.log(this.dragObj)
      // this.rightList.splice(index, 0, {
      //   name: '  ',
      //   class: 'custom-form-p__move'
      // })
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
  p{
    padding: 10px;
    border: 1px solid;
    cursor: move;
  }
  .custom-form__box{
    min-width: 1200px;
    height: 100%;
    div{
      display: inline-block;
      height: 100%;
    }
    .custom-form__left{
      width: 30%;
      float: left;
      border-right: 1px solid #eeeeee;
      box-sizing: border-box;
    }
    .custom-form__right{
      width: 70%;
      float: right;
    }
    .custom-form-p__move{
      border: 1px solid;
    }
  }
</style>
