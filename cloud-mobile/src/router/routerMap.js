import Index from '@/views/Index.vue'

export const constantRouterMap = [
  {
    path: '/',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/Index.vue'),
        name: 'home',
        meta: { title: '登录', affix: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/404',
    name: 'error404',
    component: () => import('@/views/error/Error404')
  },
  { path: '*', redirect: '/404', hidden: true }
]

export const defaultRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRouterMap = []

export const templateRoute = {
  component: Index
}
