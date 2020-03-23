<template>
  <div class="search-area">
    <el-form :model="searchForm" ref="searchForm" :inline="true" label-position="right" label-width="90px">
      <!-- <el-row> -->
      <!-- 查询项组 -->
      <template v-for="(item, index) in searchOption">
        <template v-if="typeof(item.prop) === 'string' || !item.prop">
          <el-form-item :key="'s'+index" :label="item.label + '：'" :prop="item.prop" v-if="onShow(item.show)" v-show="onToggle(item.toggle)">
            <!-- 自定义插槽 -->
            <slot v-if="item.type === 'slot'" :name="item.slotName"></slot>
            <!-- input输入框 -->
            <el-input
              size="small"
              v-else-if="item.type === 'input'"
              v-model.trim="searchForm[item.prop]"
              :placeholder="item.placeholder || ' '"
              @keyup.enter.native="onSearchForm()"
              clearable
            ></el-input>
            <!-- select下拉框 -->
            <el-select
              size="small"
              v-else-if="item.type === 'select'"
              v-model="searchForm[item.prop]"
              :placeholder="item.placeholder || ' '"
              clearable>
              <el-option v-if="!item.noAll" value="" label="全部"></el-option>
              <el-option
                v-for="(selectItem, selectIndex) in item.selectList"
                :value="item.optionValue ? selectItem[item.optionValue] : selectItem.value"
                :label="item.optionLable ? selectItem[item.optionLable] : selectItem.label"
                :key="selectIndex"></el-option>
            </el-select>
            <!-- 日期选择器 -->
            <el-date-picker
              size="small"
              v-else-if="['year', 'month', 'date', 'week', 'datetime'].indexOf(item.type) !== -1"
              v-model="searchForm[item.prop]"
              :type="item.type"
              :format="dateFormat(item)"
              :placeholder="item.placeholder || '选择日期'">
            </el-date-picker>
            <!-- 地区城市级联 -->
            <select-region
             size="small"
              v-else-if="item.type === 'region'"
              ref="refRegion"
              :searchForm="searchForm"
            >
            </select-region>
          </el-form-item>
        </template>

        <!-- 有开始和结束的日期选择器 -->
        <template v-else-if="['daterange', 'datetimerange'].indexOf(item.type) !== -1">
          <el-form-item :key="'m'+index" :label="item.label + '：'" :prop="item.prop[0]" v-if="onShow(item.show)">
            <el-date-picker
              size="small"
              :unlink-panels="true"
              v-model="searchForm[item.prop[0]]"
              range-separator="至"
              :type="item.type"
              :format="dateFormat(item)"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :placeholder="item.placeholder && item.placeholder[0] || '开始日期'">
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item :key="'m'+index" :label="item.label + '：'" :prop="item.prop[0]" v-if="onShow(item.show)">
            <el-date-picker
              size="small"
              v-model="searchForm[item.prop[0]]"
              :type="item.type === 'datetimerange' ? 'datetime' : 'date'"
              :format="dateFormat(item)"
              :placeholder="item.placeholder && item.placeholder[0] || '开始日期'">
            </el-date-picker>
          </el-form-item>
          <el-form-item :key="'n'+index" label="至：" :prop="item.prop[1]" v-if="onShow(item.show)">
            <el-date-picker
            size="small"
              v-model="searchForm[item.prop[1]]"
              :type="item.type === 'datetimerange' ? 'datetime' : 'date'"
              :format="dateFormat(item)"
              :placeholder="item.placeholder && item.placeholder[1] || '结束日期'">
            </el-date-picker>
          </el-form-item> -->

        </template>
      </template>

      <!-- 按钮组 -->
      <el-form-item class="search-area__buttons">
        <el-button type="primary" @click="onSearchForm()" :loading="loading" size="small">查询</el-button>
        <el-button v-if="!hideReset" @click="onResetForm()" size="small">重置</el-button>
        <!-- 其他按钮（下载、导出之类的） -->
        <slot name="buttons" size="small"></slot>
        <template v-if="hasToggle">
          <el-button size="small" type="text" class="toggle" @click="toggle" v-if="showArea">收起 <i class="icon iconfont icon-xiajiantou"></i></el-button>
          <el-button size="small" type="text" @click="toggle" v-else>展开 <i class="icon iconfont icon-xiajiantou"></i></el-button>
        </template>
      </el-form-item>

      <!-- 其他自定义（应对一些比较特殊的需求，一般在最后） -->
      <slot name="other"></slot>
    </el-form>
  </div>
</template>

<script>
/*
  * 查询区域通用组件（created by longbensong in 2019/2/22)
  * 待完善中...
  *
  * 示例：
  * <search-area :search-option="searchOption" :search-form="searchForm" :loading="loading" @on-search-form="searchSubmit">
  *   <template slot="test">
  *     这里是某一项展示内容，例如引入别的组件
  *   </template>
  *   <template slot="buttons">
  *     <el-button>下载</el-button>
  *     <el-button>导出</el-button>
  *   </template>
  *   <template slot="other">
  *     这里是特殊的展示内容
  *   </template>
  * </search-area>
  *
  * @param {Array} searchOption 查询条件参数配置
  *  @param {String} type 查询条件类型（必填；slot：自定义插槽；input：文本输入框；select：下拉框；region: 地区级联；year、month、week、daterange、datetimerange：日期选择器)
  *  @param {String} label 标签文本（选填，不填则空值）
  *  @param {String} slotName slot插槽对应的名字（必填；只有slot的时候才需要）
  *  @param {String,Array} prop 字段值(slot时选填，其余情况必填；type是daterange或datetimerange的时候是一个数组;)
  *  @param {String} placeholder 输入框提示文本（选填）
  *  @param {Boolean} show 特定条件下显示（选填；默认显示则不需要设置）
  *  @param {Array} selectList 下拉列表框的数据源数组（必填）
  *  @param {String} optionLable 替换下拉列表框的数据源lable字段（选填）
  *  @param {String} optionValue 替换下拉列表框的数据源value字段（选填）
  *  @param {Boolean} noAll 是否不需要显示全部，默认为需要（选填）
  *  @param {String} format 日期选择器的格式(选填)
  * 示例：（涉及到需要显示隐藏判断的，建议用计算属性设置searchOption，否则用data就足够了）
  * searchOption: [
  *  { type: 'slot', slotName: 'test', label: '自定义插槽标签名' }
  *  { type: 'input', label: '合约编号', prop: 'inputProp', placeholder: '合约编号', show: this.searchForm.isShowInput === 1 },
  *  { type: 'select', label: '合约类型', prop: 'selectProp', selectList: this.contractTypes, optionLable: 'tagName', optionValue: 'tagId', noAll: false },
  *  { type: 'region', label: '企业地区' },
  *  { type: 'year', label: 'test1', prop: 'yearProp' },
  *  { type: 'month', label: 'test2', prop: 'monthProp' },
  *  { type: 'week', label: 'test3', prop: 'weekProp' },
  *  { type: 'daterange', label: '日期：', prop: ['start', 'end'] }
  *  { type: 'datetimerange', label: '时间：', prop: ['startTime', 'endTime'], placeholder: ['请选择开始日期时间', '请选择截止日期时间'], format: 'yyyy-MM-dd HH:mm' }
  * ]
  *
  * @param {Object} searchForm 查询表单
  * 示例：
  * searchForm: {
  *  isShowInput: 1,
  *  inputProp: '',
  *  selectProp: '',
  *  yearProp: '',
  *  monthProp: '',
  *  weekProp: '',
  *  start: new Date(),
  *  end: new Date(),
  *  startTime: new Date(),
  *  endTime: new Date(),
  * }
  * 特例的下拉列表数据源
  * contractTypes: [
  *   {tagName: '我是select的label1', tagId: '我是select的value1'},
  *   {tagName: '我是select的label2', tagId: '我是select的value2'},
  * ]
  *
  */
import SelectRegion from '@/components/Base/SelectRegion'
export default {
  name: 'SearchArea',
  components: {
    SelectRegion
  },
  props: {
    // 查询条件参数配置
    searchOption: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    // 查询表单
    searchForm: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    // 是否隐藏重置按钮
    hideReset: {
      type: Boolean,
      required: false,
      default: false
    },
    // loading加载状态
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      showArea: false, // 当前区域展开还是收起
      hasToggle: false // 当前区域是否不需要展开和收起操作
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const hasToggle = this.searchOption.filter(v => v.toggle)
      if (hasToggle.length !== 0) this.hasToggle = true
      else this.hasToggle = false
    },
    // 控制是否加载
    onShow (show) {
      if (typeof (show) === 'undefined') {
        return true
      } else {
        return show
      }
    },
    // 控制默认展开或收起
    onToggle (toggle) {
      if (!toggle) {
        return true
      } else {
        return this.showArea
      }
    },
    // 日期选择器的显示默认格式化
    dateFormat (item) {
      if (item.format) return item.format
      else if (item.type === 'year') return 'yyyy'
      else if (item.type === 'month') return 'yyyy-MM'
      else if (item.type === 'week') return 'yyyy 第 WW 周'
      else if (item.type === 'date' || item.type === 'daterange') return 'yyyy-MM-dd'
      else if (item.type === 'datetime' || item.type === 'datetimerange') return 'yyyy-MM-dd HH:mm:ss'
    },
    // 查询表单
    onSearchForm () {
      this.$emit('on-search-form')
    },
    // 重置表单
    onResetForm () {
      // 如果有地区，则清空地区选项
      this.$refs.refRegion && this.$refs.refRegion[0].clearProvince()

      this.$refs.searchForm.resetFields()
      this.$emit('on-reset-form', this.searchForm)
    },
    toggle () {
      this.showArea = !this.showArea
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-area {
    // padding: 20px 30px 0 30px;
    // background-color: $--ui-color-background;
    /deep/ .el-form-item{
      margin-bottom: 20px;
    }
  }
  .search-area__buttons{
    /deep/ .el-button{
      min-width: 90px;
    }
  }
  .toggle{
    i{
      display: inline-block;
      transform: rotate(180deg);
    }
  }
</style>
