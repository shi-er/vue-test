<template>
  <div style="padding: 10%;">
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" style="text-align: center">
        <el-form-item>
          <el-input placeholder="手机号" v-model="mobile"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser" icon="el-icon-edit">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<script>
  import axios from 'axios';
  import qs from 'qs';

  export default {
    name: "editUserRole",
    props: {
      rowId: Number,
    },
    data() {
      return {
        mobile: ''
      };
    },
    methods: {
      addUser() {
        // 提交数据
        let url = process.env.API_HOST + 'basic/role/user/update';
        axios.put(url,
          qs.stringify({
            mobile: this.mobile,
            status: status,
            rid: this.rowId
          })).then((response) => {
          if (response.data === true) {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
          } else {
            this.$message({
              type: 'info',
              message: '添加成功'
            });
          }
        }).catch((error) => {
          this.$message({
            type: 'info',
            message: error
          });
        });
        this.$emit('closeDialog', 'success');
      },
      cancleDialog() {
        this.$emit('closeDialog', 'cancel');
      },
    },
    created() {
    },
  }
</script>

<style scoped>

</style>
