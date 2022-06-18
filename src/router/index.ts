import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)',
      name: 'home',
      component: App
    },
    {
      path: '/:page',
      name: 'pages',
      component: App,
      children: [
        {
          path: 'modal/:modal',
          name: 'rules',
          component: App
        },
      ]
    }
  ]
})

export default router
