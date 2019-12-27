import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/vuetify-demo',
    name: 'vuetify-demo',
    // route level code-splitting
    // this generates a separate chunk (vuetify-demo.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "vuetify-demo" */ '@/views/VuetifyDemo.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
