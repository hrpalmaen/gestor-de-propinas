import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PayTipsView from '@/views/PayTipsView.vue'
import AddTipsView from '@/views/AddTipsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pago-propina',
      name: 'pay-tip',
      component: PayTipsView
    },
    {
      path: '/ingresar-propina',
      name: 'add-tip',
      component: AddTipsView
    }
  ]
})

export default router
