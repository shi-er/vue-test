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
        <el-form-item style="float: right">
          <el-input placeholder="卡号" v-model="cardNo"/>
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
          <span>{{scope.row.accountName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.contactMobile}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="身份证号">
        <template slot-scope="scope">
          <span>{{scope.row.idNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="卡号">
        <template slot-scope="scope">
          <span>{{ scope.row.cardNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="卡类型">
        <template slot-scope="scope">
          <span v-if="scope.row.cardType===1">借记卡</span>
          <span v-if="scope.row.cardType===2">贷记卡</span>
          <span v-if="scope.row.cardType===3">准贷记卡</span>
          <span v-if="scope.row.cardType===4">其他</span>
        </template>

      </el-table-column>
      <el-table-column
        label="卡名称">
        <template slot-scope="scope">
          <span>{{ scope.row.cardName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="银行名称">
        <template slot-scope="scope">
          <span>{{ scope.row.bankName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status===1" style="color: mediumblue">正常</span>
          <span v-else style="color: red">禁用</span>
        </template>
      </el-table-column>
      <el-table-column
        label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="添加时间">
        <template slot-scope="scope">
          <span>{{getCurrentDateTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="修改时间">
        <template slot-scope="scope">
          <span>{{getCurrentDateTime(scope.row.modifyTime)}}</span>
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
    name: "bankCardMenu",
    data() {
      return {
        dialogTableVisible: false,
        mobile: '',
        cardNo:'',
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
        let url = process.env.API_HOST +'/user/bank/card/getList?_index=' + ((this.currentPage - 1) * this.pageSize) + '&_size=' + this.pageSize;
        if (this.mobile !== '') {
          url = url + "&mobile=" + this.mobile;
        }
        if (this.cardNo !== '') {
          url = url + "&cardNo=" + this.cardNo;
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
