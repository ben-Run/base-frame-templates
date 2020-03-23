<template>
  <div id="app">
    <transition name="rotate-fall">
       <router-view/>
    </transition>
  </div>
</template>

<script>
import { getToken, removeToken } from '@/utils/auth'

export default {
  name: 'app',
  data () {
    return {}
  },
  mounted () {
    window.addEventListener('beforeunload', _ => {
      sessionStorage.setItem('refresh', 'refresh')
    })
  },
  beforeCreate () {
    if (getToken()) {
      // 区分是刷新还是关闭页面
      if (!sessionStorage.getItem('refresh')) {
        removeToken()
      }
    }
  },
  beforeDestroy () {
    // vue 实列销毁清空cookie
    this.$store.dispatch('LogOut')
  }
}
</script>
<style lang="scss">
  .marginT20 {
    margin-top: 20px;
  }
  .marginT10 {
    margin-top: 5px;
  }
</style>
