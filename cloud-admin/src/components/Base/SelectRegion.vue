<template>
  <el-row :gutter="6" class="select-region">
    <!-- 省 -->
    <el-col :span="8">
      <el-select
        v-model="searchForm.provId"
        placeholder="全部"
        @change="handleSelectProvince"
        @clear="clearProvince"
        clearable
      >
        <el-option
          v-for="{provId, provName} in listProvince"
          :label="provName"
          :value="provId"
          :key="provId"
        ></el-option>
      </el-select>
    </el-col>

    <!-- 市 -->
    <el-col :span="8">
      <el-select
        v-model="searchForm.cityId"
        placeholder="全部"
        @change="handleSelectCity"
        @clear="clearCity"
        clearable
      >
        <el-option
          v-for="{cityName, cityId} in listCity"
          :label="cityName"
          :value="cityId"
          :key="cityId"
        ></el-option>
      </el-select>
    </el-col>

    <!-- 区 -->
    <el-col :span="8">
      <el-select
        v-model="searchForm.countyId"
        placeholder="全部"
        clearable
      >
        <el-option
          v-for="{countyId, countyName} in listCounty"
          :label="countyName"
          :value="countyId"
          :key="countyId"
        ></el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
/*
  * 省市区的级联组件（created by longbensong in 2019/3/13)
  *
  * 示例：
  * <select-region :searchForm="searchForm"></select-region>
  *
  * @param {Object} searchForm 查询表单
  * 示例：
  * searchForm: {
  *  provId: ''
  *  cityId: '',
  *  countyId: ''
  * }
  *
  */
import { mapGetters } from 'vuex'
export default {
  name: 'SelectRegion',
  props: {
    // 查询表单
    searchForm: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      listProvince: [],
      listCity: [],
      listCounty: [],
      clearStatus: false
    }
  },
  computed: {
    ...mapGetters({
      proviceList: 'proviceList',
      cityList: 'cityList',
      countyList: 'countyList'
    })
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      // 默认查询所有省份
      await this.selectProvice()
      // 如果省份已有默认选中值，则查询对应城市
      if (this.searchForm.provId) {
        this.selectCity()
      }
    },
    // 查询省份
    async selectProvice () {
      await this.$store.dispatch('selectProvice', {})
      this.listProvince = this.proviceList.listProvince
      this.searchForm.cityId = ''
      this.searchForm.countyId = ''
    },
    // 查询城市
    async selectCity () {
      if (this.clearStatus) return
      let params = {
        provId: this.searchForm.provId
      }
      await this.$store.dispatch('selectCity', params)
      this.listCity = this.cityList.listCity
      this.searchForm.cityId = ''
      this.listCounty = []
      this.searchForm.countyId = ''
    },
    // 查询区县
    async selectCounty () {
      if (this.clearStatus) return
      const params = {
        cityId: this.searchForm.cityId
      }
      await this.$store.dispatch('selectCounty', params)
      this.listCounty = this.countyList.listCounty
      this.searchForm.countyId = ''
    },
    // 省份选择框change回调事件
    handleSelectProvince () {
      this.clearStatus = false
      this.$nextTick(() => {
        this.selectCity()
      })
    },
    // 城市选择框change回调事件
    handleSelectCity () {
      this.clearStatus = false
      this.$nextTick(() => {
        this.selectCounty()
      })
    },
    // 清空省份
    clearProvince () {
      this.searchForm.provId = ''
      this.searchForm.cityId = ''
      this.searchForm.countyId = ''
      this.listCity = []
      this.listCounty = []
      this.clearStatus = true
    },
    // 清空城市
    clearCity () {
      this.searchForm.cityId = ''
      this.searchForm.countyId = ''
      this.listCounty = []
      this.clearStatus = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .select-region{
    width: 557px;
    margin: 0px !important;
  }
</style>
