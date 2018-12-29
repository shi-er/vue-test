import Vue from 'vue'
import Router from 'vue-router'
import welcome from '../components/welcome'
import customList from '../components/customList'
import login from '../components/login'
import permission from '../components/authorization/permission/permission';
import permissionMenu from '../components/authorization/permission/permissionMenu';
import roleMenu from '../components/authorization/rolePermission/roleMenu';
import userMenu from '../components/authorization/userRole/userMenu';
import bankCardMenu from '../components/userCenter/bankCard/bankCardMenu';
import userInfoMenu from '../components/userCenter/user/userInfoMenu';
import loginMenu from '../components/userCenter/userLogin/loginMenu';


Vue.use(Router);

export default new Router({
  // mode: 'history',
  mode: 'hash',
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
        },
        {
          path: '/userCenter/bankCard/menu',
          component: bankCardMenu
        },
        {
          path: '/userCenter/userInfo/menu',
          component: userInfoMenu
        },
        {
          path: '/userCenter/login/menu',
          component: loginMenu
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
