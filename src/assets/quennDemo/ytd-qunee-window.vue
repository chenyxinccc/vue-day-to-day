<!--拓扑图：窗口-->
<template>
  <div class="qunee-window"
       v-show="visible"
       :class="[customClass, placement == 'right' ? 'qunee-window--right' : (placement == 'bottom' ? 'qunee-window--bottom' : 'qunee-window--left')]">
    <div class="qunee-window__heading">
      <el-row>
        <el-col :span="12">
          <div class="qunee-window__title">{{title}}</div>
        </el-col>
        <el-col :span="12">
          <div class="action">
            <slot name="action"></slot>
            <i class="fa fa-times fa-fw"
               @click="close"></i>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="qunee-window__body">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/babel">
/*eslint-disable*/

export default {
  name: 'qunee-window',
  props: {
    /**
     * 是否显示
     */
    visible: Boolean,
    /**
     * 标题
     */
    title: String,
    /**
     * 位置
     *  1. left(default)
     *  2. right
     *  3. bottom
     */
    placement: {
      type: String,
      default() {
        return 'left';
      }
    },
    customClass: String
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    }
  },
  components: {
  }
};
</script>
<style scoped
       lang="css">
  section * {
    font-family: "微软雅黑", "Microsoft YaHei", "宋体", sans-serif;
  }

  section .fa {
    font-family: "FontAwesome", sans-serif;
  }
</style>
<style lang="css">
  .qunee-window {
    background-color: #FFFFFF;
    border: 1px solid #C0CCDA;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin: 0;
    position: absolute;
    width: 25%;
    top: 0;
    left: 5px;
    z-index: 1;
  }
  .qunee-window--left {
    right: inherit;
    left: 0;
    width: 15%;
    height: calc(100% - 244px);
    border-radius: 0 3px 0 0;
  }

  .qunee-window--right {
    right: 0;
    left: inherit;
    width: 15%;
    height: calc(100% - 244px);
    border-radius: 3px 0 0 0;
  }

  .qunee-window--left .qunee-window__heading {
    border-top-left-radius: 0;
  }

  .qunee-window--right .qunee-window__heading {
    border-top-right-radius: 0;
  }

  .qunee-window--bottom {
    top: inherit;
    right: 0;
    bottom: 0;
    left: 0;
    width: calc(100% - 2px);
    height: 200px;
    border-radius: 0 0 3px 3px;
  }

  .qunee-window--bottom .qunee-window__heading {
    border-radius: 0;
  }

  .qunee-window__body {
    padding: 0;
    height: calc(100% - 27px);
  }

  .qunee-window__heading {
    border-bottom: 1px solid #C0CCDA;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding: 3px 0 3px 10px;
    color: #333333;
    background-color: #E5E9F2;
  }

  .qunee-window__heading .row {
    margin: 0;
  }

  .qunee-window__heading .action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 20px;
    padding: 0 5px;
  }

  .qunee-window__heading .action .fa {
    width: 20px;
    height: 20px;
    margin: 0 0 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 3px;
  }

  .qunee-window__heading .action .fa:hover {
    color: #58B7FF;
  }

  .qunee-window__title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 13px;
    color: inherit;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 20px;
  }
</style>
