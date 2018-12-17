import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import welcome from '../components/welcome'
import customList from '../components/customList'
import permission from '../components/authorization/permission/permission';
import permissionMenu from '../components/authorization/permission/permissionMenu';
import permissionRole from '../components/authorization/rolePermission/roleMenu';
import permissionUser from '../components/authorization/userRole/userMenu';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   component: login
    // },
    // {
    //   path: '/',
    //   component: index
    // },
    {
      path: '/',
      component: permission,
      children: [
        {
          path: '/authorization/menu',
          component: permissionMenu
        },
        {
          path: '/authorization/role',
          component: permissionRole
        },
        {
          path: '/authorization/user',
          component: permissionUser
        }
        // , {
        //   path: '',
        //   redirect: '/authorization/menu'
        // }
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
