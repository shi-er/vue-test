import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import welcome from '@/components/welcome'
import customList from '@/components/customList'
import permissionMenu from '../components/permission/menus';
import permissionRole from '../components/permission/role';
import permissionUser from '../components/permission/user';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/index',
      component: index
    }, {
      path: '/permission',
      component: permission,
      children: [
        {
          path: '/permission/menu',
          component: permissionMenu
        },
        {
          path: '/permission/role',
          component: permissionRole
        },
        {
          path: '/permission/user',
          component: permissionUser
        },
      ]
    },
    {
      path: '/welcome',
      component: welcome
    },
    {
      path: '/customList',
      component: customList
    }
  ]
})
