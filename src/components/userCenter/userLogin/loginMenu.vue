<template>
  <div style="padding: 20px;">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item style="float: right">
          <el-button type="primary" @click="getData" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-input placeholder="手机号" v-model="mobile"/>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      :data="rows"
      style="width: 100%">
      <el-table-column
        label="ID">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户ID">
        <template slot-scope="scope">
          <span>{{scope.row.uid}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.realname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="登录地址">
        <template slot-scope="scope">
          <span>{{ JSON.parse(scope.row.loginAdress).address }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="登录时间">
        <template slot-scope="scope">
          <span>{{getCurrentDateTime(scope.row.loginTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="171">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="addNewProject(scope.row)"><i class="el-icon-edit"></i>编辑
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
    <el-dialog title="项目信息" :visible.sync="dialogTableVisible" @close="dialogClose" :modal-append-to-body="false"
               :width="'80%'">
      <editPermission @closeDialog="successClose" :rowData="rowData"></editPermission>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  import moment from "moment";

  export default {
    name: "loginMenu",
    data() {
      return {
        dialogTableVisible: false,
        mobile: '',
        total: 0,
        currentPage: 1,
        pageSize: 10,
        rows: [],
        rowData: {}
      }
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
        let url = '/user/login/getList?_index=' + ((this.currentPage - 1) * this.pageSize) + '&_size=' + this.pageSize;
        if (this.mobile !== '') {
          url = url + "&mobile=" + this.mobile;
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
      dialogClose() {
        this.$emit('leftMenuStatus', true);
      },
      successClose(data) {
        this.dialogTableVisible = false;
        if (data != "cancel") {
          this.editData(data);
        }
      },
      getCurrentDateTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    mounted() {
      this.getData();
    },
  }
</script>

<style scoped>

</style>
