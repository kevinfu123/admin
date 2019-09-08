<template> 
   <el-container>
    <el-main>
       <el-header style="height:auto; padding:0;">
          <el-form :inline="true" size="small" label-width="80px">
            <el-form-item label="模板类型">
              <el-select
                size="mini"
                v-model="searchForm.Settled" clearable placeholder="">
                <el-option
                  v-for="item in listdata"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开启状态">
              <el-select
                size="mini"
                v-model="searchForm.status" clearable placeholder="">
                <el-option
                  v-for="item in listdata1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="searchForm.date"
                size="mini"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-input size="mini" placeholder="编号/标题/内容关键字" v-model="searchForm.unitname" clearable/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearchList()" size="mini">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddClick()">添加模板</el-button>
            </el-form-item>
         </el-form>
       </el-header>
       <div class="table-container" style="margin-top:0;">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column prop="bl_name" label="模板编号" width="100" align="center">
                </el-table-column>
                <el-table-column prop="tem_title" label="模板标题" width="200" align="center" />
                <el-table-column label="模板内容" align="center">
                    <template slot-scope="scope">
                        <div v-html="scope.row.content">

                        </div>
                    </template> 
                </el-table-column>
                <el-table-column prop="datetime" label="创建时间" width="160" align="center">
                      
                </el-table-column>
                <el-table-column  label="是否开启" width="120" align="center">
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.Hallstatus"
                        @change="handleStatusChange(scope.$index,scope.row)"
                        :active-value="1"
                        :inactive-value="0">
                        </el-switch>
                    </template>  
                </el-table-column>
                <el-table-column prop="tem_type" label="模板类型" width="120" align="center" />
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
            <el-form :model="nologyform" status-icon :rules="rules" label-position="right" label-width="90px" ref="nologyform">
                <el-form-item prop="bl_name" label="模板标题：">
                    <el-input size="mini" style="width:200px;"  v-model="nologyform.bl_name" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="模板内容：">
                    <Tinymce ref="editor" :height="400" v-model="nologyform.content" />
                </el-form-item>
                <el-form-item  label="模板类型：">
                    <el-select
                        size="mini"
                        v-model="nologyform.tem_type" clearable placeholder="">
                        <el-option
                        v-for="item in listdata"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
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
    import Tinymce from '@/components/Tinymce';
    import {deletetem, temList, addtem, edittem, editstatus} from '@/api/system/temmanage';
    import { getToken } from '@/utils/auth'
    export default {
      name:'Temmanage',
      components: { Tinymce },
      data() {
        return {
            rules: {
                bl_name: [{ required: true, trigger: 'blur', message: '模板标题不能为空' }],
            },
            fileHeaders: { 'Authorization':'Bearer '+getToken()},
            pager:{
                page: 1,
                pageSize: 10,
                total: 0,
            },
            tableData: [{
                id:1, bl_name:61,tem_title:'汇编microship芯片源码',
                content:'<span>点击进入</span> <span>Hello 你好</span>',
                datetime:'2019-07-01 12:34',
                Hallstatus:0,tem_type:'线索模板',
                },
                {id:2,bl_name:61,tem_title:'汇编microship芯片源码',
                content:'<span>点击进入</span> <span>Hello 你好</span>',
                datetime:'2019-07-01 12:34',
                Hallstatus:1,tem_type:'任务模板',
            }],
            total:null,
            dialogTitle:"添加店铺等级",
            dialogFormVisible:false,
            listdata:[
                {
                    label: "任务模板",
                    value: 1
                },
                {
                    label: "线索模板",
                    value: 2
                }],
            listdata1:[
                {
                    label: "开启",
                    value: 1
                },
                {
                    label: "未开启",
                    value: 2
                }],
            searchForm: {
                unitname:'',
                Settled:null,
                status:null,
                date:null,
                page: 1,
                limit: 20
            },
            //添加/编辑单位
            nologyform:{
                id:null,
                bl_name:'',
                tem_type:null,
                content:'',
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
          
           //修改显示状态
          handleStatusChange(index,row){
            let id = row.id;
            let param = {
                id:id,
                status:row.Hallstatus
            };
            console.log(param);
            // editstatus(param).then(response=>{
            //   this.$message({
            //     message: '状态修改成功',
            //     type: 'success'
            //   });
            // });
          },
          getList() {
              
            //   temList(this.searchForm).then((result) => {
            //       this.tableData = result.data 
            //       this.pager.total = result.meta.pagination.total
            //   }).catch((err) => {
            //     if(err) this.$message.error(err)
            //   })
          },
          
          handleAddClick() {
              this.dialogFormVisible = true;
              this.dialogTitle = "添加店铺等级";
              this.nologyform.id = null;
              this.nologyform.bl_name =null;
              this.nologyform.grow_up_min = null;
              this.nologyform.grow_up_max = null;
              this.nologyform.icon = null;
              this.fileList1 = [];
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
                            editshop(this.nologyform.id,shopjson).then((result) => {
                                this.$message({
                                    type: 'success',
                                    message: '编辑成功!'
                                });
                                this.getList();//删除更新页面
                            }).catch((err) => {
                                if(err) this.$message.error(err)
                            })
                         
                      }else{
                          addshop(this.nologyform).then((result) => {
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
          handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.dialogTitle = "编辑店铺等级";
            this.nologyform.id = row.id;
            this.nologyform.bl_name = row.bl_name;
            this.nologyform.grow_up_min = row.grow_up_min;
            this.nologyform.grow_up_max = row.grow_up_max;
            this.nologyform.icon = row.icon;
            //显示图片
            let imgurl1 = this.imgurl+row.icon;
            this.fileList1.push({url:imgurl1});
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