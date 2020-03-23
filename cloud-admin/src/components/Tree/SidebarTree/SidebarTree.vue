<template>
 <article class="sidebar-tree">
   <div class="dept-tree-bar" v-loading="loading">
    <div style="padding: 20px">
      <el-tree ref="tree"
      empty-text="暂无数据..."
      :data="list"
      :expand-on-click-node="expandOnClickNode"
      :node-key="nodeKey"
      :highlight-current="true"
      :default-expanded-keys="defaultExpandedKeys"
      :draggable="false"
      :props="defaultProps"
      @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }" @mouseover="showMenuHandle(data)" @mouseout="hideMenuHandle(data)">
          <span>{{ node.label }}</span>
          <span class="handle" v-if="data.show && isShowBtn">
            <el-button
              :disabled="operateType !== 1"
              type="text"
              size="mini"
              @click="(event) => insertTree(data, event)">
              新增
            </el-button>
            <el-button
              :disabled="operateType !== 1"
              type="text"
              size="mini"
              @click="(event) => deleteTree(node, data, event)">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
 </article>
</template>
<script>
/**
 * 弹框通用树形选择组件（created by longbensong in 20190324)
 * @param {String} dialogTitle Dialog 的标题 默认请选择 选填
 * @param {Boolean} showDialogTree visible属性 是否显示弹框 必填
 * @param {Boolean} loading loading 默认值是false  可选填
 * @param {Array} data 数组 data 必填
 * @param {Boolean} nodeKey 唯一key 必填
 * @param {Object} propsSetting 配置对象，如child、label等 必填
 * @param {Array} defaultExpandedKeys 数组默认展开的节点的key 选填
 * @param {Boolean} expandOnClickNode 是否点击节点时展开 选填
 * @param {String} className 类 选填
 * @param {String} emptyText 无数据显示 默认显示 暂无数据... 选填
 *
 *示例：
* <dialog-select-tree
  :data="deptList"
  :dialog-title="treeConfig.dialogTitle"
  :props-setting="treeConfig.defaultProps"
  :default-expanded-keys="treeConfig.defaultExpandedKeys"
  :show-dialog-tree.sync="showTree"
  :node-key="treeConfig.nodeKey"
  :loading="treeConfig.loading"
  @close="closeDeptDialog"
  @tree-select="selectTree">
  </dialog-select-tree>
 */
import Vue from 'vue'
export default {
  name: 'sidebarTree',
  props: {
    operateType: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      default: _ => []
    },
    isShowBtn: {
      type: Boolean,
      default: true
    },
    // 节点key 唯一
    nodeKey: {
      type: String,
      required: true
    },
    // 节点配置选项
    propsSetting: {
      type: Object,
      default: _ => {
        return {
          children: 'Childs',
          label: 'ZWS_MerchantName'
        }
      },
      validator: (obj) => {
        return obj.hasOwnProperty('label') && obj.hasOwnProperty('children')
      }
    },
    // 默认展开
    defaultExpandedKeys: {
      type: Array,
      default: _ => ['']
    },
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    className: {
      type: String
    },
    emptyText: {
      type: String,
      default: '暂无数据...'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  computed: {},
  data () {
    return {
      list: [],
      defaultProps: {}
    }
  },
  methods: {
    showMenuHandle (data) {
      Vue.set(data, 'show', true)
    },
    hideMenuHandle (data) {
      Vue.set(data, 'show', false)
    },
    handleNodeClick (data) {
      this.$emit('node-click', data)
    },
    insertTree (data, e) {
      e.stopPropagation()
      this.$emit('insert-tree', data)
    },
    deleteTree (node, data, e) {
      e.stopPropagation()
      this.$emit('delete-tree', data)
    },
    // 通过key设置某个节点的当前选中状态
    setCurrentKey (val) {
      this.$refs['tree'].setCurrentKey(val)
    }
  },
  watch: {
    data: {
      handler (val) {
        if (val instanceof Array) {
          this.list = val
        }
      }
    },
    propsSetting: {
      handler (val) {
        this.defaultProps = val
      },
      immediate: true
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>
<style lang='scss' scoped>
.custom-tree-node {
  width: 100%;
  height: 30px;
  line-height: 30px;
  .handle {
    float: right;
    padding-right: 10px;
  }
}
</style>
