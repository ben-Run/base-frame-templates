<template>
  <div class="page-title">
    <span class="text"><slot></slot></span>
    <span class="handle"><slot name="handle"></slot></span>
  </div>
</template>

<script>
export default {
  name: 'page-title'
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
  .page-title {
    position: relative;
    height: 50px;
    border-bottom: 1px solid;
    padding-top: 5px;
    @include border-color($--ui-color-border);
    .handle {
      position: absolute;
      height: 50px;
      right: 0;
      top: 0;
      padding-right: 20px;
      line-height: 50px;
    }
    .text {
      display: inline-block;
      padding-left: 30px;
      line-height: 50px;
      color:#1d91f3;
      @include color($--ui-font-title);
    }
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 14px;
      width: 4px;
      height: 18px;
      margin-top: -7px;
      @include bg-color($--ui-color-primary)
    }
  }
</style>
