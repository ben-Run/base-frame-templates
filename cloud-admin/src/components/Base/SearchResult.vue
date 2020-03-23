<template>
  <div class="search-result" v-loading="tableLoading">
    <div class="search-title" v-if="tableTips.title">
      <icon-font name="zhuangshi" size="32"></icon-font>
      <span>{{tableTips.title}}</span>
    </div>
    <slot>

    </slot>
    <div class="search-middle">
      <div class="search-tips">
        <i class="icon iconfont icon-tishitubiao search-tips__icon" v-if="tableTips && tableTips.show"></i>
        <!-- <icon-font name="tishitubiao" size="30" iconClass="search-tips__icon" v-if="tableTips && tableTips.show"></icon-font> -->
        <div class="search-tips__text" v-if="tableTips && tableTips.show" @click="onTableTips">
          <div class="bg-tips"></div>
          <span class="yellow">{{tableTips.count}}</span>
          <span class="bg-tips-desc" v-if="tableTips.text">{{tableTips.text}}</span>
          <!-- 20190507 add 方便tips 增加其他 如导出按钮 -->
          <slot name="tips"></slot>
        </div>
      </div>
      <div class="search-control">
        <slot name="control"></slot>
      </div>
    </div>

    <base-table
      ref="baseTable"
      class="search-table"
      :table-data="tableData"
      :table-header="tableHeader"
      :table-loading="tableLoading"
      :tableHeight="tableHeight"
      :table-border="tableBorder"
      :filter-change="filterChange"
      :default-sort="defaultSort"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName"
      :span-method="spanMethod"
      :row-click="rowClick"
      :sort-change="sortChange"
      :selection-change="selectionChange"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :empty-text="emptyText"
      :filter-multiple="filterMultiple"
    ></base-table>

    <base-pagination
      v-if="showPaging"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></base-pagination>
  </div>
</template>

<script>
/*
  * 查询结果通用组件（created by longbenosng in 2019/3/19)
  * 主要由通用表格及分页器2个组件构成(表格及分页器详细说明见对应的组件)
  * 待完善中...
  *
  * 示例：
  * <search-result
  *   :table-data="tableData"
  *   :table-header="tableHeader"
  *   :table-loading="tableLoading"
  *   :row-class-name="rowClassName"
  *   :cell-class-name="cellClassName"
  *   :sort-change="handleSortChange"
  *   :current-page="currentPage"
  *   :page-size="pageSize"
  *   :total="total"
  *   :current-change="handleCurrentChange"
  *   :size-change="handleSizeChange"
  *  ></search-result>
  *
  * @param {Array} tableData 表格数据数组
  * @param {Array} tableHeader 表格项
  * @param {Boolean} tableLoading 表格加载状态
  * @param {Number} currentPage 分页器当前页数
  * @param {Number} pageSize 分页器每页显示条目个数
  * @param {Number} total 分页器总页数
  * @param {Function} currentChange 分页器每页显示条目个数改变后的回调函数
  * @param {Function} sizeChange 分页器当前页数改变后的回调函数
  *
  *
  */
import BaseTable from '@/components/Base/BaseTable'
import BasePagination from '@/components/Base/BasePagination'
export default {
  name: 'SearchResult',
  components: {
    BaseTable,
    BasePagination
  },
  props: {
    // 表格上沿提示语句设置
    tableTips: {
      type: Object,
      required: false,
      default () {
        return {
          show: false, // 是否展示
          count: 0, // 提示数字
          text: '', // 其他文字
          clickFun () {}
        }
      }
    },
    // 表格数据
    tableData: {
      type: Array,
      required: false
    },
    // 表格项
    tableHeader: {
      type: Array,
      required: false
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
    // 表格行的样式
    rowClassName: {
      type: Function,
      required: false
    },
    // 表格列样式
    cellClassName: {
      type: [Function, String],
      required: false
    },
    // 合并单元格
    spanMethod: {
      type: [Function],
      required: false
    },
    // 表格某行点击事件
    rowClick: {
      type: Function,
      required: false
    },
    // 是否开启表格边框
    tableBorder: {
      type: Boolean,
      required: false,
      default: false
    },
    // 筛选项变更事件
    filterChange: {
      type: Function,
      required: false
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
    // 默认的排序列和排序顺序
    defaultSort: {
      type: Object,
      require: false,
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
      required: false
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
    },
    // 当前页数
    currentPage: {
      type: Number,
      required: true,
      default: 1
    },
    // 每页显示条目个数
    pageSize: {
      type: Number,
      required: false,
      default: 10
    },
    // 总页数
    total: {
      type: Number,
      required: true,
      default: 0
    },
    // 每页显示条目个数改变后的回调函数
    currentChange: {
      type: Function,
      required: true
    },
    // 当前页数改变后的回调函数
    sizeChange: {
      type: Function,
      required: true
    },
    // 当选择项发生变化时会触发该事件
    selectionChange: {
      type: Function,
      required: false,
      default () {}
    },
    // 是否显示分页
    showPaging: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onTableTips () {
      this.tableTips.clickFun && this.tableTips.clickFun()
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-result {
    // margin: 0 24px;
    // @include bg-color();
    .search-title {
      display: flex;
      padding: 15px 0;
      align-items: center;
      svg {
        margin-right: 10px;
      }
    }
    .search-middle {
      display: flex;

      .search-tips{
        flex: 1;
        // height: 30px;
        line-height: 30px;
        display: flex;

        .search-tips__icon {
          vertical-align: middle;
          font-size: 30px;
          text-shadow: 0 0 10px;
        }

        .search-tips__text{
          position: relative;
          font-size: 12px;
          display: inline-block;
          padding: 0 60px 0 20px;

          .bg-tips{
            position: absolute;
            left: 0;
            width: 100%;
            height: 30px;

            &::before{
              display: block;
              content: '';
              width: 100%;
              height: 15px;
              transform: skewX(45deg);
              // background: linear-gradient(to right, nth($--ui-color-yellow, 1), transparent);
              opacity: 0.2;
            }
            &::after{
              display: block;
              content: '';
              width: 100%;
              height: 15px;
              transform: skewX(135deg);
              // background: linear-gradient(to right, nth($--ui-color-yellow, 1), transparent);
              opacity: 0.2;
            }
          }

          span{
            margin-right: 4px;
          }
        }
      }
      .search-control{
        justify-content: flex-end;
      }
    }

    .search-table {
      width: 100%;
      margin-top: 20px;
    }
    .bg-tips-desc {
      position: relative;
      z-index: 99;
      display: inline-block;
    }
  }
</style>
