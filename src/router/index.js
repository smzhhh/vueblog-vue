import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Blogs from '../views/Blogs.vue'
import BlogEdit from '../views/BlogEdit.vue'
import BlogDetail from '../views/BlogDetail.vue'
import Ships from '../views/Ships.vue'
import ShipEdit from '../views/ShipEdit.vue'
import Index from '../views/Index.vue'
import Test from '../views/Test.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: Blogs
    },
    {
      path: '/blog/add',
      name: 'BlogAdd',
      component: BlogEdit,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/blog/:blogId',
      name: 'BlogDetail',
      component: BlogDetail
    },
    {
      path: '/blog/:blogId/edit',
      name: 'BlogEdit',
      component: BlogEdit,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/ships',
      name: 'Ships',
      component: Ships
    },
    {
      path: '/ship/add',
      name: 'ShipAdd',
      component: ShipEdit,
      meta: {
        requireAuth: true //需要登录才能访问
      }
    },
    {
      path: '/ship/:shipId/edit',
      name: 'ShipEdit',
      component: ShipEdit,
      meta: {
        requireAuth: true //需要登录才能访问
      }
    },
    {
      path: '/ship/delete/:shipId',
      meta: {
        requireAuth: true //需要登录才能访问
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
  ]

})
