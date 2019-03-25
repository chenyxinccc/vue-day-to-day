<template>
  <div class="drag-content">
    <draggable v-model="tags" :move="getdata" @update="datadragEnd">
      <transition-group>
        <div v-for="element in tags" :key="element.id" class="drag-box">
          <draggable v-model="element.list" :move="getdata" @update="datadragEnd" @start="start" @end="end"
          :options="{group: `aaa${element.id}`}">
            <div v-for="ele in element.list" :key="ele.id">
              {{ele.name}}
            </div>
          </draggable>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'drag',
  data () {
    return {
      options: { forceFallback: true },
      tags: [{
        name: 1,
        id: 1,
        list: [{
          name: 22,
          id: 22
        }, {
          name: 33,
          id: 33
        }, {
          name: 44,
          id: 4
        }]
      }, {
        name: 2,
        id: 2,
        list: [{
          name: 11,
          id: 221
        }, {
          name: 1231,
          id: 31
        }, {
          name: 1231,
          id: 41
        }]
      }]
    }
  },
  methods: {
    start (evt) {
      console.log(evt)
    },
    end (evt) {
      console.log(evt)
    },
    getdata (evt) {
      console.log(evt.draggedContext.element.id)
    },
    datadragEnd (evt) {
      console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)
      console.log(this.tags)
    }
  },
  components: {
    draggable
  },
  created () {}
}

</script>
<style lang="less">
.drag-content {
  display: flex;
  justify-content: center;
  align-items: center;

  .drag-box {
    display: inline-block;
    border: 1px solid #eee;
    margin-right: 10px;
    width: 100px;
    height: 300px;
  }
}

</style>
