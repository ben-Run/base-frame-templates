<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
         <!-- {{ generateTitle(tag.title) }} -->
        {{ tag.title }}
        <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">{{ 'tagsView.refresh' }}</li>
      <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">
        {{ 'tagsView.close' }}
      </li>
      <li @click="closeOthersTags">{{ 'tagsView.closeOthers' }}</li>
      <li @click="closeAllTags(selectedTag)">{{ 'tagsView.closeAll' }}</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
// import { generateTitle } from '@/utils/i18n'
// import path from 'path'

export default {
  components: { ScrollPane },
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    },
    routes () {
      return this.$store.state.permission.routes || []
    }
  },
  watch: {
    $route () {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  async mounted () {
    await this.initTags()
    await this.addTags()
  },
  methods: {
    // generateTitle, // generateTitle by vue-i18n
    isActive (route) {
      return route.path === this.$route.path
    },
    filterAffixTags (routes, basePath = '/') {
      let tags = []
      // routes.forEach(route => {
      //   if (route.meta && route.meta.affix) {
      //     const tagPath = path.resolve(basePath, route.path)
      //     tags.push({
      //       fullPath: tagPath,
      //       path: tagPath,
      //       name: route.name,
      //       meta: { ...route.meta }
      //     })
      //   }
      //   if (route.children) {
      //     const tempTags = this.filterAffixTags(route.children, route.path)
      //     if (tempTags.length >= 1) {
      //       tags = [...tags, ...tempTags]
      //     }
      //   }
      // })
      tags.push({
        fullPath: '/home',
        path: 'home',
        name: 'Home',
        meta: { title: '首页', affix: true }
      })
      return tags
    },
    async initTags () {
      // const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      // for (const tag of affixTags) {
      //   // Must have tag name
      //   if (tag.name) {
      //     this.$store.dispatch('addVisitedView', tag)
      //   }
      // }
      // 20190505
      let affixTags = []
      affixTags.push({
        fullPath: '/home',
        path: '/home',
        name: 'Home',
        meta: { title: '首页', affix: true }
      })
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          await this.$store.dispatch('addVisitedView', tag)
        }
      }
    },
    addTags () {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('addView', this.$route)
      }
      return false
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag (view) {
      this.$store.dispatch('delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag (view) {
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews)
        }
      })
    },
    closeOthersTags () {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags (view) {
      this.$store.dispatch('delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews)
      })
    },
    toLastView (visitedViews) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        // You can set another route
        this.$router.push('/')
      }
    },
    openMenu (tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.tags-view-container {
  margin: 0 0 15px 0;
  height: 40px;
  border: 1px solid;
  @include bg-color($--ui-color-background);
  @include border-color($--ui-color-border);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  border-radius: 7px;
  .el-scrollbar {
    width: 100%;
  }
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid;
      // @include bg-color($--ui-color-table-stripe);
      // @include border-color($--ui-color-background);
      // @include color($--ui-font-tips);
      background-color: #fff;
      border-color: #fff;
      color: #606266;
      padding: 1px 10px;
      font-size: 14px;
      margin-left: 5px;
      margin-top: 6px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        // @include bg-color($--ui-color-table-stripe);
        // @include border-color($--ui-color-pageborder);
        // @include color($--ui-color-primary);
        background-color: #409eff;
        border-color: #fff;
        color: white;
        border-radius: 5px;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 1px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -2px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
