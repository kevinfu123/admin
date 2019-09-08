<template> 
   <el-container>
    <el-main>
       <el-header style="height:auto; padding:0;">
          <el-form :inline="true" size="small" label-width="100px">
            <el-form-item label="增值服务名称">
              <el-input size="mini" placeholder="" v-model="searchForm.inc_name" clearable/>
            </el-form-item>
            <el-form-item label="开启状态">
              <el-select
                size="mini"
                v-model="searchForm.is_show" clearable placeholder="">
                <el-option
                  v-for="item in listdata1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
                <el-input size="mini" placeholder="描述关键字" v-model="searchForm.unitname" clearable/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearchList()" size="mini">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddClick()">添加增值服务</el-button>
            </el-form-item>
         </el-form>
       </el-header>
       <div class="table-container" style="margin-top:0;">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column prop="id" label="增值编号" width="100" align="center">
                </el-table-column>
                <el-table-column prop="inc_name" label="增值服务名称" width="200" align="center" />
                <el-table-column label="价格" width="160" align="center">
                    <template slot-scope="scope">
                       <span v-if="scope.row.price!==''">￥{{scope.row.price}}</span>
                       <span v-else></span>
                    </template> 
                </el-table-column>
                <el-table-column prop="description" label="描述"  align="center">
                      
                </el-table-column>
                <el-table-column prop="sort" label="排序" width="120" align="center" />
                <el-table-column  label="是否开启" width="120" align="center">
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.is_show"
                        @change="handleStatusChange(scope.$index,scope.row)"
                        :active-value="1"
                        :inactive-value="0">
                        </el-switch>
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
            <el-form :model="nologyform" status-icon :rules="rules" label-position="right" label-width="120px" ref="nologyform">
                <el-form-item prop="inc_name"  label="增值服务名称：">
                    <el-input size="mini" style="width:200px;"  v-model="nologyform.inc_name" placeholder="" clearable/>
                </el-form-item>
                <el-form-item prop="price" label="价格：">
                    <el-input size="mini" style="width:200px;"  v-model.number="nologyform.price" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="描述：">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="nologyform.description">
                    </el-input>
                </el-form-item>
                <el-form-item  label="排序：">
                    <el-input size="mini" style="width:200px;"  v-model.number="nologyform.sort" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="是否显示：">
                    <span style="margin-right: 5px;">NO</span>
                    <el-switch 
                        v-model="nologyform.is_show"
                        :active-value="1"
                        :inactive-value="0"></el-switch>
                    <span style="margin-left: 5px;">YES</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="gradeopen('nologyform')">确 定</el-button>
            </div>
        </el-dialog>
    </el-main>
   </el-container>
</template>
<script>
    import {deleteservice, serviceList, addservice, editservice, editstatus} from '@/api/system/addservice';
    export default {
      name:'Addservice',
      data() {
        return {
            rules: {
                inc_name: [{ required: true, trigger: 'blur', message: '名称不能为空' }],
                price: [{ required: true, message: '价格不能为空'},{ type: 'number', message: '价格为数字值'}],
            },
            pager:{
                page: 1,
                pageSize: 10,
                total: 0,
            },
            tableData: [],
            dialogTitle:"添加增值服务",
            dialogFormVisible:false,
            listdata1:[
                {
                    label: "开启",
                    value: 1
                },
                {
                    label: "未开启",
                    value: 0
                }],
            searchForm: {
                inc_name:'',
                is_show:null,
                description:null,
                page: 1,
                pageSize: 10
            },
            //添加/编辑单位
            nologyform:{
                id:null,
                inc_name:'',
                price:null,
                description:'',
                sort:null,
                is_show:1,
            },
            imgurl:'http://ltzm1.oss-cn-shenzhen.aliyuncs.com/',
            unitall:'',
            fileAction: 'http://47.106.240.143/api/admin/upimg',
            fileList1:[],
        }
      },
      created(){
         this.getList();
      },
      methods:{
          //搜索
          handleSearchList() {
            this.getList();
          },
           //修改显示状态
          handleStatusChange(index,row){
            let id = row.id;
            let param = {
                id:id,
                show:row.is_show
            };
            console.log(param);
            editstatus(param).then(response=>{
              this.$message({
                message: '显示修改成功',
                type: 'success'
              });
            });
          },
          getList() {
              serviceList(this.searchForm).then((result) => {
                  this.tableData = result.data 
                  this.pager.total = result.meta.pagination.total
              }).catch((err) => {
                if(err) this.$message.error(err)
              })
          },
          
          handleAddClick() {
              this.dialogFormVisible = true;
              this.dialogTitle = "添加增值服务";
              this.nologyform.id = null;
              this.nologyform.inc_name = null;
              this.nologyform.price = null;
              this.nologyform.description = '';
              this.nologyform.sort = null;
              this.nologyform.is_show = null;
          },
          handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.dialogTitle = "编辑模板";
            this.nologyform.id = row.id;
            this.nologyform.inc_name = row.inc_name;
            this.nologyform.price = row.price;
            this.nologyform.description = row.description;
            this.nologyform.sort = row.sort;
            this.nologyform.is_show = row.is_show;
            
          },
          //添加、编辑单位
          gradeopen(formName) {
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      if(this.nologyform.id){
                            let shopjson = {
                                bl_name:this.nologyform.bl_name,
                                grow_up_min:this.nologyform.grow_up_min,
                                grow_up_max:this.nologyform.grow_up_max,
                                icon:this.nologyform.icon,
                            }
                            editservice(this.nologyform.id,shopjson).then((result) => {
                                this.$message({
                                    type: 'success',
                                    message: '编辑成功!'
                                });
                                this.getList();//删除更新页面
                            }).catch((err) => {
                                if(err) this.$message.error(err)
                            })
                         
                      }else{
                          addservice(this.nologyform).then((result) => {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.getList();//删除更新页面
                          }).catch((err) => {
                                if(err) this.$message.error(err)
                          })
                      }
                      this.dialogFormVisible = false;
                  } else {
                      console.log('error submit!!');
                      return false;
                  }
              });
          },
          
          handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                
                deleteservice(row.id).then(response => {
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
            this.searchForm.page = val;
            this.getList();
          },
          handleSizeChange(val){
            this.pager.pageSize = val;
            this.searchForm.pageSize = val;
            this.getList();
          },
          
          /**
           * 表单关闭时事件
          */
          handleClose() {
            this.$refs.nologyform.resetFields();
            this.fileList1 = [];
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