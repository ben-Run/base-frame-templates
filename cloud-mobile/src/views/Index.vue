<template>
 <article class="content-box">
   <mt-header :title="title" style="position: fixed;top: 0;left: 0;width: 100%;z-index: 99;">
     <router-link to="" slot="left" >
       <mt-button icon="back" @click="$router.go(-1)"></mt-button>
     </router-link>
   </mt-header>
   <router-view style="margin-top: 44px;">
   </router-view>
 </article>
</template>
 TODO:后面在拆分组件
<script>
export default {
  name: 'index',
  props: {},
  created () {},
  mounted () {},
  components: {},
  computed: {},
  data () {
    return {
      title: ''
    }
  },
  methods: {},
  watch: {},
  filters: {}
}
</script>

<style lang='scss' scoped>

</style>
