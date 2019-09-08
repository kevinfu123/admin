<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="80px">
          <el-form-item label="用户昵称">
            <el-input v-model="listQuery.id" class="input-width" placeholder="服务单号"></el-input>
          </el-form-item>
          <el-form-item label="注册时间">
              <el-date-picker
                v-model="listQuery.createTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="listQuery.handleMan" class="input-width" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="float:right"
              type="primary"
              @click="handleSearchList()"
              size="small">
              搜索
            </el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button
              style="float:right;margin-right: 15px"
              @click="handleResetSearch()"
              size="small">
              添加会员
            </el-button>
          </el-form-item> -->
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table ref="returnApplyTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: 0,
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="用户编号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.UserNo}}</template>
        </el-table-column>
        <el-table-column label="用户昵称" width="180" align="center">
          <template slot-scope="scope">{{scope.row.memberUsername}}</template>
        </el-table-column>
        <el-table-column label="用户姓名" width="180" align="center">
          <template slot-scope="scope">{{scope.row.Username}}</template>
        </el-table-column>
        <el-table-column label="手机号码" width="180" align="center">
          <template slot-scope="scope">{{scope.row.phoneNO}}</template>
        </el-table-column>
        <el-table-column label="账户余额" width="180" align="center">
          <template slot-scope="scope"><span @click="handleViewDetail1(scope.$index,scope.row)">￥{{scope.row.balanceAmount}}</span></template>
        </el-table-column>
        <el-table-column label="实名认证" width="180" align="center">
          <template slot-scope="scope">
              <el-tag
                :type="scope.row.renType === '1' ? 'danger' : 'success'"
                disable-transitions>{{scope.row.renType === '1' ? '未认证' : '已认证'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="状态是否禁用" width="200" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="handleStatusChange(scope.$index,scope.row)"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleViewDetail(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[15,30,50]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {fetchList,deleteApply} from '@/api/returnApply';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 15,
    id: null,
    status: null,
    createTime: null,
  };
  const defaultStatusOptions=[
    {
      label: '待处理',
      value: 0
    },
    {
      label: '退货中',
      value: 1
    },
    {
      label: '已完成',
      value: 2
    },
    {
      label: '已拒绝',
      value: 3
    }
  ];
  export default {
    name:'userlist',
    data() {
      return {
        listQuery:Object.assign({},defaultListQuery),
        statusOptions: Object.assign({},defaultStatusOptions),
        list: [{id: 12, memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: 0,UserNo: "201809150101000001",
                balanceAmount: 16377.75,
                createTime: "2018-09-15T04:24:27.000+0000",
                },
              {id: 13, memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: 0,UserNo: "201809150101000001",
                balanceAmount: 16377.75,
                createTime: "2018-09-15T04:24:27.000+0000",
                },
              {id: 14, memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: 0,UserNo: "201809150101000001",
                balanceAmount: 16377.75,
                createTime: "2018-09-15T04:24:27.000+0000",
                },
              {id: 15, memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: 0,UserNo: "201809150101000001",
                balanceAmount: 16377.75,
                createTime: "2018-09-15T04:24:27.000+0000",
                },
              {id: 16, memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: 0,UserNo: "201809150101000001",
                balanceAmount: 16377.75,
                createTime: "2018-09-15T04:24:27.000+0000",
                }
              ],
        total:null,
        listLoading:false,
        multipleSelection:[],
        operateType:1,
        operateOptions: [
          {
            label: "批量删除",
            value: 1
          },
          {
            label: "批量停用",
            value: 2
          },
          {
            label: "批量启用",
            value: 3
          }
        ],
      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatTime(time) {
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStatus(status){
        for(let i=0;i<defaultStatusOptions.length;i++){
          if(status===defaultStatusOptions[i].value){
            return defaultStatusOptions[i].label;
          }
        }
      },
    },
    methods:{
      //修改状态
      handleStatusChange(index,row){
        let id = row.id;
        let param = {
          id:id,
          status:row.status
        };
        console.log(param);
        // updateStatus(param).then(response=>{
        //   this.$message({
        //     message: '状态修改成功',
        //     type: 'success'
        //   });
        // });
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      //账户余额跳转
      handleViewDetail1(index,row){
        this.$router.push({path:'/conduct/userDetail',query:{id:row.id,type:'second'}})
      },
      //查看详情
      handleViewDetail(index,row){
        this.$router.push({path:'/conduct/userDetail',query:{id:row.id,type:'first'}})
      },
      handleBatchOperate(){
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要操作的申请',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let ids=[];
        for(let i=0;i<this.multipleSelection.length;i++){
          ids.push(this.multipleSelection[i].id);
        }
        var params = {
          ids:ids,
          statustype:this.operateType
        }
        console.log(operatejson);
        if(this.operateType===1){
          //批量删除
          this.$confirm('是否要进行删除操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // deleteApply(params).then(response=>{
            //   this.getList();
            //   this.$message({
            //     type: 'success',
            //     message: '删除成功!'
            //   });
            // });
          })
        }else if(this.operateType===2){
          this.$confirm('是否要进行停用操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // deleteApply(params).then(response=>{
            //   this.getList();
            //   this.$message({
            //     type: 'success',
            //     message: '停用成功!'
            //   });
            // });

          })
        }else{
          this.$confirm('是否要进行启用操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // deleteApply(params).then(response=>{
            //   this.getList();
            //   this.$message({
            //     type: 'success',
            //     message: '启用成功!'
            //   });
            // });
          })
        }
        
        
      },
      handleSizeChange(val){
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.getList();
      },
      getList(){
        this.total = 5;
        console.log(this.listQuery);
        // this.listLoading=true;
        // fetchList(this.listQuery).then(response => {
        //   this.listLoading = false;
        //   this.list = response.data.list;
        //   this.total = response.data.total;
        // });
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


