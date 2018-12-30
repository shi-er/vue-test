<template>

  <div style="padding: 20px;">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" v-on:click="handleEdit({})" icon="el-icon-plus">添加</el-button>
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
        label="角色">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="171">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"><i class="el-icon-edit"></i>编辑
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleEditPermission(scope.row.id)"><i class="el-icon-edit"></i>编辑权限
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleEditUser(scope.row.id)"><i class="el-icon-edit"></i>编辑用户
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"><i class="el-icon-delete"></i>删除
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
    <el-dialog title="编辑角色" :visible.sync="dialogTableVisible" @close="dialogClose" :modal-append-to-body="false"
               :width="'60%'">
      <editRole @closeDialog="successClose" :rowData="rowData"></editRole>
    </el-dialog>
  </div>

</template>
<script>
  import axios from 'axios'
  import qs from 'qs';
  import moment from "moment";
  import editRole from './editRole'

  export default {
    name: "role",
    data() {
      return {
        dialogTableVisible: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        rows: [],
        rowData: {}
      };
    },
    components: {
      editRole
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getRecordData();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getRecordData();
      },
      getRecordData() {
        // 会自动判断当前是开发还是生产环境，然后自动匹配API_HOST
        let url = process.env.API_HOST + 'basic/role/getList?page=' + this.currentPage + '&size=' + this.pageSize;
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
      //角色编辑
      handleEdit(rowData) {
        this.rowData = rowData;
        this.dialogTableVisible = true;
        // this.$store.state.leftNav = false;
        this.$emit('leftMenuStatus', false);
      },
      //编辑权限
      handleEditPermission(id) {

      },
      //用户编辑
      handleEditUser(id) {

      },
      //删除角色
      handleDelete(id) {

      },
      dialogClose() {
        // this.$store.state.leftNav = true;
        this.$emit('leftMenuStatus', true);
      },
      successClose(data) {
        this.dialogTableVisible = false;
        if (data != "cancel") {
          this.editData(data);
        }
      }
    },
    created() {
      this.getRecordData();
    },
  }
</script>

<style scoped>
  .el-checkbox {
    font-weight: 400;
  }

  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0;
  }

  .el-form-item {
    margin-bottom: 10px;
  }
</style>


