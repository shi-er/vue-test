<template>

  <div style="padding: 20px;">
    <el-form :model="rowData" label-width="120px" ref="rowData" size="mini" :inline="true">
      <el-form-item label="角色" prop="name">
        <el-input v-model="rowData.name"/>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="rowData.description"/>
      </el-form-item>
    </el-form>
    <div slot="footer" style="float: right;">
      <el-button @click="cancleDialog">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>

</template>

<script>

  export default {
    name: "project-info",
    props: {
      rowData: Object,
    },
    data() {
      return {
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
    },
    created() {
    },
  }

</script>

<style scoped>

</style>

