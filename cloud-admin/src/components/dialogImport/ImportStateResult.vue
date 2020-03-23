<template>
<!-- :close-on-click-modal="status === 1" -->
  <el-dialog
  class="middle-dialog"
    :width="width"
    :title="title"
    :show-close="status === 1"
    :close-on-click-modal='false'
    :close-on-press-escape="status === 1"
    :visible.sync="dialogVisible"
    @close="handleClose"
    append-to-body>
    <div v-if="status === 0" class="text-center">
      <i class="el-icon-loading"></i>
      <p>{{loadingText}}</p>
    </div>
    <div v-else class="report text-center">
      <el-row :gutter="15">
        <el-col :span="8" v-for="(key, index) in keylist" :key="index">
          <strong>{{ textList[index] }}</strong>
          <p>{{ resultData[key] || 0 }}</p>
        </el-col>
      </el-row>
      <div v-if="showConfirmButton" slot="footer" class="footer">
        <el-button type="primary" @click="onSubmit">{{confirmText}}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
// 导入结果
export default {
  name: 'import-state-result',
  props: {
    // 宽度
    width: {
      type: String,
      default: '50%'
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 文本列表
    textList: {
      type: Array,
      default: () => ['导入行数', '成功', '失败']
    },
    // 加载提示文本
    loadingText: {
      type: String,
      default: ''
    },
    // 状态，0表示加载状态，其他表示显示导入结果状态
    status: {
      type: Number,
      default: 0
    },
    // 导入结果数据
    resultData: {
      type: Object,
      default: () => ({})
    },
    // 显示确认按钮-一般用于错误报告
    showConfirmButton: {
      type: Boolean,
      default: false
    },
    // 确认按钮文本
    confirmText: {
      type: String,
      default: '确认'
    }
  },
  data () {
    return {
      dialogVisible: false,
      keylist: ['totalRow', 'successRow', 'failRow']
    }
  },
  methods: {
    show () {
      this.dialogVisible = true
    },
    close () {
      this.dialogVisible = false
    },
    onSubmit () {
      if (!this.showConfirmButton) return
      // 确认按钮，执行的回调函数
      this.$emit('onConfirm')
    },
    handleClose () {
      this.$emit('on-close')
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/mixin.scss';
  .text-center {
    text-align:center
  }
  .middle-dialog .footer {
    margin-top:20px;
    background-color: initial;
  }
  .report p {
    margin-bottom:0;
  }
  .el-icon-loading {
    font-size: 30px;
  }
  .middle-dialog /deep/ .el-dialog {
    top:50%;
    margin-top:0!important;
    transform: translateY(-50%);
  }
</style>
