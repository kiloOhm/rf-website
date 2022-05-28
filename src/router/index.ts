import { createRouter, createWebHistory } from 'vue-router'
import Pages from '../views/Pages.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)',
      name: 'home',
      component: Pages
    }
  ]
})

export default router
