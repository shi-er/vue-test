<template>

  <div style="padding: 20px;">
    <el-form :model="rowData" label-width="120px" ref="rowData" size="mini" :inline="true">
      <el-form-item label="名称" prop="title">
        <el-input v-model="rowData.title"/>
      </el-form-item>
      <el-form-item label="地址" prop="url">
        <el-input v-model="rowData.url"/>
      </el-form-item>
      <el-form-item label="权限code" prop="permcode">
        <el-input v-model="rowData.permcode"/>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="rowData.description"/>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="rowData.state">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <template>
          <el-radio-group v-model="rowData.type">
            <el-radio :label="0">菜单</el-radio>
            <el-radio :label="1">功能</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item label="父类" prop="pid">
        <el-select v-model="rowData.pid" placeholder="请选择父类">
          <el-option label="菜单" value="0"></el-option>
          <el-option v-for="pid in pids" :label="pid.name" :value="pid.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-select v-model="rowData.icon" placeholder="请选择图标">
          <el-option v-for="ico in icons" :label="ico.name" :value="ico.icon"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" style="float: right;">
      <el-button @click="cancleDialog">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  import qs from 'qs';

  export default {
    name: "project-info",
    props: {
      rowData: Object,
    },
    data() {
      return {
        icons: [],
        pids: [],
        form: {},
      };
    },
    methods: {
      handleSubmit(data) {
        // 提交数据
        this.$emit('closeDialog', JSON.parse(JSON.stringify(this.rowData)));
      },
      cancleDialog() {
        this.$emit('closeDialog', 'cancel');
      },
      getIcons() {
        let url = '/basic/permission/icons';
        axios.get(url,
          qs.stringify({})).then((response) => {
          this.icons = response.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      getPids() {
        let url = '/basic/permission/pids';
        axios.get(url,
          qs.stringify({})).then((response) => {
          this.pids = response.data;
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    created() {
      this.getIcons();
      this.getPids();
    },
  }

</script>

<style scoped>

</style>

