<template>
  <div>
    <div class="container">
      <div class="logo"><a href="/">后台管理系统</a></div>
      <div class="left_open">
        <i title="展开左侧栏" class="iconfont">&#xe699;</i>
      </div>
      <ul class="layui-nav right">
        <li class="layui-nav-item">
          <a href="javascript:;">admin</a>
          <dl class="layui-nav-child"> <!-- 二级菜单 -->
            <dd><a class="hrefCss" onclick="x_admin_show('个人信息','http://www.baidu.com')">个人信息</a></dd>
            <dd><a class="hrefCss" onclick="x_admin_show('切换帐号','http://www.baidu.com')">切换帐号</a></dd>
            <dd><a href="authorization">退出</a></dd>
          </dl>
        </li>
        <li class="layui-nav-item to-index"><a href="/">前台首页</a></li>
      </ul>
    </div>
    <!-- 顶部结束 -->
    <!-- 中部开始 -->
    <!-- 左侧菜单开始 -->
    <div class="left-nav" v-show="leftMenuStatu">
      <div id="side-nav">
        <ul id="nav">
          <li v-for="item in leftMenus">
            <a>
              <i class="iconfont">{{item.icon}}</i>
              <cite>{{item.title}}</cite>
              <i class="iconfont nav_right">&#xe697;</i>
            </a>
            <ul class="sub-menu">
              <li v-for="subItem in item.subMenus">
                <router-link :to="subItem.component">
                  <i class="iconfont">{{subItem.icon}}</i>{{subItem.title}}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- 左侧菜单结束 -->
    <!-- 右侧主体开始 -->
    <div class="page-content">
      <div class="layui-tab tab">
        <ul class="layui-tab-title">
        </ul>
        <div class="layui-tab-content">
          <div class="layui-tab-item layui-show" style="overflow:auto;">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div class="page-content-bg"></div>
    <!-- 右侧主体结束 -->
    <!-- 中部结束 -->
    <!-- 底部开始 -->
    <div class="footer">
      <div class="copyright">{{msg}}</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs';

  export default {
    name: 'permission',
    data() {
      return {
        leftMenuStatu: true,
        leftMenus: [],
        msg: 'Copyright © 2018 十二',
        openMenus: ['首页'], // 记录打开了的菜单名称，用于寻找第几个菜单
      }
    },
    components: {},
    methods: {
      getMenus() {
        let url = process.env.API_HOST + 'basic/permission/data';
        axios.get(url,
          qs.stringify({})).then((response) => {
          if (response.data.code !== 0) {
            this.$router.push({path: '/login'});
          }
        }).catch((error) => {
          console.log(error);
        });
      },
    },
    mounted() {
      this.leftMenus = [{
        title: '基础信息',
        icon: "",
        subMenus: [{
          title: '权限管理',
          icon: "",
          component: '/menu/authorization/permission/menu'
        },
          {
            title: '角色管理',
            icon: "",
            component: '/menu/authorization/rolePermission/menu'
          },
          {
            title: '用户角色',
            icon: "",
            component: '/menu/authorization/userRole/menu'
          }]
      },
        {
          title: '用户中心',
          icon: "",
          subMenus: [{
            title: '用户管理',
            icon: "",
            component: '/menu/userCenter/userInfo/menu'
          }, {
            title: '登录记录',
            icon: "",
            component: '/menu/userCenter/login/menu'
          }, {
            title: '银行卡',
            icon: "",
            component: '/menu/userCenter/bankCard/menu'
          }]
        }];
      this.getMenus();
    }
  }
</script>

<style>
  .hrefCss {
    cursor: pointer;
  }
</style>

