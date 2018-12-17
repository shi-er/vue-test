import Vue from 'vue'
import Router from 'vue-router'
import welcome from '../components/welcome'
import customList from '../components/customList'
import permission from '../components/authorization/permission/permission';
import permissionMenu from '../components/authorization/permission/permissionMenu';
import roleMenu from '../components/authorization/rolePermission/roleMenu';
import userMenu from '../components/authorization/userRole/userMenu';

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
          path: '/authorization/permission/menu',
          component: permissionMenu
        },
        {
          path: '/authorization/rolePermission/menu',
          component: roleMenu
        },
        {
          path: '/authorization/userRole/menu',
          component: userMenu
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
