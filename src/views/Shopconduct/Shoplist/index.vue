<template> 
  <div class="app-container app-allhead">
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
          <el-form-item label="实名认证状态" label-width="100px">
            <el-select
              size="small"
              v-model="listQuery.status" clearable placeholder="">
              <el-option
                v-for="item in listdata1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="技能状态">
            <el-select
              size="small"
              v-model="listQuery.Skillstatus" clearable placeholder="">
              <el-option
                v-for="item in listdata2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保证金状态" label-width="90px">
            <el-select
              size="small"
              v-model="listQuery.bondstatus" clearable placeholder="">
              <el-option
                v-for="item in listdata3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select
              size="small"
              v-model="listQuery.examine" clearable placeholder="">
              <el-option
                v-for="item in listdata4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              size="small"
              placeholder="用户名称/店铺名称"
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
              搜索
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
        <el-table-column label="用户昵称" width="180" align="center">
          <template slot-scope="scope">{{scope.row.memberUsername}}</template>
        </el-table-column>
        <el-table-column label="用户手机号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.phoneNO}}</template>
        </el-table-column>
        <el-table-column label="申请入驻时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
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
        <el-table-column label="实名认证状态" width="180" align="center">
          <template slot-scope="scope">
                <el-tag type="danger" size="mini" v-if="scope.row.status=='1'">
                    未申请   
                </el-tag>
                <el-tag type="success" size="mini" v-else-if="scope.row.status=='2'">
                    已通过
                </el-tag>
                <el-tag type="info" size="mini" v-else-if="scope.row.status=='3'">
                    未通过
                </el-tag>
                <el-tag  size="mini" v-else-if="scope.row.status==='4'">
                    待审核
                </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="入驻技能状态" width="180" align="center">
          <template slot-scope="scope">
              <el-tag
                :type="scope.row.renType === '1' ? 'danger' : 'success'"
                disable-transitions>{{scope.row.renType === '1' ? '未入驻' : '已入驻'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="保证金状态" width="180" align="center">
          <template slot-scope="scope">
              <el-tag
                :type="scope.row.renType === '1' ? 'danger' : 'success'"
                disable-transitions>{{scope.row.renType === '1' ? '未缴纳' : '已缴纳'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请审核状态" width="180" align="center">
          <template slot-scope="scope">
                <el-tag type="danger" size="mini" v-if="scope.row.examine=='1'">
                    待审核 
                </el-tag>
                <el-tag type="success" size="mini" v-else-if="scope.row.examine=='2'">
                    已通过
                </el-tag>
                <el-tag type="info" size="mini" v-else-if="scope.row.examine=='3'">
                    未通过
                </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right"
             label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleViewDetail(scope.$index, scope.row)" type="text" size="mini">详情</el-button>
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
  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {shopList,deleteshop} from '@/api/shoplist/show';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 15,
    Settled:null,
    status:null,
    Skillstatus:null,
    bondstatus:null,
    examine:null,
    AllName:null
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
    name:'Shoplist',
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
                },
              {id: 15, memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: '2',UserNo: "201809150101000001",
                balanceAmount: 16377.75,examine:'2',status:'2',
                createTime: "2018-09-15T04:24:27.000+0000",
                },
              {id: 16, memberId: 1,phoneNO: "13957203844",memberUsername: "test",Username: "test2",renType: '1',UserNo: "201809150101000001",
                balanceAmount: 16377.75,examine:'1',status:'3',
                createTime: "2018-09-15T04:24:27.000+0000",
                }
              ],
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
            label: "未申请",
            value: 1
          },
          {
            label: "已完成",
            value: 2
          },{
            label: "未通过",
            value: 3
          },{
            label: "待审核",
            value: 4
          }],
          listdata2:[
          {
            label: "未入驻",
            value: 1
          },
          {
            label: "已入驻",
            value: 2
          }],
          listdata3:[
          {
            label: "已缴纳",
            value: 1
          },
          {
            label: "未缴纳",
            value: 2
          }],
          listdata4:[
          {
            label: "待审核",
            value: 1
          },
          {
            label: "已通过",
            value: 2
          },{
            label: "未通过",
            value: 3
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

      //查看详情
      handleViewDetail(index,row){
        if(row.renType=='1'){//个人
          this.$router.push({path:'/Shopconduct/ShopDetail',query:{id:row.id,type:'first'}})
        }else{//企业
          this.$router.push({path:'/Shopconduct/companyDetail',query:{id:row.id,type:'first'}})
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
  
  

</style>

<style lang="scss">
  .app-allhead {
    .el-card {
      .el-card__body {
        padding: 0;
      }
    }
  }
</style>



