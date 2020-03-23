<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
    <div class="login-header">
      <svg-icon name="arrowsRight" class="right-ico-header"></svg-icon>
      <span>欢迎登录{{systemName}}</span>
    </div>
    <div class="login-main-box">
      <vue-particles
        color="#00c1b8"
        :particleOpacity="0.7"
        :particlesNumber="40"
        shapeType="circle"
        :particleSize="4"
        linesColor="#00c1b8"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="1"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="false"
        class="logo-lz">
      </vue-particles>
      <!-- <div class="login-info text-white animated" :class="anmiationsTitleClass"></div> -->
      <div class="login-border animated" :class="anmiationsLoginBoxClass">
        <i class="corner corner1"></i>
        <i class="corner corner2"></i>
        <i class="corner corner3"></i>
        <i class="corner corner4"></i>
       <div class="login-main">
        <h4 class="login-title">用户登录</h4>
        <user-login></user-login>
        <!-- <el-tabs v-model="activeName">
          <el-tab-pane label="用户登录" name="userlogin">
            <user-login></user-login>
          </el-tab-pane>
        </el-tabs> -->
         <!-- <el-tab-pane label="短信验证码" name="code">
            <codeLogin></codeLogin>
          </el-tab-pane> -->
       </div>
     </div>
    </div>
    <footer class="footer">
      <p>©版权所有{{new Date().getFullYear()}} {{company}}</p>
    </footer>
  </div>
</template>
<script>
import userLogin from './UserLogin'
import SvgIcon from '@/components/Icons/SvgIcon.vue'
import { getRandom } from '@/utils/index'
import { systemName, company } from '@/api/base/constant'
// import codeLogin from './CodeLogin'

export default {
  name: 'login',
  components: {
    userLogin,
    SvgIcon
  },
  data () {
    return {
      company: company,
      systemName: systemName,
      activeName: 'userlogin',
      anmiations: ['bounceInDown', 'slideInDown', 'slideInUp', 'slideInLeft', 'slideInRight', 'zoomIn', 'fadeIn', 'fadeInDown', 'fadeInLeft', 'bounceInDown'],
      anmiationsTitleClass: [],
      anmiationsLoginBoxClass: [],
      getRandom: getRandom
    }
  },
  created () {
    this.anmiationsTitleClass.push(this.anmiations[this.getRandom(0, 10)])
    this.anmiationsLoginBoxClass.push(this.anmiations[this.getRandom(0, 10)])
  },
  mounted () {
  },
  props: [],
  methods: {}
}
</script>

<style lang="scss">
.login-container {
  & /deep/ .el-tabs__content,.el-tabs__nav-scroll {
     background-color: transparent;
  }
}
.footer {
  width: 100%;
  height: 40px;
  background-color: #01577c;
  line-height: 40px;
  font-size: 14px;
  letter-spacing: 1px;
  padding: 0;
  p {
    text-align: center;
    color:white;
    margin: 0;
    padding: 0;
  }
}
.login-container {
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  height: 100%;
  box-sizing: border-box;
  .login-main-box {
    position: relative;
    background-image: url("/staticImages/index/login-back.jpg");
    // background-size: cover;
    background-size: 100% 100%;
    width: 100%;
    height: calc(100vh - 90px);
    display: flex;
    justify-content: flex-end;
  }
}

.login-info {
  flex: 1;
  margin-top: 10%;
}
.login-info-title {
  font-size: 32px;
  text-align: center;
}
.login-info-item {
  font-size: 14px;
}
.login-border {
  position: relative;
  width: 300px;
  height: 280px;
  margin-right: 7%;
  margin-left: auto;
  margin-top: 7%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px 0px 30px;
  background-color: rgba(0, 246, 255, 0.1);
  border-radius: 6px;
}
.login-main {
  border-radius: 3px;
  box-sizing: border-box;
  background-color: transparent;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  margin: 0;
  padding: 0;
  color: #00e8fe;
  text-align: center;
  letter-spacing: 3px;
}
.login-header {
  height: 50px;
  background-color: #01577c;
  padding-left: 27px;
  color: white;
  line-height: 50px;
  font-size: 14px;
  display: flex;
  align-items: center;
  span {
    letter-spacing: 1px;
  }
}
.login-header /deep/ .svg-icon {
  width: 20px;
  height: 20px;
}
.right-ico-header {
  margin-right: 5px;
}
.corner {
    position: absolute;
    width: 20px;
    height: 20px;
    background: url("/staticImages/index/corner.png") no-repeat;
    &.corner1 {
      top: 0;
      left: 0;
    }
    &.corner2 {
      top: 0;
      right: 0;
      transform:rotate(90deg);
    }
    &.corner3 {
      bottom: 0;
      left: 0;
      transform:rotate(270deg);
    }
    &.corner4 {
      bottom: 0;
      right: 0;
      transform:rotate(180deg);
  }
}
.logo-lz {
  position: absolute;
  top:10px;
  bottom: 0;
  width: 100%;
}
</style>
