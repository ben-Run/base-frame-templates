<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="el-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="el-loading-spinner">
        <svg v-if="!spinner" viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="circle" class="g-circles g-circles--v3">
            <circle id="12" transform="translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) " cx="35"
                    cy="16.6987298" r="6"></circle>
            <circle id="11" transform="translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) " cx="16.6987298"
                    cy="35" r="5.8"></circle>
            <circle id="10" transform="translate(10, 60) rotate(-90) translate(-10, -60) " cx="10" cy="60"
                    r="5.6"></circle>
            <circle id="9" transform="translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) " cx="16.6987298"
                    cy="85" r="5.4"></circle>
            <circle id="8" transform="translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) " cx="35"
                    cy="103.30127" r="5.2"></circle>
            <circle id="7" cx="60" cy="110" r="5"></circle>
            <circle id="6" transform="translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) " cx="85"
                    cy="103.30127" r="4.8"></circle>
            <circle id="5" transform="translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) " cx="103.30127"
                    cy="85" r="4.6"></circle>
            <circle id="4" transform="translate(110, 60) rotate(-90) translate(-110, -60) " cx="110" cy="60"
                    r="4.4"></circle>
            <circle id="3" transform="translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) "
                    cx="103.30127" cy="35" r="4.2"></circle>
            <circle id="2" transform="translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) " cx="85"
                    cy="16.6987298" r="4"></circle>
            <circle id="1" cx="60" cy="10" r="3.8"></circle>
          </g>
        </svg>
        <i v-else :class="spinner"></i>
        <p v-if="text" class="el-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      text: null,
      spinner: null,
      background: null,
      fullscreen: true,
      visible: false,
      customClass: ''
    }
  },

  methods: {
    handleAfterLeave () {
      this.$emit('after-leave')
    },
    setText (text) {
      this.text = text
    }
  }
}
</script>
<style lang="scss">
  .el-loading-spinner svg {
    height: 60px;
    width: 60px;
    overflow: visible;
    /*   border: 1px solid red; */
  }
  .el-loading-spinner .el-loading-text{
    margin-top: 10px;
  }
  .g-circles {
    transform: scale(1) translate(7px, 7px);
  }

  circle {
    fill: dodgerblue;
    fill-opacity: 0;
    animation: opacity 1.2s linear infinite;
  }

  circle:nth-child(12n + 1) {
    animation-delay: -0.1s;
  }

  circle:nth-child(12n + 2) {
    animation-delay: -0.2s;
  }

  circle:nth-child(12n + 3) {
    animation-delay: -0.3s;
  }

  circle:nth-child(12n + 4) {
    animation-delay: -0.4s;
  }

  circle:nth-child(12n + 5) {
    animation-delay: -0.5s;
  }

  circle:nth-child(12n + 6) {
    animation-delay: -0.6s;
  }

  circle:nth-child(12n + 7) {
    animation-delay: -0.7s;
  }

  circle:nth-child(12n + 8) {
    animation-delay: -0.8s;
  }

  circle:nth-child(12n + 9) {
    animation-delay: -0.9s;
  }

  circle:nth-child(12n + 10) {
    animation-delay: -1s;
  }

  circle:nth-child(12n + 11) {
    animation-delay: -1.1s;
  }

  circle:nth-child(12n + 12) {
    animation-delay: -1.2s;
  }

  .g-circles--v3 circle {
    fill-opacity: 1;
    opacity: 1;
    animation-name: elopacity, elcolorss;
  }
@keyframes elopacity {
   3% {
      fill-opacity: 1;
      opacity: 1;
    }

    75% {
      fill-opacity: 0;
      opacity: 0;
    }
}
@keyframes elcolorss {
 0% {
      fill: #0e85e9;
    }
    75% {
      fill: #03eeff;
    }
}
</style>
