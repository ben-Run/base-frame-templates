
<template>
  <section class="app-main">
    <tags-view />
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" class="page-main__view"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>
<script>
import TagsView  from '../TagsView/Index'

export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return this.$store.state.cachedViews
    },
    key () {
      return this.$route.fullPath + new Date().getTime()
    }
  },
  components: {
    TagsView
  }
}
</script>
<style scoped lang="scss">
@import '../../../styles/mixin';

.app-main {
  min-height: calc(100vh - 60px);
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 12px;
  @include bg-color($--ui-color-main-bg);
  & > .page-content {
    margin: 0px 10px 15px 10px;
  }
}
.page-main__view {
  min-height: calc(100% - 60px);
}
</style>
