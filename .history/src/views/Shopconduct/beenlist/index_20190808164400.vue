<template> 
  <div class="app-container app-head">
    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="80px">
            <el-form-item label="入驻类型">
              <el-select
                size="small"
                v-model="listQuery.Settled" clearable placeholder="">
                <el-option
                  v-for="item in listdata"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="店铺状态">
              <el-select
                size="small"
                v-model="listQuery.shopstatus" clearable placeholder="">
                <el-option
                  v-for="item in listdata1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开通日期">
              <div class="block">
                <el-date-picker
                  v-model="listQuery.Openingdate"
                  type="daterange"
                  start-placeholder="起始"
                  end-placeholder="结束"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <el-input
                size="small"
                placeholder="关键字"
                v-model="listQuery.AllName"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="float:right"
                type="primary"
                @click="handleSearchList()"
                size="small">
                查询
              </el-button>
            </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table ref="returnApplyTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label="用户手机号" width="160" align="center">
          <template slot-scope="scope">{{scope.row.phoneNO}}</template>
        </el-table-column>
        <el-table-column label="入驻类型" width="100" align="center">
          <template slot-scope="scope">
              <el-tag
                :type="scope.row.renType === '1' ? 'danger' : 'success'"
                disable-transitions>{{scope.row.renType === '1' ? '个人' : '企业'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" width="180" align="center">
          <template slot-scope="scope">{{scope.row.UserNo}}</template>
        </el-table-column>
        <el-table-column label="店铺基础等级" width="180" align="center">
          <template slot-scope="scope">{{scope.row.UserNo}}</template>
        </el-table-column>
        <el-table-column label="店铺付费等级" width="180" align="center">
          <template slot-scope="scope">{{scope.row.UserNo}}</template>
        </el-table-column>
        <el-table-column label="店铺所有者" width="180" align="center">
          <template slot-scope="scope">{{scope.row.UserNo}}</template>
        </el-table-column>
        <el-table-column label="店铺状态" width="180" align="center">
          <template slot-scope="scope">{{scope.row.UserNo}}</template>
        </el-table-column>
        <el-table-column label="已缴纳保证金" width="180" align="center">
          <template slot-scope="scope">{{scope.row.memberUsername}}</template>
        </el-table-column>
        <el-table-column label="技术费率免费额度" width="180" align="center">
          <template slot-scope="scope">{{scope.row.Username}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="text" 
            @click="handleViewDetail(scope.$index, scope.row)">详情</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">设置免费额度</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">开通店铺</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">关闭店铺</el-button>
          </template>
        </el-table-column>
      </el-table>
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

    <!-- 技术费率弹窗 -->
    <el-dialog :title="dialogTitle" width="500px" @close="handleClose" class="demo-ruleForm" :visible.sync="dialogFormVisible">
        <el-form :model="nologyform" status-icon :rules="rules" label-position="right" label-width="120px" ref="ValidateForm">
            <el-form-item prop="reason" label="技术费免费额度：">
                <el-input v-model="nologyform.quota" placeholder="请输入原因"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 关闭店铺弹窗 -->
    <el-dialog
      title="关闭店铺"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span style="text-align:center;">关闭店铺后，店铺相关功能将不可用，确认关闭吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {fetchList,deleteApply} from '@/api/conduct/conduct';
  const defaultListQuery = {
    Settled:null,
    shopstatus:null,
    Openingdate:null,
    AllName:null,
    pageNum: 1,
    pageSize: 15,
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
        list: [{id: 12, memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: '1',UserNo: "201809150101000001",
                balanceAmount: 16377.75,examine:'1',status:'1',
                createTime: "2018-09-15T04:24:27.000+0000",
                },
              {id: 13, memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: '2',UserNo: "201809150101000001",
                balanceAmount: 16377.75,examine:'2',status:'3',
                createTime: "2018-09-15T04:24:27.000+0000",
                },
              {id: 14, memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: '1',UserNo: "201809150101000001",
                balanceAmount: 16377.75,examine:'3',status:'2',
                createTime: "2018-09-15T04:24:27.000+0000",
              }],
        //
        nologyform:{
            id:null,
            quota:null,
        },
        dialogTitle:'',
        dialogFormVisible:false,
        centerDialogVisible:false,
        total:null,
        listLoading:false,
        multipleSelection:[],
        operateType:1,
        listdata:[
          {
            label: "企业",
            value: 1
          },
          {
            label: "个人",
            value: 2
          }],
        listdata1:[
          {
            label: "已开通",
            value: 1
          },
          {
            label: "已关闭",
            value: 2
          }],
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
<style rel="stylesheet/scss" lang="scss" scoped>
  .input-width {
    width: 150px;
  }
  .el-select {
    width: 120px;
  }
  
  .app-container {
      .el-card {

        .el-form {
            .el-date-editor {

              width: 300px;
              .el-range-input {
                width: 100px;
              }
            }
            
        }
      }
  }
</style>
<style lang="scss">
  .app-head {
    .el-card {
      .el-card__body {
        padding: 0;
      }
    }
  }
</style>

