<template>
<section class="card-header">
    <div class="header-left">
    <!-- <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/> -->
    <div class="hearder-logo">
      <img src="../../../assets/images/logo.png" alt="logo">
    </div>
      <span class="header-title">蚂蚁团队</span>
      <span class="sys-title">欢 迎 您 使 用， xxx 系 统</span>
    </div>
    <div class="header-right">
     <div class="btn-goHome">
      <router-link to="/">
            <svg-icon name="index-header"></svg-icon>
            <div class="goHomeStr">回到首页</div>
      </router-link>
    </div>
    <el-dropdown @command="handleCommand">
      <div class="el-dropdown-link">
         <svg-icon name="personal-center"></svg-icon>
         <span class="hearder-sysInfo">{{userInfo.name}}，你好！</span>
         <i class="el-icon-arrow-down el-icon--right"></i>
       </div>
        <el-dropdown-menu slot="dropdown" class="index-menu-tab">
         <el-dropdown-item command="chpw">修改密码</el-dropdown-item>
         <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
     </el-dropdown>
   </div>
   <!-- 边框 -->
     <div class="metal-parts-left" :style="{'left': isCollapse ? '60px' : '176px'}"></div>
      <div class="metal-parts-right"></div>
      <div class="metal-parts-bottom"></div>
      <div class="metal-parts-line" :style="{'width': isCollapse ? 'calc(100% - 992px)' : 'calc(100% - 1112px)'}"></div>
   <!-- pwd -->
   <base-dialog :title="`修改密码`" :modal-show.sync="dailogShow" :width="`550px`">
      <template slot="content">
        <el-form :model="pwForm" label-width="95px" :rules="rules" ref="pwForm">
          <el-form-item label="原密码" style="display: none;">
            <el-input v-model="pwForm.oldPw" type="password" placeholder="由6-10位字母和数字组成，不区分大小写"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPw1">
            <el-input v-model="pwForm.newPw1" type="password" placeholder="由6-10位字母和数字组成，不区分大小写"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="newPw2">
            <el-input v-model="pwForm.newPw2" type="password" placeholder="由6-10位字母和数字组成，不区分大小写"></el-input>
          </el-form-item>
        </el-form>
         <div class="dialog-footer">
         <el-button @click="hideDialog" size="small">取 消</el-button>
         <el-button type="primary" @click="handleSubmitForm" size="small" :loading="submitLoading">确 定</el-button>
      </div>
      </template>
    </base-dialog>
</section>
</template>

<script>
import { mapGetters } from 'vuex'
import SvgIcon from '@/components/Icons/SvgIcon.vue'
import encrypt from '@/utils/encrypt.js'
import {
  updateUserSys
} from '@/api/base/index'

export default {
  name: 'sysHeader',
  components: {
    // Hamburger,
    SvgIcon
  },
  computed: {
    ...mapGetters({
      sidebar: 'sidebar',
      userInfo: 'userInfo'
    }),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  data () {
    // 确认密码
    let validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (this.pwForm.newPw1 !== value) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dailogShow: false,
      submitLoading: false,
      pwForm: {
        oldPw: '',
        newPw1: '',
        newPw2: ''
      },
      rules: {
        oldPw: [
          { required: true, message: '旧密码不能为空!', trigger: 'blur' },
          { min: 6, max: 10, message: '密码在 6 到 10 个字符', trigger: 'blur' }
        ],
        newPw1: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '密码在 6 到 10 个字符', trigger: 'blur' }
        ],
        newPw2: [
          // { required: true, message: '确认新密码不能为空!', trigger: 'blur' },
          // { min: 6, max: 10, message: '密码在 6 到 10 个字符', trigger: 'blur' },
          { validator: validatePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    hideDialog () {
      this.pwForm.oldPw = ''
      this.pwForm.newPw1 = ''
      this.pwForm.newPw2 = ''
      this.dailogShow = !this.dailogShow
    },
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    async handleCommand (command) {
      if (command === 'chpw') {
        this.dailogShow = !this.dailogShow
      } else if (command === 'logout') {
        await this.$store.dispatch('LogOut')
        this.$router.replace('/login')
      }
    },
    handleSubmitForm () {
      this.$refs['pwForm'].validate((valid) => {
        if (valid) {
          this.changePw()
        } else {
          return false
        }
      })
    },
    async changePw () {
      try {
        // let oldPw = this.pwForm.oldPw
        const newPw1 = this.pwForm.newPw1
        const params = {
          id: this.userInfo.id,
          pwd: encrypt.EncryptBase64(newPw1),
          name: this.userInfo.name,
          status: this.userInfo.status,
          type: this.userInfo.type
        }
        const { code, msg } = await updateUserSys(params)
        if (code === 200) {
          this.$message({
            type: 'success',
            message: '密码保存成功，稍后系统跳到登录页重新登录!'
          })
          this.dailogShow = false
          await this.$store.dispatch('LogOut')
          this.$router.replace('/login')
        } else {
          this.$message({
            type: 'error',
            message: `密码保存失败!，${msg}`
          })
        }
      } catch (e) {
      } finally {
        this.submitLoading = false
      }
    }
  },
  watch: {},
  filters: {},
  created () {},
  mounted () {}
}
</script>
<style lang='scss' scoped>
@import '../../../styles/mixin';
.sys-title {
    margin-left: 27px;
    font-size: 22px;
    @include color($--ui-color-primary);
 }
 .header-title {
    @include color($--ui-font-content);
   font-size: 18px;
   margin-left: 7px;
 }
.card-header {
  position: relative;
  width: 100%;
  height: 40px;
  padding: 10px 0;
  display: flex;
  box-shadow: -2px 5px 11px 1px rgba(50, 95, 155, 0.1);
  // background: url(/staticImages/index/header-top.png) no-repeat top left;
    .header-left {
      width: 60%;
      display: flex;
      align-items: center;
      padding-left: 20px;
    }
    .header-right {
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 16px;
      padding-right: 90px;
      .hearder-sysInfo {
        @include color($--ui-color-primary);
      }
    }
}
.hearder-logo {
  width: 30px;
  margin-left: 17px;
  img {
    width: 100%;
  }
}
.svg-ico {
  width: 26px;
  height: 26px;
}
.el-dropdown {
  font-size: 16px;
  .el-dropdown-link {
    height: 100%;
    display: flex;
    align-items: center;
  }
  /deep/ .svg-icon {
  width: 26px;
  height: 26px;
  }
  span {
    margin: 0 5px 0 10px;
  }
}
.btn-goHome {
  margin: 0 30px 0 0;
  font-size: 16px;
  a {
     display: flex;
     align-items: center;
     .goHomeStr {
       margin-left: 10px;
     }
  }
  /deep/ .svg-icon {
  width: 26px;
  height: 26px;
  }
}
// 边框
.metal-parts-left{
  position: absolute;
  left: 176px;
  bottom: -7px;
  width: 480px;
  height: 23px;
  transition: all 0.4s;
  background-image: url('/staticImages/index/header-left.png');
  z-index: 100;
}

.metal-parts-bottom{
  position: absolute;
  right: 0;
  bottom: -7px;
  width: 456px;
  height: 20px;
  background-image: url('/staticImages/index/header-right.png');
  background-position: 456px 20px;
  z-index: 100;
}

.metal-parts-right{
  position: absolute;
  right: 0;
  top: 0;
  width: 56px;
  height: 66px;
  background-image: url('/staticImages/index/header-right.png');
  background-position: 56px 0px;
  z-index: 100;
}

.metal-parts-line{
  position: absolute;
  right: 456px;
  bottom: -7px;
  height: 8px;
  width: calc(100% - 1112px);
  transition: all 0.4s;
  background-image: url('/staticImages/index/header-border.png');
  z-index: 100;
}
.svg-icon--personal-center {
      color: #409EFF;
}
</style>
