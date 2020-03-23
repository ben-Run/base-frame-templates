import fetch from '@/utils/fetch'

/**
 * 获取菜单列表
 */
export function getMenuList (params) {
  return fetch({
    url: '/admin/res/sysRes/myResources',
    method: 'get',
    params
  })
}

/**
 * 获取服务目录&&第三方服务
 */
export function getCatalogMenu (params) {
  return fetch({
    url: '/category/services/spServiceCatalog/getCatalogMenu',
    method: 'GET',
    params
  })
}
