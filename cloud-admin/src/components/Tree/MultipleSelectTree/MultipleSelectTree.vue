
<template>
 <article class="dialog-select-tree">
     <el-tree slot="content"
      show-checkbox
      v-loading="loading"
      :empty-text="emptyText"
      :data="data"
      :props="propsSetting"
      :expand-on-click-node="expandOnClickNode"
      :node-key="nodeKey"
      :default-expanded-keys="defaultExpandedKeys"
      :draggable="false"
      ref="selectTree">
    </el-tree>
 </article>
</template>
<script>
/**
 * 弹框通用树形选择组件（created by longbensong in 20190323)
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
export default {
  name: 'multipleSelectTree',
  props: {
    dialogTitle: {
      type: String,
      default: '请选择'
    },
    showDialogTree: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: _ => []
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
          label: 'ZWS_DeptName'
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
    // 击节点的时候展开或者收缩节点
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
    }
  },
  components: {},
  computed: {},
  data () {
    return {
      visibleModal: this.showDialogTree,
      lastCheckKey: ''
    }
  },
  methods: {
    async init () {
      // await this.$store.dispatch('getDeptList')
    },
    // 确定
    handleMakeSure () {
      const node = this.$refs['selectTree'].getCheckedNodes()
      if (node.length === 0) {
        this.$message.warning('请选择数据！')
        return
      }
      if (node.length !== 1) {
        this.$message.warning('获取数据失败！')
        return
      }
      this.$emit('tree-select', node)
    },
    // 关闭
    handleClose () {
      this.$emit('close', false)
      this.lastCheckKey = ''
      this.$refs['selectTree'].setCheckedKeys([])
    },
    handleUpdate (val) {
      this.$emit('update:showDialogTree', false)
      this.lastCheckKey = ''
      this.$refs['selectTree'].setCheckedKeys([])
    },
    // 取消
    handleCancel () {
      this.$emit('update:showDialogTree', false)
      this.$emit('close')
      this.lastCheckKey = ''
      this.$refs['selectTree'].setCheckedKeys([])
    },
    getCheckedKeys () {
      return this.$refs.selectTree.getCheckedKeys()
    }
  },
  // 这个地方需要监听showDialogTree的变化,通知父组件对modal-show的更新
  // 多层组件之间传递，这种sync 存在断层所以需要监听变化然后通知父组件
  watch: {
    showDialogTree: function (val) {
      this.visibleModal = val
    }
  },
  filters: {},
  created () {
    this.init()
  },
  mounted () {}
}
</script>

<style lang='scss' scoped>
</style>
