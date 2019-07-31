<template>
 <article class="home-box">
   <p>hello，this is homeIndx page</p>
   <section class="svg-demo">
     <svg-icon class="smile"  name="smile" size="77"></svg-icon>
   </section>
 </article>
</template>

<script>
export default {
  name: 'home',
  props: {},
  created () {},
  mounted () {},
  components: {},
  computed: {},
  data () {
    return {}
  },
  methods: {},
  watch: {},
  filters: {}
}
</script>

<style lang='scss' scoped>
.home-box {
  display: block;
  p {
   font-size: toRem(37px);
   padding: 37px;
 }
 .svg-demo {
   width: 100%;
   height: 1rem;
 }
}

</style>
