import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomePage from '../views/HomePage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/random',
    name: 'Random',
    component: () => import('../views/RandomPage.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/CategoryPage.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/DetailPage.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
