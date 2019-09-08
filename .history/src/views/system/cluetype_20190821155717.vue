<template> 
   <el-container>
    <el-main>
       <el-header style="height:auto; padding:0;">
          <el-form :inline="true" size="small" label-width="80px">
            <el-form-item>
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddClick()">添加客户类型</el-button>
            </el-form-item>
         </el-form>
       </el-header>
       <div class="table-container" style="margin-top:0;">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column prop="id" label="ID" width="50" align="center"/>
                <el-table-column prop="customer_type" label="客户类型" align="center" />
                <el-table-column  label="手机号价格" align="center">
                    <template slot-scope="scope">
                        <span style="color:red;">￥</span>{{parseInt(scope.row.phone_price)}}
                    </template>
                </el-table-column>
                <el-table-column   label="微信价格" align="center">
                    <template slot-scope="scope">
                        <span style="color:red;">￥</span>{{parseInt(scope.row.wechat_price)}}
                    </template>
                </el-table-column>
                <el-table-column  label="qq价格" align="center">
                    <template slot-scope="scope">
                        <span style="color:red;">￥</span>{{parseInt(scope.row.qq_price)}}
                    </template>
                </el-table-column>
                <el-table-column  label="邮箱价格" align="center">
                    <template slot-scope="scope">
                        <span style="color:red;">￥</span>{{parseInt(scope.row.email_price)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini"
                        @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- <div class="pagination-container">
            <el-pagination
                :current-page="pager.page"
                background
                :page-sizes="[10, 30, 50, 100]"
                :page-size="pager.pageSize"
                :total="pager.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handlePageChange">
            </el-pagination>
        </div> -->
        <!-- 添加/编辑单位 -->
        <el-dialog :title="dialogTitle" width="35%"  @close="handleClose" class="demo-ruleForm" :visible.sync="dialogFormVisible">
            <el-form :model="nologyform" status-icon :rules="rules" label-position="right" label-width="130px" ref="nologyform">
                <el-form-item prop="customer_type" label="客户类型：">
                    <el-input  v-model="nologyform.customer_type" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="手机号价格：">
                    <el-input  v-model.number="nologyform.phone_price" placeholder="" autocomplete="off"/>
                </el-form-item>
                <el-form-item  label="微信价格：">
                    <el-input  v-model.number="nologyform.wechat_price" placeholder="" autocomplete="off"/>
                </el-form-item>
                <el-form-item  label="QQ价格：">
                    <el-input  v-model.number="nologyform.qq_price" placeholder="" autocomplete="off"/>
                </el-form-item>
                <el-form-item  label="QQ价格：">
                    <el-input  v-model.number="nologyform.email_price" placeholder="" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="quotaopen('nologyform')">确 定</el-button>
            </div>
        </el-dialog>
    </el-main>
   </el-container>
</template>
<script>
    import {deleteclue, clueList, addclue, editclue} from '@/api/system/cluetype';
    export default {
      name:'Cluetype',
      data() {
        return {
            rules: {
                customer_type: [{ required: true, trigger: 'blur', message: '客户类型不能为空' }],
            },
            pager:{
                page: 1,
                pageSize: 10,
                total: 0,
            },
            tableData: [],
            total:null,
            dialogTitle:"添加客户类型",
            dialogFormVisible:false,
            //添加/编辑单位
            nologyform:{
                id:null,
                customer_type:null,
                phone_price:null,
                wechat_price:null,
                qq_price:null,
                email_price:null,
            },
            unitall:'',
            
        }
      },
      created(){
         this.getList();
      },
      methods:{
          
          getList() {
            //   let params = {
            //       page:this.pager.page,
            //       pageSize:this.pager.pageSize
            //   }
              clueList().then((result) => {
                  this.tableData = result.data 
              }).catch((err) => {
                if(err) this.$message.error(err)
              })
          },
          //修改展示状态
        handleStatusChange(index,row){
            let id = row.id;
            let param = {
                id:id,
                status:row.Hallstatus
            };
            console.log(param);
            // updateStatus(param).then(response=>{
            //   this.$message({
            //     message: '状态修改成功',
            //     type: 'success'
            //   });
            // });
        },

          handleAddClick() {
              this.dialogFormVisible = true;
              this.dialogTitle = "添加店铺等级";
              this.nologyform.id = null;
              
          },
          //添加、编辑单位
          quotaopen(formName) {
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      if(this.nologyform.id){
                          if(this.nologyform.quota == this.unitall){
                             this.$message({
                                showClose: true,
                                message: '你没有修改单位，无法提交！',
                                type: 'warning'
                              });
                             return;
                          }else{

                          }
                          console.log(2222222)
                      }else{
                          console.log(333333)
                      }
                      //this.dialogFormVisible = false;
                  } else {
                      console.log('error submit!!');
                      return false;
                  }
              });
          },
          handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.dialogTitle = "编辑位置管理";
            this.nologyform.id = row.id;
            this.unitall = row.unitname;
            this.nologyform.quota = row.unitname;

          },
          handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                
                deleteclue(row.id).then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList();//删除更新页面
                }).catch((e) => {
                    if(err) this.$message.error(err)
                })
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
          },
          handlePageChange(val){
            this.pager.page = val;
            this.getList();
          },
          handleSizeChange(val){
            this.pager.pageSize = val
            this.getList();
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
  
</style>