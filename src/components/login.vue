<template>
  <div class="login-page-container">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit2" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';

  export default {
    props: {},
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
            //{ validator: validaePass }
          ],
          checkPass: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleSubmit2(ev) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = {
              username: this.ruleForm2.account,
              password: this.ruleForm2.checkPass
            };
            axios.post(process.env.API_HOST + '/login',
              qs.stringify({
                mobile: this.ruleForm2.account,
                pwd: this.ruleForm2.checkPass,
              })).then(function (response) {
              if (response.data.code === 0) {
                this.logining = false;
                sessionStorage.setItem('user', JSON.stringify(loginParams));
                this.$router.push({path: '/menu'});
              } else {
                this.logining = false;
                this.$alert(response.data.msg, '提示信息', {
                  confirmButtonText: '确定'
                });
              }
            }).catch(function (error) {
              console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getMenus() {
        let url = process.env.API_HOST + 'basic/permission/data';
        axios.get(url,
          qs.stringify({})).then((response) => {
          if (response.data.code === 0) {
            this.$router.push({path: '/menu'});
          }
        }).catch((error) => {
          console.log(error);
        });
      },
    }, mounted() {
      this.getMenus();
    }
  }
</script>

<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  label.el-checkbox.remember {
    margin: 0px 0px 35px 0px;
  }
</style>
