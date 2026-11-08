import InitialPage from '@/components/InitialPage.vue'
import ServicesPage from '@/components/ServicesPage.vue'
import Methodology from '@/components/Methodology.vue'
import IndustrySectors from '@/components/IndustrySectors.vue'
import NetworkPage from '@/components/NetworkPage.vue'

import { createRouter, createWebHistory } from 'vue-router'
import SignupPage from '@/components/SignupPage.vue'

const routes = [
  {
    path:'/',
    name: 'Initial',
    component: InitialPage
  },
  {
    path:'/services',
    name: 'Services',
    component: ServicesPage
  },
  {
    path:'/method',
    name: 'Methodology',
    component: Methodology
  },
  {
    path:'/industry',
    name: 'Industry',
    component: IndustrySectors
  },
  {
    path:'/network',
    name: 'Network',
    component: NetworkPage
  },
  {
    path:'/signup',
    name: 'SignUp',
    component: SignupPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router