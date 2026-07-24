import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      component: () => import('@/view/home/total-container.vue'),
    },
    {
      path: '/load-page',
      name: 'LoadPage',
      component: () => import('@/view/load-page/load-border.vue'),
      meta: {
        noDirectUrl: true, // 标记禁止地址栏直接访问
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  // 目标路由标记禁止直接访问
  if (to.meta.noDirectUrl) {
    if (!from.name) {
      next('/')
      return
    }
  }
  next()
})

export default router
