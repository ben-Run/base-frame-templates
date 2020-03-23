<template>
 <article class="empty-wrapper">
   <section class="empty-wrapper--img">
     <img :src="imgSrc.img" v-if="imgSrc.img"/>
   </section>
   <slot></slot>
 </article>
</template>

<script>

export default {
  name: 'emptyData',
  components: {},
  props: {
    imgName: {
      type: String,
      default: 'no-data'
    }
  },
  data () {
    return {
      imgSrc: {
        img: require(`./Images/${this.imgName}.png`) || ''
      }
    }
  },
  computed: {
  },
  watch: {},
  created () {},
  mounted () {
  },
  methods: {},
  filters: {}
}
</script>

<style lang='scss' scoped>
.empty-wrapper {
   width: 100;
   opacity: 0;
   animation: fadeIn 1s ease-in forwards;
   &--img {
     margin-bottom: 20px;
     text-align: center;
     & img {
       width: 35%;
     }
   }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    width: 0;
  }

  to {
    opacity: 1;
    width: 100%;
  }
}
</style>
