<template>
  <div class="drag-content">
    <draggable :list="list" :group="{name: 'drag-test'}" filter=".undraggable" class="dragArea" @change="change">
      <div class="drag-content-box" v-for="(value, i) in list" :key="i" :id="'content'+value.id">
        {{value.name}}
        <div class="dndList-list">
          <draggable :list="value.listArr" group="article" :id="'test'+value.id" style="height: 100px" @change="change">
            <div v-for="(element) in value.listArr" :key="element.id" :id="'box'+element.id" class="list-complete-item">
              <div class="list-complete-item-handle">{{element.name}}</div>
              <div>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </draggable>
  </div>

</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'dragTest',
  components: { draggable },
  watch: {},
  data () {
    return {
      startId: null,
      endId: null,
      falgs: 'article',
      disabled: false,
      list: [{ id: 1, name: 1, listArr: [{ id: 1, name: 1 }, { id: 2, name: 2 }, { id: 4, name: 4 }, { id: 3, name: 3 }] }, { id: 2, name: 2, listArr: [] }]
    }
  },
  methods: {
    change (e) {
      if (e.added) {
        this.$nextTick(() => {
          this.endId = document.getElementById(`box${e.added.element.id}`).parentNode.id
        })
      } else if (e.moved) {
        console.log(e.moved, 'move')
      }
    }
  }
}

</script>
<style lang="less" scoped>
.drag-content{
  text-aglin: center;

  .drag-content-box{
    width: 300px;
    float: left;
    margin: 0 20px;
    border: 1px solid #eee;
  }
}

.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 5px 12px;
  display: inline-block;
  margin-right: 20px;
  width: 50px;
  height: 50px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}

.list-complete-item.sortable-chosen {
  background: #4AB7BD;
}

.list-complete-item.sortable-ghost {
  background: #30B08F;
}

.undraggable {
  background-color: red;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
