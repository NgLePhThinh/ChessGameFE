import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/PlayerProfile.vue')
  },
  {
    path: '/chessgame',
    name: 'ChessGame',
    component: () => import('../views/ChessGame.vue')
  },
  {
    path: '/adddata',
    name: 'AddData',
    component: () => import('../views/AddData.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router;