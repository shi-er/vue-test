<template>
  <div style="padding: 10%;">
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" style="text-align: center">
        <el-form-item>
          <el-input placeholder="手机号" v-model="mobile"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData" icon="el-icon-edit">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<script>
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
