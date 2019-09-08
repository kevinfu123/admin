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
        <el-table-column label="用户手机号" width="120" align="center">
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
          <template slot-scope="scope">{{scope.row.shopname}}</template>
        </el-table-column>
        <el-table-column label="店铺基础等级" width="180" align="center">
          <template slot-scope="scope">{{scope.row.shopGrade}}</template>
        </el-table-column>
        <el-table-column label="店铺付费等级" width="180" align="center">
          <template slot-scope="scope">{{scope.row.shopvip}}</template>
        </el-table-column>
        <el-table-column label="店铺所有者" width="180" align="center">
          <template slot-scope="scope">{{scope.row.UserNo}}</template>
        </el-table-column>
        <el-table-column label="店铺状态" width="100" align="center">
          <template slot-scope="scope">{{scope.row.UserNo}}</template>
        </el-table-column>
        <el-table-column label="店铺推荐" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.restatus"
              @change="handleStatusChange(scope.$index,scope.row)"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="已缴纳保证金" width="140" align="center">
          <template slot-scope="scope">{{scope.row.memberUsername}}</template>
        </el-table-column>
        <el-table-column label="技术费率免费额度" align="center">
          <template slot-scope="scope">{{scope.row.Freequota}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="text" 
            @click="handleViewDetail(scope.$index, scope.row)">详情</el-button>
            <el-button v-if="scope.row.Freequota ==0" @click="handlequota(scope.row)" type="text" size="small">设置免费额度</el-button>
            <el-button v-if="scope.row.shopstatus==1" @click="handleClick(scope.row)" type="text" size="small">开通店铺</el-button>
            <el-button v-if="scope.row.shopstatus==2" @click="handleClick1(scope.row)" type="text" size="small">关闭店铺</el-button>
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
        <el-form :model="nologyform" status-icon :rules="rules" label-position="right" label-width="130px" ref="nologyform">
            <el-form-item label="技术费免费额度：">
                <el-input v-model="nologyform.quota" placeholder="请输入金额"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="quotaopen('nologyform')">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 关闭店铺弹窗 -->
    <el-dialog
      title="关闭店铺"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span style="text-align:center;display: block;padding:15px 0;">关闭店铺后，店铺相关功能将不可用，确认关闭吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Closeshop">确 定</el-button>
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
  export default {
    name:'userlist',
    data() {
      return {
        rules: {
                reason: [{ required: true, trigger: 'blur', message: '原因不能为空' }],
                account: [{ required: true, trigger: 'blur', message: '请输入金额' }],
                receivables: [{ required: true, trigger: 'blur', message: '请输入收款凭证' }],
                time: [{type: 'date',required: true, trigger: 'change', message: '请选择到账时间' }],
                refund: [{ required: true, trigger: 'blur', message: '请输入退款金额' }],
                bankaccount: [{required: true, trigger: 'blur', message: '请选择银行账户' }],
                quota:[{required: true, type: 'number',trigger: 'blur', message: '额度为数字值'}]
            },
        listQuery:Object.assign({},defaultListQuery),
        list: [{id: 12, memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: '1',shopname: "鼎盛广告传媒",
                balanceAmount: 16377.75,examine:'1',status:'1',restatus:0,shopstatus:1,
                shopGrade:'凌二级',shopvip:'vip3',Freequota:2000,
                },
              {id: 13, memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: '2',shopname: "阿里巴巴",
                balanceAmount: 16377.75,examine:'2',status:'3',restatus:1,shopstatus:2,
                shopGrade:'凌一级',shopvip:'vip1',Freequota:1000,
                },
              {id: 14, memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: '1',shopname: "百度",
                balanceAmount: 16377.75,examine:'3',status:'2',restatus:1,shopstatus:2,
                shopGrade:'凌三级',shopvip:'vip2',Freequota:0,
              }],
        //技术费率
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
      //技术费率
      handlequota(row) {
        this.dialogTitle = "设置额度" ;
        this.dialogFormVisible = true;
      },
      //确认技术费率
      quotaopen(formName) {
        debugger
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      },
      //开通店铺
      handleClick(row) {
        this.$message({
          showClose: true,
          message: '您的店铺开通申请已提交，管理员会在5个工作日内完成审核，请耐心等待!',
          type: 'success'
        });
      },
      //关闭店铺
      handleClick1(row) {

          this.centerDialogVisible = true;
      },
      //确认关闭店铺
      Closeshop() {
          this.centerDialogVisible = false;
         // deleteApply(params).then(response=>{
            //   this.getList();
            //   this.$message({
            //     type: 'success',
            //     message: '关闭成功!'
            //   });
            // });
      },
      //修改状态
      handleStatusChange(index,row){
        let id = row.id;
        let param = {
          id:id,
          status:row.restatus
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
      //查看详情
      handleViewDetail(index,row){
        if(row.renType=='1'){//个人
          this.$router.push({path:'/Shopconduct/beenShopDetail',query:{id:row.id,type:'first'}})
        }else{//企业
          this.$router.push({path:'/Shopconduct/beencompanyDetail',query:{id:row.id,type:'first'}})
        }
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
      },

      /**
       * 表单关闭时事件
      */
      handleClose() {
          this.$refs.nologyform.resetFields();
      },
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

