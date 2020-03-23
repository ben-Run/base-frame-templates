<template>
  <el-pagination
    v-if="total > 0"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    class='base-pagination'>
  </el-pagination>
</template>
<script>
/*
  * 分页通用组件（created by longbensong in 2019/1/22)
  *
  * @param {Number} currentPage 当前页数
  * @param {Number} pageSize 每页显示条目
  * @param {Number} total 总页数
  * @param {Function} currentChange 当前页数改变后的回调函数
  * @param {Function} sizeChange 每页显示条目个数改变后的回调函数
  *
  * 示例：
  * <base-pagination :current-page="reqBody.page" :page-size="reqBody.pageSize" :total="total" @current-change="currentChange" @size-change="sizeChange"></base-pagination>
  *
  */
const PAGE_SIZES = [5, 10, 20, 50, 100] // 每页显示个数选择器的选项设置
export default {
  name: 'BasePagination',
  components: {},
  props: {
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
      default: 10,
      validator: (value) => {
        return PAGE_SIZES.indexOf(value) !== -1
      }
    },
    // 总页数
    total: {
      type: Number,
      required: true,
      default: 10
    }
  },
  data () {
    return {
      pageSizes: PAGE_SIZES // 每页显示个数选择器的选项设置
    }
  },
  methods: {
    // 每页显示条目个数改变后的回调函数
    handleSizeChange (n) {
      this.$emit('size-change', n)
    },
    // 当前页码改变后的回调函数
    handleCurrentChange (n) {
      this.$emit('current-change', n)
    }
  }
}
</script>
<style lang="scss" scoped>
  .btn-operation{
    margin: 0 5px !important;
  }
  .base-pagination {
    margin-top: 10px;
    text-align: center;
  }
</style>
