<template>
  <el-table
    stripe
    ref="refTable"
    class="base-table"
    v-loading="tableLoading"
    :height="tableHeight"
    :max-height="maxHeight"
    :data="tableData"
    :border="tableBorder"
    :row-class-name="rowClassName"
    :cell-class-name="cellClassName"
    :span-method="spanMethod"
    @row-click="rowClick"
    @filter-change="filterChange"
    @sort-change="sortChange"
    @selection-change="selectionChange"
    @row-dblclick="rowDbclick"
    :default-sort="defaultSort"
    :show-summary="showSummary"
    :sum-text="sumText"
    :summary-method="summaryMethod"
    :empty-text="emptyText"
    :filter-multiple="filterMultiple"
    row-key='id'
    style="width: 100%">
    <template v-for="(item, index) in tableHeader">
      <!-- 序号 -->
      <el-table-column
      v-if="item.isOrder && onShow(item.show)"
      :key="`a${index}`"
      label="序号"
      type="index"
      align="center"
      :width="item.width"
      :min-width="item.minWidth">
        </el-table-column>
      <!-- 复选框 -->
      <el-table-column v-if="item.isSelection && onShow(item.show)"
      :key="'box'+index"
      type="selection"
      align="center"
      :reserve-selection="item.reserveSelection"
      :row-key="item.rowKey || ''"
      >
      </el-table-column>
      <!-- 格式化返回格式 -->
      <el-table-column
        align="center"
        v-else-if="item.formatter && onShow(item.show)"
        :cell-class-name="item.class"
        :key="`b${index}`"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth"
        :formatter="item.formatter"
        :sortable="item.sortable"
        :sortOrders="item.sortOrders"
        :render-header="item.renderHeader"
        show-overflow-tooltip
        :column-key="!!item.filters ? item.prop : ''"
        :filters="item.filters"
        :filter-method="item.filterMethod"
        :filter-multiple="item.filterMultiple">
        </el-table-column>
      <!-- 其余可视项目 -->
      <el-table-column v-else-if="onShow(item.show) && !item.isOrder && !item.formatter"
        align="center"
        :cell-class-name="item.class"
        :key="`c${index}`"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth"
        :sortable="item.sortable"
        :sortOrders="item.sortOrders"
        :render-header="item.renderHeader"
        show-overflow-tooltip
        :column-key="!!item.filters ? item.prop : ''"
        :filters="item.filters"
        :filter-method="item.filterMethod"
        :fixed="item.fixed ? item.fixed : !!item.operations ? 'right': false"
        :filter-multiple="item.filterMultiple">
        <template slot-scope="scope" >
          <!-- 前缀修饰文字 -->
          <span v-if="item.prepend" :class="isFunction(item.prependClass, scope.row)">
            {{ isFunction(item.prepend , scope.row) }}
          </span>
          <!-- 操作栏，一般都是按钮 v-permission="operation.permission" -->
          <div v-if="item.operations" class="operate-box">
            <template v-for="(operation, i) in item.operations">
              <el-button
                :key="i"
                :class="['btn-operation', isFunction(operation.class, scope.row)]"
                v-if="operation.show ? isFunction(operation.show, scope.row) : true"
                :type="operation.type || 'text'"
                :disabled="isFunction(operation.disabled, scope.row)"
                @click="operation.clickFun(scope.row)"
              >
                {{isFunction(operation.label, scope.row)}}
              </el-button>
              <!--更多-->
              <el-dropdown  v-if="isFunction(operation.operationMores, scope.row)" :key="'more'+i">
                <el-button type="text">{{operation.moreText || '更多'}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <template v-for="(operationMore, i) in isFunction(operation.operationMores, scope.row)">
                    <el-dropdown-item
                      :key="'m'+i"
                      v-if="operationMore.show ? isFunction(operationMore.show, scope.row) : true"
                      :disabled="isFunction(operationMore.disabled, scope.row)"
                      @click.native.prevent="operationMore.clickFun(scope.row, operationMore.label)">
                      {{isFunction(operationMore.label, scope.row)}}
                    </el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </div>
          <!-- input数值文本输入框 -->
          <el-input v-else-if="item.input && item.type === 'number'"
          :class="item.class"
          v-model="scope.row[item.prop]"
          placeholder="请输入..."
          @change="inputChange"
          :disabled="scope.row[item.prop] === '--'"
          v-toggle-thousand.round.precision="item.precision || 0">
          </el-input>
          <!-- input文本输入框 -->
          <el-input v-else-if="isFunction(item.input, scope.row)"
          :class="item.class"
          v-model.trim="scope.row[item.prop]"
          placeholder="请输入..."
          @change="inputChange(scope.row[item.prop], item.prop, scope.row)">
          </el-input>
          <!-- select下拉选择框 -->
          <el-select
            v-else-if="isFunction(item.select, scope.row)"
            v-model="scope.row[item.prop]"
            :class="item.class"
            placeholder="请选择"
            @change="inputChange(scope.row[item.prop], item.prop, scope.row)"
          >
            <el-option
              v-for="(selectItem, selectIndex) in isFunction(item.selectList, scope.row)"
              :value="selectItem.value"
              :label="selectItem.label"
              :key="selectIndex"
            ></el-option>
          </el-select>
          <!-- 日期选择器 -->
          <div v-else-if="isFunction(item.datePicker, scope.row)">
            <el-date-picker
              v-for="(datePickerItem, datePickerItemIndex) in item.datePickerList || datePickerList"
              :key="datePickerItemIndex"
              v-show="isFunction(item.datePickerType, scope.row) === datePickerItem"
              v-model="scope.row[item.prop]"
              :type="datePickerItem"
              :format="dateFormat(datePickerItem)"
              :placeholder="item.placeholder || '选择日期'"
              @change="inputChange(scope.row[item.prop], item.prop, scope.row)"
            ></el-date-picker>
          </div>
          <!-- button按钮 -->
          <el-button
            v-else-if="item.button"
            :class="isFunction(item.class, scope.row)"
            :type="item.type || 'text'"
            :disabled="isFunction(item.disabled, scope.row)"
            @click="item.clickFun(scope.row)"
          >
            {{ item.buttonText || scope.row[item.prop]}}
          </el-button>
          <!-- inputNumber数字输入框 -->
          <el-input-number
            v-else-if="isFunction(item.inputNumber, scope.row)"
            v-model="scope.row[item.prop]"
            :size="item.inputNumber.size || 'small'"
            :precision="item.inputNumber.precision || 1"
            :step="item.inputNumber.step || 0.1"
            :max="item.inputNumber.max"
            :min="item.inputNumber.min || 0"
            controls-position="right"
            @change="inputChange"
          ></el-input-number>
          <!-- popover -->
          <el-popover
            v-else-if="item.popover && isFunction(item.popover.content, scope.row)"
            popper-class="table-popper"
            :placement="item.popover.placement || 'bottom-start'"
            :title="item.popover.title"
            :width="item.popover.width || 200"
            :trigger="item.popover.trigger || 'hover'"
            :content="isFunction(item.popover.content, scope.row)">
            <div slot="reference">{{scope.row[item.prop]}}</div>
          </el-popover>
          <!-- HTML显示 -->
          <div v-else-if="item.html" v-html="isFunction(item.html, scope.row)"></div>
          <!-- 纯文本显示 -->
          <span v-else :title="item.title ? scope.row[item.prop] : ''">
            {{scope.row[item.prop]}}
          </span>
          <!-- 后缀修饰文字 -->
          <span v-if="item.append" :class="isFunction(item.appendClass, scope.row)">
            {{item.append}}
          </span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
/*
* 表格通用组件（created by longbensong in 2019/1/22)
*
* @param {Array} tableData 表格数据数组
* @param {Array} tableHeader 表格项
*   @param {Boolean} isSelection 是否开启select复选框
*   @param {Boolean} isOrder 是否开启排序
*   @param {String} label 表头标题
*   @param {Number} width 单元格宽度
*   @param {Number} minWidth 单元格最小宽度
*   @param {String} prop 字段值
*   @param {Function} formatter 用于格式化返回的数值，类似过滤器
*   @param {String} sortable 排序（custom为远程搜索，结合sortChange事件一起使用）
*   @param {String} renderHeader 自定义表头
*   @param {Boolean} tooltip 是否开启一行显示不完有浮动窗口展示
*   @param {Html} html html格式
*   @param {Array} operations 操作栏（一般都是按钮）
*     @param {String} type 按钮的类型（primary、default等，缺省值为text)
*     @param {String} label 按钮的标题
*     @param {Function} clickFun 按钮的点击回调事件（可用参数row）
*     @param {Function} show 按钮的显示条件（一直显示的可以不设置此项）
* @param {Boolean} tableLoading 表格加载状态
* @param {Function} sortChange 排序回调事件
* (其他同el-table用法，建议参考官网使用)
*
* 示例：
* <base-table
*   :table-data="tableData"
*   :table-header="tableHeader"
*   :table-loading="loading"
*   :row-class-name="rowClassName"
*   :sort-change="handleSortChange"
* ></base-table>
*
* tableData: [
*  { createTime: '2019-01-22', name: '小明' },
*  { createTime: '2019-01-22', name: '小红' }
* ]
*
* tableHeader: [
*   { label: '', width: 60, isSelection: true },
*   { label: '序号', width: 60, isOrder: true },
*   { label: '有前后缀', width: 60, prepend: '我是前缀', append: '我是后缀', },
*   { label: '姓名', width: 160, prop: 'name', renderHeader: this.renderHeader },
*   {
*     label: '创建时间',
*     width: 160,
*     prop: 'createTime',
*     formatter: row => this.format(row.createTime, 'yyyy/MM/dd HH:mm:ss')
*   },
*   { label: '最近修改时间', prop: 'statusTime', minWidth: 200, sortable: 'custom' },
*   { label: '合同编号', prop: 'schemeCode', popover: { content: row => row.schemeRemark } },
*   {
*      label: '变化率(%）',
*      prop: 'profitRate',
*      minWidth: 120,
*      html: row => {
*        const value = row.profitRate ? row.profitRate.toFixed(2) : '-'
*        let column = `<span>${value}</span>`
*        if (row.profitRate) {
*          if (row.profitRate > 0) {
*            column += '<span style="font-size:20px;color:red;font-weight:bold;">↑</span>'
*          } else {
*            column += '<span style="font-size:20px;color:green;font-weight:bold;">↓</span>'
*          }
*        }
*        return column
*      }
*   },
*   {
*     label: '操作',
*     width: 160,
*     operations: [
*       { type: 'text', label: '编辑', clickFun: this.editClick },
*       { type: 'text', label: '删除', clickFun: row => this.$router.push(`/retail/scheme/list-${row.targetCustomerId}`), show: row => row.pricingStatus !== 0}
*     ]
*   }
* ]
*
* 写法同element-ui官网（http://element-cn.eleme.io/#/zh-CN/component/table）
* rowClassName ({ row, rowIndex }) {
*   if (row.schemeRemark) {
*     return 'warning-row'
*   }
* }
*
*  renderHeader (createElement, { column, _self }) {
*   return createElement('div', {'class': 'declare-header-center-custom'},
*     [
*       createElement('span', ['异常申报']),
*       createElement('el-tooltip', {'class': 'item', attrs: {effect: 'dark', content: '123', placement: 'top'}}, [createElement('i', {'class': 'el-icon-info'})])
*        ]
*      )
*   }
*
* 写法同element-ui官网（http://element-cn.eleme.io/#/zh-CN/component/table）
* handleSortChange ({column, prop, order}) {
*   if (order === 'ascending') {
*     this.statusTimeSort = 0
*   } else if (order === 'descending') {
*     this.statusTimeSort = 1
*   } else {
*     this.statusTimeSort = 3
*   }
*   this.query()
* }
*
*/
export default {
  name: 'BaseTable',
  components: {},
  props: {
    // 表格数据
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    // 表格项
    tableHeader: {
      type: Array,
      required: true,
      default: () => []
    },
    // 表格加载状态
    tableLoading: {
      type: Boolean,
      required: false,
      default: false
    },
    // 表格高度
    tableHeight: {
      type: Number,
      required: false
    },
    maxHeight: {
      type: Number,
      required: false
    },
    // 是否开启表格边框
    tableBorder: {
      type: Boolean,
      required: false,
      default: false
    },
    // 表格行的样式
    rowClassName: {
      type: [Function, String],
      required: false
    },
    // 表格列样式
    cellClassName: {
      type: [Function, String],
      required: false
    },
    spanMethod: {
      type: [Function],
      required: false
    },
    // 表格某行点击事件
    rowClick: {
      type: Function,
      required: false,
      default () {}
    },
    // 筛选项变更事件
    filterChange: {
      type: Function,
      required: false,
      default () {}
    },
    // 筛选项是否多选
    filterMultiple: {
      type: Boolean,
      default: true
    },
    // 表格排序事件
    sortChange: {
      type: Function,
      required: false,
      default () {}
    },
    // 双击表格行
    rowDbclick: {
      type: Function,
      required: false,
      default () {}
    },
    // 默认的排序列和排序顺序
    defaultSort: {
      type: Object,
      require: false,
      default () {}
    },
    // 当选择项发生变化时会触发该事件
    selectionChange: {
      type: Function,
      required: false,
      default () {}
    },
    // 是否显示汇总
    showSummary: {
      type: Boolean,
      required: false,
      default: false
    },
    // 汇总的文案
    sumText: {
      type: String,
      required: false,
      default: '汇总'
    },
    // 汇总的自定义返回值函数
    summaryMethod: {
      type: Function,
      required: false,
      default () {}
    },
    // 空数据时显示的文本内容
    emptyText: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      datePickerList: ['year', 'month', 'week', 'date', 'daterange', 'datetime', 'datetimerange']
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 动态替换筛选图标
      this.$nextTick(() => {
        let arr = document.getElementsByClassName('el-table__column-filter-trigger')
        for (let i = 0; i < arr.length; i++) {
          let icon = document.createElement('i')
          icon.className = 'icon iconfont icon-shaixuan'
          let child = arr[i].getElementsByClassName('el-icon-arrow-down')[0]

          if (child) {
            arr[i].appendChild(icon)
            arr[i].removeChild(child)
          }
        }
      })
    },
    // 控制显示隐藏
    onShow (show) {
      if (typeof (show) === 'undefined') {
        return true
      } else {
        return show
      }
    },
    // 判断是否为函数类型
    isFunction (key, row) {
      if (key) {
        return typeof (key) === 'function' ? key(row) : key
      }
    },
    // input框改变时
    inputChange (value, key, row) {
      if (key) {
        this.$emit('inputChange', { key, value, row })
      } else {
        this.$emit('inputChange', value)
      }
    },
    // 手动调用重新布局方法，解决汇总被隐藏的问题
    doLayout () {
      this.$nextTick(() => {
        this.$refs.refTable.doLayout()
      })
    },
    // 日期选择器的显示默认格式化
    dateFormat (item) {
      if (item.format) return item.format
      else if (item.type === 'year') return 'yyyy'
      else if (item.type === 'month') return 'yyyy-MM'
      else if (item.type === 'week') return 'yyyy 第 WW 周'
      else if (item.type === 'date' || item.type === 'daterange') return 'yyyy-MM-dd'
      else if (item.type === 'datetime' || item.type === 'datetimerange') return 'yyyy-MM-dd HH:mm:ss'
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-operation{
    margin: 0 5px !important;
  }
  .base-table /deep/{
    &.el-table th.is-leaf, &.el-table td{
      // border-bottom: 0;
    }
    & .operate-box {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
