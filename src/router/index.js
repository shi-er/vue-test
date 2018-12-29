import Vue from 'vue'
import Router from 'vue-router'
import welcome from '../components/welcome'
import customList from '../components/customList'
import menu from '../components/menu';
import permissionMenu from '../components/authorization/permission/permissionMenu';
import roleMenu from '../components/authorization/rolePermission/roleMenu';
import userMenu from '../components/authorization/userRole/userMenu';
import bankCardMenu from '../components/userCenter/bankCard/bankCardMenu';
import userInfoMenu from '../components/userCenter/user/userInfoMenu';
import loginMenu from '../components/userCenter/userLogin/loginMenu';
import login from '../components/login';
import dashboard from '../components/dashboard';


Vue.use(Router);

export default new Router({
  // mode: 'history',
  mode: 'hash',
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/menu',
      component: menu,
      children: [
        {
          path: '/menu/dashboard',
          component: dashboard
        },
        {
          path: '/menu/authorization/permission/menu',
          component: permissionMenu
        },
        {
          path: '/menu/authorization/rolePermission/menu',
          component: roleMenu
        },
        {
          path: '/menu/authorization/userRole/menu',
          component: userMenu
        },
        {
          path: '/menu/userCenter/bankCard/menu',
          component: bankCardMenu
        },
        {
          path: '/menu/userCenter/userInfo/menu',
          component: userInfoMenu
        },
        {
          path: '/menu/userCenter/login/menu',
          component: loginMenu
        }, {
          path: '',
          redirect: '/menu/dashboard'
        }
      ]
    },
    {
      path: '/welcome',
      component: welcome
    },
    {
      path: '/customList',
      component: customList
    }, {
      path: '',
      redirect: '/login'
    }
  ]
})
