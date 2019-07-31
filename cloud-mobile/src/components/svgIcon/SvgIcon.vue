<template>
  <svg :class="['icon', iconClass]" aria-hidden="true" :style="{'width': size + 'px', 'height': size + 'px'}">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
/*
  * svg图标通用组件
  *
  * @param {String} name 图标名字
  * @param {Number, String} size 尺寸大小（用于设置图标宽高，一般为16, 32, 64）
  * @param {String} iconClass 自定义的className
  *
  * 示例：
  * <svg-icon class="select" name="ico-select"></svg-icon> -->
  * <svg-icon class="select" :class="{isSelect: it.isSelect}" name="ico-select" size="27"></svg-icon> -->
  *
  */
export default {
  name: 'svgIcon',
  props: {
    // 图标id
    name: {
      type: String,
      required: true
    },
    // 图标尺寸（一般为16, 32, 64）
    size: {
      type: [Number, String],
      required: false,
      default: 16
    },
    // 自定义className
    iconClass: {
      type: String,
      required: false
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.name}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon {
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
