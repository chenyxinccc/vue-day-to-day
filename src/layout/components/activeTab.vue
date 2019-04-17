<template>
  <div class="layout-tag-content">
    <el-scrollbar wrap-class="layout-tag-scrollbar" ref="scroll">
      <draggable v-model="activeTags">
        <router-link v-if="activeTags.length" v-for="(tag, i) in activeTags" :key='i' :to="{ name: tag.name }" class='layout-tag-item' :title="tag.meta.title" :class="{'active-tag' : $route.name == tag.name}">
          {{tag.meta.title}}
          <i class="el-icon-close" title="关闭页签" @click.prevent="closeTag(tag)" v-if="activeTags.length > 1"/>
        </router-link>
      </draggable>
    </el-scrollbar>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'activeTab',
  data () {
    return {
      activeTags: []
    }
  },
  components: {
    draggable
  },
  watch: {
    $route () {
      this.setTags()
    }
  },
  mounted () {
    this.setTags()
  },
  methods: {
    setTags () {
      const hasData = this.activeTags.find((v) => {
        return v.meta.title === this.$route.meta.title
      })
      if (!hasData) {
        this.activeTags.push(this.$route)
      }
    },
    closeTag (tag) {
      let index = null
      const hasTag = this.activeTags.find((v, i) => {
        if (v.name === tag.name) {
          index = i
        }
        return v.name === tag.name
      })
      if (hasTag) {
        this.activeTags.splice(index, 1)
        if (this.activeTags.length >= 1) {
          // 如果删除的是当前页面的tag则跳转到tags的最后一项
          if (hasTag.name === this.$route.name) {
            this.$router.push({ name: this.activeTags[this.activeTags.length - 1].name })
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scope>
.layout-tag-content{
  height: 36px;
  line-height: 36px;
  padding-left: 10px;
  white-space: nowrap;
  margin-right: 30px;
  overflow: hidden;

  /deep/ .el-scrollbar{
    display: flex;
    width: 100%;
  }

  .layout-tag-item{
    min-width: 80px;
    height: 30px;
    font-size: 12px;
    line-height: 26px;
    margin: 0 5px 0 0;
    padding: 0;
    display: inline-block;
    border: 1px solid #EEE;
    border-radius: 5px;
    padding: 0 4px 4px 6px;
    cursor: pointer;
    transition: .2s all;
    color: black;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    i {
      cursor: pointer;
    }
  }
  .active-tag {
    background: #42b983;
    border-radius: 5px;
    color: #FFF;
  }
}
</style>
