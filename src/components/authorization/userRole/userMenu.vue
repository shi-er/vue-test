<template>
  <div style="padding: 20px;">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item style="float: right;">
          <el-button type="primary" @click="getData" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-input placeholder="手机号" v-model="mobile"/>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="rows"
      style="width: 100%">
      <el-table-column
        label="Id">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="UID">
        <template slot-scope="scope">
          <span>{{scope.row.uid}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="角色名称">
        <template slot-scope="scope">
          <span>{{scope.row.roleName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="171">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"><i class="el-icon-delete"></i>删除用户权限
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
  import axios from 'axios'
  import qs from 'qs';
  import moment from "moment";

  export default {
    name: "user",
    data() {
      return {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        rows: [],
        mobile: ''
      };
    },
    components: {},
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getData();
      },
      getData() {
        let url = process.env.API_HOST + 'basic/role/user/getList?page=' + this.currentPage + '&size=' + this.pageSize;
        if (this.mobile !== '' && this.mobile.length === 11) {
          url = url + '&mobile=' + this.mobile;
        }
        axios.get(url,
          qs.stringify({})).then((response) => {
          this.rows = response.data.rows;
          this.total = response.data.total;
        }).catch((error) => {
          console.log(error);
        });
      },
      getCurrentDateTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      //删除
      handleDelete(id) {

      }
    },
    created() {
      this.getData();
    },
  }
</script>

<style scoped>

</style>
