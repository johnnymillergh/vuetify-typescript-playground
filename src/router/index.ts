import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/hello-world',
    // name: 'hello-world',
    // route level code-splitting
    // this generates a separate chunk (hello-world.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Home,
    children: [
      // hello-world will be rendered inside Homs's <router-view>
      // when /user/:id is matched
      {
        path: '',
        component: () => import(/* webpackChunkName: "hello-world" */ '@/views/hello-world/index.vue')
      }
    ]
  },
  {
    path: '/vuetify-demo',
    // name: 'vuetify-demo',
    component: Home,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "vuetify-demo" */ '@/views/vuetify-demo/index.vue')
      }
    ]
  },
  {
    path: '/form-validation',
    // name: 'form-validation',
    component: Home,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "form-validation" */ '@/views/form-validation/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
