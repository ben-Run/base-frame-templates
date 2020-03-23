<template>
    <div class="el-aside index-menu">
      <!-- <logo :is-collapse="isCollapse"></logo> -->
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
      <el-menu
      :show-timeout="200"
      :unique-opened="false"
      :collapse="isCollapse"
      class="menu-tree"
      :class="{'hideSide': !sidebar.opened}"
      mode="vertical">
      <el-submenu index="1">
        <template slot="title">
           <svg-icon name="baseData"></svg-icon>
          <span slot="title">课题管理</span>
        </template>
        <el-menu-item index="1-1" @click="gotoProjecInput">课题录入</el-menu-item>
        <el-menu-item index="1-2" >课题列表</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
           <svg-icon name="financeReport"></svg-icon>
          <span slot="title">财务数据汇总</span>
        </template>
        <el-menu-item index="2-1" >课题汇总</el-menu-item>
      </el-submenu>

     <el-submenu index="3">
        <template slot="title">
           <svg-icon name="financeReport"></svg-icon>
          <span slot="title">xxx</span>
        </template>
        <el-menu-item index="3-1" >xxx</el-menu-item>
      </el-submenu>
    </el-menu>
    </div>
</template>>

<script>
import { mapGetters } from 'vuex'
import SvgIcon from '@/components/Icons/SvgIcon.vue'
import Hamburger from '@/views/components/Hamburger/Index'
// import logo from './Logo'
export default {
  name: 'sysMenu',
  props: {},
  computed: {
    ...mapGetters({
      sidebar: 'sidebar',
      userInfo: 'userInfo'
    }),
    isAdmin () {
      // 管理员 1/普通用户 2/财务用户 3
      return this.userInfo.type === 1 || this.userInfo.type === 3
    },
    isCollapse () {
      return !this.sidebar.opened
    },
    onRoutes () {
      console.log(this.$route.path) // eg ： 输出 /log
      return this.$route.path.replace('/', '')
    }
  },
  components: {
    // logo,
    Hamburger,
    SvgIcon
  },
  data () {
    return {}
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    // 课题录入
    gotoProjecInput () {
      // this.$router.push({ path: '/project' })
    }
  },
  watch: {},
  filters: {},
  created () {
    // console.log(logo)
  },
  mounted () {}
}
</script>

<style lang='scss' scoped>
@import '../../../styles/mixin';
.hamburger-container {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #253342;
  text-align: center;
  background: transparent;
}
.web-card-aside {
  min-height:calc(100vh - 60px);
  height: 100%;
}
.menu-tree{
  & /deep/ .el-submenu__title .svg-icon {
    margin-right: 8px;
  }
  // @include bg-color();
  background-color: #0e1a31;
  /deep/ &.el-menu{
    border-right: none;
  }
  /deep/ .el-submenu {
    line-height: 40px;
    &.is-opened{
      .el-menu{
        @include bg-color($--ui-color-menu-open-bg);
      }
    }
    .el-submenu__title{
      &:hover, &:focus{
        // @include bg-color();
        background-color:#0e1a31;
      }
      i{
        @include color(#909399);
      }
    }
  }
  /deep/ .el-submenu__title, /deep/ .el-submenu .el-menu-item{
    // @include color($--ui-font-content);
    color: #fff;
    height: 40px;
    line-height: 40px;
  }
  /deep/ .el-menu-item{
    width: 180px;
    min-width: 180px;
    &:hover{
      // @include bg-color($--ui-color-menu-open-bg);
      color:#409EFF;
      background-color: white;
      a{
        // @include color($--ui-color-primary);
      }
    }

    &.is-active{
      position: relative;
      &::before{
        position: absolute;
        top: 3px;
        left: 0;
        display: block;
        content: '';
        width: 9px;
        height: 34px;
       // background: url('/staticImages/index/menu-active.png') no-repeat;
      }
      background: linear-gradient(to right, rgba(17, 208, 226, .3) , transparent);

      a{
        @include color($--ui-color-primary);
      }
    }

    a{
      @include color($--ui-font-content);
    }
  }
}
.menu-tree:not(.el-menu--collapse) {
  width: 180px;
  // padding-bottom: 66px; // .support的高度
  box-sizing: border-box;
  min-height: calc(100vh - 102px);
}
.hideSide /deep/ .el-menu-item {
    width: initial;
    min-width: initial;
}
.index-menu {
  position: relative;
  overflow-y: scroll;
}
</style>
