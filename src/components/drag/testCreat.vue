/* eslint-disable */
<template>
  <div class="box">
    <h4>这是发布页面</h4>
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <div id="ComponentFactory">
            <el-form ref="form" :model="form" label-width="80px">

              <div class="item" draggable="true" id="item1"  @dragstart='copydrop($event)'>
                <el-form-item label="输入框">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </div>

              <div class="item"  draggable="true" id="item2"   @dragstart='copydrop($event)'>
                <!-- 复选框 -->
                <!--<el-form-item label="复选框">
                  <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食" name="type"></el-checkbox>
                    <el-checkbox label="活动" name="type"></el-checkbox>
                    <el-checkbox label="线下" name="type"></el-checkbox>
                    <el-checkbox label="单纯" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>-->
                <el-form-item label="日期时间">
                  <el-date-picker
                    v-model="datetimevalue"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>

              </div>

              <div class="item" id="item4" draggable="true"  @dragstart='copydrop($event)'>
                <!-- 单选框 -->
                <el-form-item label="单选框">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="线上"></el-radio>
                    <el-radio label="线下"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>

              <div class="item" id="item5" draggable="true"  @dragstart='copydrop($event)'>
                <!-- 下拉列表框 -->
                <el-form-item label="下拉框">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="item" id="item7" draggable="true"  @dragstart='copydrop($event)'>
                <!-- （一般信息）Info -->
                <el-form-item label="按钮">
                  <el-button type="primary">主要按钮</el-button>
                </el-form-item>
              </div>

              <div class="item" id="item8" draggable="true"  @dragstart='copydrop($event)'>
                <!-- （成功）Success -->
                <el-form-item label="按钮">
                  <el-button type="success">成功按钮</el-button>
                </el-form-item>
              </div>

              <div class="item" id="item9" draggable="true"  @dragstart='copydrop($event)'>
                <!-- （危险）Danger-->
                <el-form-item label="按钮">
                  <el-button type="danger">危险按钮</el-button>
                </el-form-item>
              </div>

              <div class="item" id="item11" draggable="true"  @dragstart='copydrop($event)'>
                <!-- 按钮组 -->
                <el-form-item label="按钮">
                  <el-button type="success">成功按钮</el-button>
                  <el-button type="danger">危险按钮</el-button>
                </el-form-item>
              </div>

              <div class="item2" id="item10" draggable="true"  @dragstart='copydrop($event)'>
                <!-- 文本域 -->
                <el-form-item label="活动形式">
                  <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>

        </div>
      </el-col>
      <el-col :span="8" class="flxed">
        <!--视图区-->
        <div class="grid-content">

        <!--选项卡-->
          <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
            <el-tab-pane :key="item.name" v-for="(item) in editableTabs" :label="item.title" :name="item.name">
              <!--视图区-->
              <div class="tab-content" id="box" @dragstart='removedrop($event)' @drop='copydrap($event)' @dragover='allowDrop($event)'>
              {{item.content}}
              </div>

            </el-tab-pane>
          </el-tabs>
        </div>
        <!--移除区-->
        <div class="bg-purple-light" id="removeBox" @drop='removedrap($event)' @dragover='allowDrop($event)'>
        </div>
      </el-col>
      <el-col :span="8" class="flxed">
        <!--查看源码-->
        <div class="grid-content bg-purple-light" id="codeBox" >{{ htmlcode }}</div>
      </el-col>
    </el-row>
    <!--模态框-->
    <el-dialog title="修改名称" :visible.sync="dialogFormVisible" width="20%">
      <el-form :model="form">
        <el-form-item label="名称" >
          <el-input v-model="labelname"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateLabel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

/* eslint-disable */
<script type="application/javascript">
let id = null
let itemName = null
let cloneObject = null
let removeid = null
let moveObj = null
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      /* 日期插件 */
      datetimevalue: '',
      /* 模态框状态 */
      dialogFormVisible: false,
      labelid: '',
      labelname: '',
      htmlcode: '',
      /* 选项卡属性 */
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2
    }
  },
  methods: {
    // 抓起
    copydrop: function (e) {
      console.log('SET -> addBuffer', e.target.id)
      e.dataTransfer.setData('addBuffer', e.target.id)
      this.CopyCss(e.target.id, '1px dashed #66CC99', 'rgba(204,204,204,0.3)', '4px')
    },
    // 移除起
    removedrop: function (e) {
      console.log('移除节点托起ID：', e.target.id)
      e.dataTransfer.setData('removeBuffer', e.target.id)
      this.CopyCss(e.target.id, '1px dashed red', 'rgba(204,204,204,0.3)', '4px')
    },
    // 移除放下
    removedrap: function (e) {
      removeid = e.dataTransfer.getData('removeBuffer')
      if (removeid === null || removeid === '') {
        console.log('removeId == null')
        return
      }
      console.log('移除节点放下ID：', removeid)
      // 删除节点
      document.getElementById(removeid).parentNode.removeChild(document.getElementById(removeid))
    },
    // 放下
    copydrap: function (e) {
      // console.log('放下')
      e.preventDefault()
      id = e.dataTransfer.getData('addBuffer')
      if (id === null || id === '') {
        console.log('id is NULL！')
        return
      }
      itemName = 'item' + parseInt(Math.random() * (1000000 - 1 + 1) + 1)
      console.log('GET-> addBuffer:', itemName)
      // 克隆真实对象
      cloneObject = document.getElementById(id).cloneNode(true)

      // 为克隆对象设置唯一Id
      cloneObject.setAttribute('id', itemName)
      // this.$set(cloneObject, 'id', itemName)
      // this.$set(cloneObject, '@click', 'updateLabel()')
      // 把新的节点添加到新的区域中
      e.target.appendChild(cloneObject)

      console.log(e.target.id)
      // console.log(cloneObject)
      // 设置样式
      this.CopyCss(id, '', '', '')

      // 修改名称
      this.dialogFormVisible = true
      this.labelid = itemName
    },
    // 拖动过程
    allowDrop: function (e) {
      console.log(e.target.id)
      e.preventDefault()
    },
    updateLabel: function () {
      this.dialogFormVisible = false
      // 设置labelname 到对呀的label
      document.getElementById(this.labelid).children[0].children[0].innerHTML = this.labelname
      // console.log(label)
      this.htmlcode = document.getElementById('box').innerHTML
      document.getElementById('codeBox').innerHTML = this.htmlcode
    },
    CopyCss: function (obj, border, background, borderradius) {
      moveObj = document.getElementById(obj)
      moveObj.style.border = border
      moveObj.style.background = background
      moveObj.style.borderRadius = borderradius
    },
    handleTabsEdit (targetName, action) {
      if (action === 'add') {
        let newTabName = ++this.tabIndex + ''
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        })
        this.editableTabsValue = newTabName
      }
      if (action === 'remove') {
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }

        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      }
    }
  }
}
</script>

<style type="text/css" scoped>
  .box{
    padding:20px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height: 700px;
    overflow: auto;
    padding:20px;
  }
  .tab-content{
    border:1px solid #eee;
    border-radius: 4px;
    min-height: 200px;
    overflow: auto;
    padding:20px;
  }
  .item{
    height: 60px;
    border:0px solid #333;
    /*border-radius: 4px;
    border-style: dashed;*/
    padding: 10px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .item2{
    height: 80px;
    border:0px solid #333;
    /*border-radius: 4px;
    border-style: dashed;*/
    padding: 10px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  #removeBox{
    height: 100px;
    width: 100px;
    border:2px dashed #999;
    background: rgba(0,0,0,0.3);
    position: absolute;
    bottom: 10px;
    right: 20px;
    background: url(/static/image/deleteBox.png) no-repeat;
    background-size: 90%;
    background-position: center center;
  }
  .flxed{
    position: relative;
    top: 0;
    left: 0;
  }
</style>
