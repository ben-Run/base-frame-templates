<template>
  <el-dialog
    class="loading-dialog"
    :title="title" 
    :width="width"
    :fullscreen="fullscreen"
    :show-close="false"
    :close-on-click-modal="false"
    :append-to-body="true"
    :lock-scroll="true"
    :visible.sync="visible">
    <div class="loading-dialog-body">
      <p class="loading-dialog-spinner">
        <i :class="spinner" class="spinner"></i>
      </p>
      <p class="loading-dialog-text">{{loadingText}}</p>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'loading-dialog',
    props: {
      // 标题
      title: String,
      // 宽度
      width: {
        type: String,
        default: '50%'
      },
      // 加载文本
      loadingText: {
        type: String,
        default: () => ''
      },
      // 加载图标
      spinner: {
        type: String,
        default: () => 'el-icon-loading'
      },
      // 显示状态
      visible: {
        type: Boolean,
        default: false
      },
      // 是否全屏
      fullscreen: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .loading-dialog /deep/ .el-dialog {
    margin-top: 0!important;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .loading-dialog-body {
    text-align: center;
  }
  
  i.spinner {
    font-size: 30px;
  }
</style>