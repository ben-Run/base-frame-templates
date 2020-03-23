<template>
 <div :class="classObj" class="index-page">
   <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
   <side-header></side-header>
   <div class="main-container">
     <div class="metal-parts-menu" :style="{'left': isCollapse ? '60px' : '176px'}"></div>
     <side-menu ></side-menu>
     <app-main></app-main>
   </div>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sideMenu from '@/views/layOut/SideMenu/Index.vue'
import sideHeader from '@/views/layOut/SysHeader/Index.vue'
import appMain from '@/views/layOut/AppMain/Index.vue'
export default {
  name: 'layOutIndex',
  props: {},
  components: {
    sideMenu,
    sideHeader,
    appMain
  },
  data () {
    return {}
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    device () {
      return this.$store.state.app.device
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    ...mapGetters({
      sidebar: 'sidebar'
    }),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  watch: {},
  filters: {},
  created () {},
  mounted () {
  }
}
</script>

<style lang='scss' scoped>
@import "src/styles/mixin.scss";
.main-container {
  position: relative;
  width: 100%;
  display: flex;
  overflow: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  @include bg-color($--ui-color-menu-open-bg);
  margin-top: 6px;
  height: calc(100vh - 60px);
  background-image: url("/staticImages/index/header-top.png");
  background-position: 0 0;
  background-repeat: no-repeat;
}
.index-page {
  min-width: 1360px;
  widows: 100%;
  position: relative;
  @include bg-color();
  display: flex;
  flex: 1;
  flex-direction: column;
}
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  // 边框
.metal-parts-menu {
  position: absolute;
  left: 176px;
  top: -4px;
  width: 14px;
  height: 120px;
  transition: all 0.4s;
  background-image: url(/staticImages/index/header-left.png);
  background-position: 0px -15px;
  z-index: 99;
}
</style>
