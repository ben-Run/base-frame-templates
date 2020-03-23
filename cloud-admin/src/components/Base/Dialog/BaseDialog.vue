<template>
  <el-dialog :title="title"
             :visible.sync="visibleModal"
             :close-on-click-modal='closeClickModal'
             :class="className"
             :custom-class="customClass"
             :width="width"
             :top="top"
             :append-to-body="appendToBody"
             @open="handleOpen"
             @close="handleClose"
             :before-close="onCancel"
             v-loading="loading"
             :element-loading-text="loadingText"
             :close-on-press-escape="closeOnPressEscape"
             :show-close="showClose"
             :center="center"
             v-dialogDrag
             class="base-dialog">
    <slot name="title"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>
    <slot></slot>
  </el-dialog>
</template>

<script>
/**
 * 弹框通用组件（created by longbensong in 2019/2/13)
 * @param {String} title Dialog 的标题 可选填
 * @param {Boolean} modalShow visible属性 是否显示弹框 必填
 * @param {String} className 样式名称 可选填
 * @param {Boolean} appendToBody Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true 默认值是false 可选填
 * @param {String} width 弹框宽度 默认值是594px 可选填
 * @param {String} top Dialog CSS 中的 margin-top 值 默认值是15vh  可选填
 * @param {Boolean} loading loading 默认值是false  可选填
 * @param {String} loadingText loading的文字 当loading为true的时候可填写  可选填
 * @param {Boolean} closeOnPressEscape 是否可以通过按下 ESC 关闭 Dialog 可选填
 * @param {Boolean} center 是否对头部和底部采用居中布局 默认值false  可选填
 * @param {Function} handleClose 当前关闭弹框的回调函数
 *
 *示例：
* <base-dialog :title="标题" :modal-show.sync="showScaleModal" :className="`样式名称`"><template slot="content"></template></base-dialog>
 */
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    modalShow: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '600px'
    },
    top: {
      type: String,
      default: '15vh'
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: ''
    },
    center: {
      type: Boolean,
      default: false
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String,
      default: ''
    },
    closeClickModal: {
      type: Boolean,
      default: false
    }
  },
  // 这个地方需要监听modalShow的变化,如果modalShow发生变化后,触发父组件对modal-show的更新
  watch: {
    modalShow: function (val) {
      this.visibleModal = val
    }
  },
  data () {
    return {
      visibleModal: this.modalShow
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:modalShow', false)
      this.$emit('close')
    },
    onCancel () {
      this.$emit('update:modalShow', false)
      this.$emit('beforeClose')
    },
    handleOpen () {
      this.$emit('open')
    }
  }
}
</script>
<style lang="scss" scoped>
.base-dialog  /deep/ .el-dialog__body {
    min-height: 200px;
    position: relative
 }
</style>
