
<template>
<section class="card-home">
  <p class="welcome animated zoomIn">欢迎使用, xxx</p>
</section>
</template>

<script>
export default {
  name: 'homeIndex',
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang='scss' scoped>
.card-home {
  text-align: center;
  background-color:#f0f0f0;
  background-size: contain;
}
.welcome {
  font-size: 20px;
   @include color();
  letter-spacing: 7px;
  padding-top: 30vh;
}
.welcome-desc {
  font-size: 27px;
  color: white;
  font-weight: bold;
  letter-spacing: 17px;
}
</style>
