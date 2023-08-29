/*
 * @Author: huwanfei
 * @Date: 2023-08-25 15:03:54
 * @LastEditTime: 2023-08-29 13:56:10
 * @LastEditors: huwanfei
 * @Description:
 * @FilePath: /cesium-3d/src/router/index.ts
 */
import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView
    },
    // {
    //   path: '/index',
    //   name: 'index',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/index.vue')
    // }
  ]
})

export default router
