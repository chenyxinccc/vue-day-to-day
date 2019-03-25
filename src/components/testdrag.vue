<template>
  <div class="dndList">
    <!-- <draggable :list="list" :options="{group:'article', disabled: disabled}" @start="start22" @end="end22" class="dragArea11" style="height: 100px">
      <div class="test" v-for="(value, i) in list" :key="i">
        {{value.name}}
      </div>
    </draggable> -->

    <draggable :list="list" :options="{group:{name: 'asdasd'},filter: '.undraggable'}" class="dragArea" @change="change">
      <div class="test" v-for="(value, i) in list" :key="i" :id="`content${value.id}`">
        {{value.name}}
        <div class="dndList-list">
          <draggable :list="value.list1" :options="{group:'article'}" class="dragArea11" :id="`test${value.id}`" style="height: 100px" @change="change">
            <div v-for="(element) in value.list1" :key="element.id" :id="`box${element.id}`" class="list-complete-item">
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
  name: 'DndList',
  components: { draggable },
  watch: {},
  data () {
    return {
      startId: null,
      endId: null,
      falgs: 'article',
      disabled: false,
      list: [{ id: 1, name: 1, list1: [{ id: 1, name: 1 }, { id: 2, name: 2 }, { id: 4, name: 4 }, { id: 3, name: 3 }] }, { id: 2, name: 2, list1: [] }]
      // list1: [{ id: 1, name: 1 }, { id: 2, name: 2 }],
      // list2: [{ id: 1, name: 1 }, { id: 2, name: 2 }, { id: 3, name: 3 }, { id: 4, name: 4 }, { id: 5, name: 5 }, { id: 6, name: 6 }, { id: 7, name: 7 }, { id: 8, name: 8 }, { id: 9, name: 9 }, { id: 10, name: 10 }]
    }
  },
  computed: {},
  mounted () {
    let a = document.getElementById('box3')
    console.log(a.parentNode)
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
.test{
  border: 1px solid #eee;
}
</style>
