<template>
  <div style="padding: 20px;">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item style="float: right">
          <el-button type="primary" @click="getData" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-select v-model="type" placeholder="请选择类型">
            <el-option label="菜单" value="0"></el-option>
            <el-option label="功能" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-input placeholder="权限code" v-model="permCode"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="addNewProject({})" icon="el-icon-plus">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      :data="rows"
      style="width: 100%">
      <el-table-column
        label="id">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
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
        label="地址">
        <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="权限code">
        <template slot-scope="scope">
          <span>{{scope.row.permcode}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="排序">
        <template slot-scope="scope">
          <span>{{scope.row.sort}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="描述">
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="171">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="addNewProject(scope.row)"><i class="el-icon-edit"></i>编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"><i class="el-icon-delete"></i>删除
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleSetSort(scope.row.id,scope.row.sort,0)"><i class="el-icon-caret-top"></i>置顶
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleSetSort(scope.row.id,scope.row.sort,1)"><i class="el-icon-caret-top"></i>上移
          </el-button>
          <el-button
            size="mini"
            type="warning"
            @click="handleSetSort(scope.row.id,scope.row.sort,2)"><i class="el-icon-caret-bottom"></i>下移
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
  import editPermission from './editPermission'

  export default {
    name: "menus",
    data() {
      return {
        dialogTableVisible: false,
        permCode: '',
        type: '',
        total: 0,
        currentPage: 1,
        pageSize: 10,
        rows: [],
        rowData: {
          "description": null,
          "icon": null,
          "id": null,
          "permcode": null,
          "pid": null,
          "sort": null,
          "state": null,
          "title": null,
          "type": null,
          "url": null
        }
      }
    },
    components: {
      editPermission
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
        let url = '/basic/permission/list?_index=' + ((this.currentPage - 1) * this.pageSize) + '&_size=' + this.pageSize;
        if (this.permCode !== '') {
          url = url + "&permCode=" + this.permCode;
        }
        if (this.type !== '') {
          url = url + "&type=" + this.type;
        }
        axios.get(url,
          qs.stringify({})).then((response) => {
          this.rows = response.data.rows;
          this.total = response.data.total;
        }).catch((error) => {
          console.log(error);
        });
      },
      //编辑
      editData(data) {
        let url = '/basic/permission/update';
        axios.post(url,
          qs.stringify({
            id: data.id,
            title: data.title,
            url: data.url,
            permcode: data.permcode,
            description: data.description,
            state: data.state,
            type: data.type,
            icon: data.icon,
            pid: data.pid
          })).then((response) => {
          if (response.data == true) {
            this.$message({
              type: 'success',
              message: '编辑成功'
            });
            this.getData();
          } else {
            this.$message({
              type: 'info',
              message: '编辑失败'
            });
          }
        }).catch((error) => {
          this.$message({
            type: 'info',
            message: error
          });
        });
      },
      getCurrentDateTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      //删除
      handleDelete(id) {
        this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete('/basic/permission/pids?id=' + id,
            qs.stringify({})).then((response) => {
            if (response.data == true) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.getData();
            } else {
              this.$message({
                type: 'info', message: '删除失败' + id
              });
            }
          }).catch((error) => {
            this.$message({
              type: 'info', message: error
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSetSort(id, sort, status) {
        axios.put('/basic/permission/sort',
          qs.stringify({
            id: id,
            sort: sort,
            status: status
          })).then((response) => {
          if (response.data == true) {
            this.$message({
              type: 'success', message: '操作成功'
            });
            this.getData();
          } else {
            this.$message({
              type: 'info', message: '操作失败'
            });
          }
        }).catch((error) => {
          this.$message({
            type: 'info', message: error
          });
        });
      },
      addNewProject(rowData) {
        this.rowData = rowData;
        this.dialogTableVisible = true;
        // this.$store.state.leftNav = false;
        this.$emit('leftMenuStatus', false);
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
    }
    ,
    mounted() {
      this.getData();
    }
    ,
  }
</script>

<style scoped>

</style>
