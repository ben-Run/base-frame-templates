<template>
<el-dialog
  :title="title"
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="true"
    @closed="onClosed">
    <slot></slot>
    <div v-if="this.$slots.tips" class="tips">
      <slot name="tips"></slot>
      <transition name="slide-fade">
        <div v-if="more">
          <slot name="more"></slot>
        </div>
        </transition>
      <div v-if="this.$slots.more" style="text-align: right;">
        <span role="button" class="btn--text" @click="onToggleMore">
          {{ more ? '收起' : '展开更多' }}<i :class="more ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
          </span>
        </div>
      </div>
    <slot name="footer" slot="footer"></slot>
    </el-dialog>
</template>
<script>
// 导入
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function,
      defalut: function () {}
    }
  },
  data () {
    return {
      more: false,
      dialogVisible: false
    }
  },
  watch: {
    visible: {
      handler (val) {
        this.dialogVisible = val
      },
      immediate: true
    }
  },
  methods: {
    onClosed () {
      this.more = false
      this.$emit('update:visible', false)
      this.$emit('closed')
    },
    onToggleMore () {
      this.more = !this.more
    }
  }
}
</script>

<style scoped lang="scss">
  .tips {
    display: block;
    width: 100%;
    margin-top: 30px;
    max-height: 330px;
    overflow-y: auto;
  }
  [role="button"].btn--text {
    color: #409eff;
    &:hover {
      cursor: pointer;
    }
  }
</style>
