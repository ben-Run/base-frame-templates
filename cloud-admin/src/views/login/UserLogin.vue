<template>
<article class="long-box">
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="5px">
    <!-- <el-form-item prop="UserName" label="密码"> -->
      <el-input size="small"
      prefix-icon="el-icon-user-solid"
      class="input-ico"
      @keyup.enter.native="handleLogin" v-model="loginForm.UserName" auto-complete="off" placeholder="请输入用户名">
        <!-- <i class="el-icon-user" slot="suffix" @click="showPassword"></i> -->
        <!-- <svg-icon name="user" slot="prefix" class="icon-yonghu"></svg-icon> -->
      </el-input>

    <!-- </el-form-item> -->
    <!-- <el-form-item prop="Password" label="账号"> -->
      <el-input size="small"
      prefix-icon="el-icon-user-solid"
      class="input-ico"
      @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.Password" auto-complete="off" placeholder="请输入密码">
        <!-- <i class="el-icon-view el-input__icon" suffix-icon="" @click="showPassword"></i> -->
        <!-- <svg-icon name="pwd" slot="prefix"  class="icon-mima"></svg-icon> -->
      </el-input>

    <!-- </el-form-item> -->
    </el-form>
    <el-checkbox v-model="checked" style="margin-top:10px;">记住账号</el-checkbox>
    <div class="btn-log-box">
      <el-button type="primary"
      size="small"
      @click.native.prevent="handleLogin"
      class="login-submit"
      :loading="loading">登录
      </el-button>
    </div>
</article>

</template>

<script>
// import SvgIcon from '@/components/Icons/SvgIcon.vue'
import encrypt from '@/utils/encrypt.js'

export default {
  name: 'userlogin',
  components: {
    // SvgIcon
  },
  data () {
    // const validateCode = (rule, value, callback) => {
    //   if (this.code.value !== value) {
    //     this.loginForm.code = ''
    //     this.refreshCode()
    //     callback(new Error('请输入正确的验证码'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        UserName: '',
        Password: ''
      },
      loading: false,
      checked: false,
      code: {
        src: '',
        value: '',
        len: 4,
        type: 'text'
      },
      loginRules: {
        // UserName: [
        //   { required: true, trigger: 'blur', validator: validateUsername }
        // ],
        // Password: [
        //   { required: true, message: '请输入密码', trigger: 'blur' },
        //   { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        // ]
        // code: [
        //   { required: true, message: '请输入验证码', trigger: 'blur' },
        //   { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
        //   { required: true, trigger: 'blur', validator: validateCode }
        // ]
      },
      passwordType: 'password'
    }
  },
  created () {
  },
  mounted () {},
  computed: {
  },
  props: [],
  methods: {
    showPassword () {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    async handleLogin () {
      // this.$refs.loginForm.validate(async (valid) => {
      //   if (valid) {
      //     this.loading = true
      //     let params = { ...this.loginForm }
      //     params.Password = encrypt.EncryptBase64(params.Password)
      //     try {
      //       const { code, msg } = await this.$store.dispatch('Login', params)
      //       if (code === 200) {
      //         this.$router.push({ path: '/' })
      //       } else {
      //         this.$message.error(msg)
      //       }
      //     } catch (e) {
      //       this.$message.error(`登录失败，${e}`)
      //     } finally {
      //       this.loading = false
      //     }
      //   }
      // })
      try {
        let params = { ...this.loginForm }
        if (!params.UserName.trim()) {
          this.$message.error('请输入用户名')
          return
        }
        if (!params.Password.trim()) {
          this.$message.error('请输入密码')
          return
        }
        if (params.Password.trim().length < 6) {
          this.$message.error('密码长度最少为6位')
          return
        }
        params.Password = encrypt.EncryptBase64(params.Password)
        this.loading = true
        await this.$store.dispatch('Login', params)
        // const { code, msg } = await this.$store.dispatch('Login', params)
        // if (code === 200) {
        //   this.$router.push({ path: '/' })
        // } else {
        //   this.$message.error(msg)
        // }
        this.$router.push({ path: '/' })
      } catch (e) {
        this.$message.error(`登录失败，${e}`)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login-submit {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  border-radius: 28px;
  margin-left: 0!important;
  margin-right: 0!important;
  border: 1px solid #00e8fe;
  &::before,&::after {
    display: none;
  }
}
.login-form {
  margin: 7px 0;
  .el-form-item__content {
    width: 270px;
  }
  & /deep/ .el-button--primary:hover {
    background-color: transparent;
    opacity: 1;
  }
  & /deep/ .el-tabs__header {
    margin: 0;
  }
  & /deep/ .el-input--prefix .el-input__inner {
    padding-left: 40px;
  }
  & /deep/ .el-input__prefix{
    left: 10px;
  }
  & /deep/ .el-form-item.is-success .el-input__validateIcon {
    color: white;
  }
  .el-form-item {
    margin-bottom: 12px;
    margin-top: 22px;
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-form /deep/ .svg-icon {
  width: 16px;
  height: 16px;
  margin-top: 8px;
}
.login-form /deep/ .el-form-item__content {
  line-height: initial;
}
.login-form /deep/ .input-ico {
  margin: 10px 0;
  & /deep/ .el-input__icon {
    font-size: 18px;
    color:#00e8fe;
  }
}
</style>
