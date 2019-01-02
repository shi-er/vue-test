<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item style="float: right">
          <el-button type="primary" @click="getData" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-input placeholder="权限code" v-model="permCode"/>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      :data="rows"
      style="width: 100%">
      <el-table-column
        label="PID">
        <template slot-scope="scope">
          <span>{{scope.row.pid}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="描述">
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="权限code">
        <template slot-scope="scope">
          <span>{{scope.row.permcode}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type===0">菜单</span>
          <span v-else>功能</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state===1" style="color: mediumblue">正常</span>
          <span v-else style="color: red">禁用</span>
        </template>
      </el-table-column>
      <el-table-column
        label="父类">
        <template slot-scope="scope">
          <span>{{scope.row.parentName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="171">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status===1"
                     size="mini"
                     type="danger"
                     @click="editRolePs(scope.row.id,0)"><i class="el-icon-edit"></i>取消
          </el-button>
          <el-button v-if="scope.row.status===0"
                     size="mini"
                     type="primary"
                     @click="editRolePs(scope.row.id,1)"><i class="el-icon-edit"></i>开通
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-col>
  </div>
</template>
<script>
  import axios from 'axios';
  import qs from 'qs';

  export default {
    name: "editRolePermission",
    props: {
      rowId: Number,
    },
    data() {
      return {
        permCode: '',
        total: 0,
        currentPage: 1,
        pageSize: 10,
        rows: [],
      };
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getData();
      },
      //获取列表
      getData() {
        let url = process.env.API_HOST + 'basic/role/permission/getList?rid=' + this.rowId + '&_index=' + ((this.currentPage - 1) * this.pageSize) + '&_size=' + this.pageSize;
        if (this.permCode !== '') {
          url = url + "&permCode=" + this.permCode;
        }
        axios.get(url,
          qs.stringify({})).then((response) => {
          this.rows = response.data.rows;
          this.total = response.data.total;
        }).catch((error) => {
          console.log(error);
        });
      },
      editRolePs(id, status) {
        let url = process.env.API_HOST + 'basic/role/permission/update';
        axios.put(url,
          qs.stringify({
            id: id,
            status: status,
            rid: this.rowId
          })).then((response) => {
          if (response.data === true) {
            this.$message({
              type: 'success',
              message: '配置成功'
            });
            this.getData();
          } else {
            this.$message({
              type: 'info',
              message: '配置失败'
            });
          }
        }).catch((error) => {
          this.$message({
            type: 'info',
            message: error
          });
        });
      },
      cancleDialog() {
        this.$emit('closeDialog', 'cancel');
      },
    },
    mounted() {
      this.getData();
    },
  }
</script>

<style scoped>

</style>
