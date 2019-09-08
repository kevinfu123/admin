<template> 
   <el-container>
    <el-main>
       <el-header style="height:auto; padding:0;">
          <el-form :inline="true" size="small" label-width="80px">
            <el-form-item>
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddClick()">添加等级</el-button>
            </el-form-item>
         </el-form>
       </el-header>
       <div class="table-container" style="margin-top:0;">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column prop="bl_name" label="等级名称" width="120" align="center">
                </el-table-column>
                <el-table-column prop="grow_up_min" label="等级下限成长值" align="center" />
                <el-table-column prop="grow_up_max"  label="等级上限成长值" align="center" />
                <el-table-column  label="等级背景图标" align="center">
                     <template slot-scope="scope">
                        <el-image
                        style="width: 100px; height: 50px"
                        :src="scope.row.icon"
                        ></el-image>
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
        <div class="pagination-container">
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
        </div>
        <!-- 添加/编辑单位 -->
        <el-dialog :title="dialogTitle" width="35%"  @close="handleClose" class="demo-ruleForm" :visible.sync="dialogFormVisible">
            <el-form :model="nologyform" status-icon :rules="rules" label-position="right" label-width="130px" ref="nologyform">
                <el-form-item  label="等级名称：">
                    <el-input  v-model="nologyform.ggname" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="成长值下限：">
                    <el-input  v-model.number="nologyform.pwidth" placeholder="" autocomplete="off"/>
                </el-form-item>
                <el-form-item  label="成长值上限：">
                    <el-input  v-model.number="nologyform.pheight" placeholder="" autocomplete="off"/>
                </el-form-item>
                <el-form-item  label="广告位描述：">
                     <el-upload
                        :action="fileAction"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-success="handleSuccess1"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList1"
                        class="upload-demo"
                        list-type="picture">
                        <el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>
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
    import {deleteshop,gradeList,addshop,editshop} from '@/api/shoplist/shopgrade';
    export default {
      name:'Shopgrade',
      data() {
        return {
            rules: {
                ggname: [{ required: true, trigger: 'blur', message: '单位不能为空' }],
                pwidth:[{ required: true, message: '宽度不能为空'},{ type: 'number', message: '宽度必须为数字值'}],
                pheight:[{ required: true, message: '高度不能为空'},{ type: 'number', message: '高度必须为数字值'}],
            },
            pager:{
                page: 1,
                pageSize: 10,
                total: 0,
            },
            tableData: [],
            total:null,
            dialogTitle:"添加位置管理",
            dialogFormVisible:false,
            //添加/编辑单位
            nologyform:{
                id:null,
                bl_name:'',
                grow_up_min:null,
                grow_up_max:null,
                icon:'',
            },
            unitall:'',
            fileAction: 'https://jsonplaceholder.typicode.com/posts/',
            fileList1:[],
        }
      },
      created(){
         this.getList();
      },
      methods:{
          //上传照片事件
          handlePreview(file) {
            console.log(file)
          },
          handleRemove(file, fileList) {
          },
          beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`)
          },
          handleSuccess1(response, file, fileList) {
            // this.nologyform.icon = response.data.url
            // console.log(this.nologyform.icon)
            console.log(response);
          },
          handleExceed(files, fileList) {
               this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
          },
          getList() {
              let params = {
                  page:this.pager.page,
                  pageSize:this.pager.pageSize
              }
              gradeList(params).then((result) => {
                  this.tableData = result.data 
                  this.pager.total = result.meta.pagination.total
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
              this.dialogTitle = "添加位置管理";
              this.nologyform.id = null;
              this.nologyform.quota = '';
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
                
                deleteshop(row.id).then(response => {
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