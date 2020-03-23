<template>
<div class="logo">
    <transition name="fade">
      <span v-if="isCollapse" class="logo_title is-bold " key="0" :class="{'is-text':!type,'is-img':type}">
        <template v-if="type">
          <svg-icon name="index-nav"></svg-icon>
        </template>
        <template v-else>
        </template>
      </span>
    </transition>
    <transition-group name="fade">
      <template v-if="!isCollapse">
        <span class="logo_title is-bold" key="1">this is logo</span>
        <!-- <span class="logo_subtitle" key="2">33333</span> -->
      </template>
    </transition-group>
  </div>
</template>

<script>
import SvgIcon from '@/components/Icons/SvgIcon.vue'
export default {
  name: 'logo',
  props: ['isCollapse'],
  components: {
    SvgIcon
  },
  data () {
    return {}
  },
  methods: {},
  computed: {
    // ...mapGetters(['website']),
    type: function (val) {
      return true
    }
  },
  watch: {},
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style scoped lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.logo {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  // width: 230px;
  height: 60px;
  line-height: 60px;
  background:#f7f7f7;;
  color: #fdfdfd;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  box-sizing: border-box;
}
.logo_title {
  padding: 0 5px 0 0;
  color: #42b983;
  font-size: 20px;
  &.is-bold {
    font-weight: 700;
  }
}
.is-text {
  position: absolute;
  top: 0;
  // left: 20px;
}
.is-img {
  position: absolute;
  top: 10px;
  left: 10px;
}
.logo_subtitle {
  font-size: 16px;
  padding-top: 5px;
}
</style>
