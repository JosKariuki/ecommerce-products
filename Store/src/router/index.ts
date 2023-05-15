import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/store',
      name: 'store view',
      component: () => import('../views/Items/ItemsView.vue')
    },
    {
      path: '/item/create',
      name: 'item create',
      component: () => import('../views/Items/ItemCreate.vue')
    },
    {
      path: '/item/edit/:id',
      name: 'item edit',
      component: () => import('../views/Items/ItemCreate.vue')
    }
  ]
})

export default router
