import { createRouter, createWebHistory } from "vue-router";

// 导入组件（可以使用懒加载优化性能）
const Home = () => import("@/view/home/Home.vue");
const Job = () => import("@/view/Job/Job.vue");
const News = () => import("@/view/News/News.vue");
const Setting = () => import("@/view/Setting/Setting.vue");
const GrowTh = () => import("@/view/GrowTh/GrowTh.vue")

// 路由规则
const routes = [
  {
    path: "/", // 路径
    component: Home, // 对应的组件
  },
  {
    path: "/job", // 路径
    component: Job, // 对应的组件
  },
  {
    path: "/news", // 路径
    component: News, // 对应的组件
  },
  {
    path: "/setting", // 路径
    component: Setting, // 对应的组件
  },
  {
    path:'/growth',
    component:GrowTh
  }
];

// 创建路由实例
const router = createRouter({
  // 路由模式：history模式（无#号）
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // 路由规则
});

export default router;
