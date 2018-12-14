<template>

  <div style="padding: 20px;">
    <el-table
      :data="loginLogList"
      style="width: 100%">
      <el-table-column
        label="记录id">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="登录账号">
        <template slot-scope="scope">
          <span>{{scope.row.account}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="登录人姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="登录地址">
        <template slot-scope="scope">
          <span>{{scope.row.login_ip}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="登录时间">
        <template slot-scope="scope">
          <span>{{scope.row.login_time}}</span>
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
  import moment from "moment";


  export default {
    name: "login-log",
    data() {
      return {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        loginLogList: []
      };
    },
    components: {},
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
        let urlHost = process.env.API_HOST + 'login/record?page=' + this.currentPage + '&size=' + this.pageSize;
        axios.get(urlHost)
          .then((res) => {
            let testData = [];
            let loginRecord = res.data.data.loginData;
            for (let i = 0; i < loginRecord.length; i++) {
              let dataObj = {
                'id': loginRecord[i].id,
                'account': loginRecord[i].uid,
                'user_name': loginRecord[i].realName,
                'login_ip': loginRecord[i].loginAdress.address,
                'login_time': this.getCurrentDateTime(loginRecord[i].loginTime)
              };
              testData.push(dataObj);
            }
            this.loginLogList = testData;
            this.total = res.data.data.total;
          }).catch(error => {
          alert(error.toString());
        });
      },
      getCurrentDateTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
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

