<template> 
   <el-container>
    <el-main>
       <el-header style="height:auto; padding:0;">
          <el-form :inline="true" size="small" label-width="80px">
            <el-form-item>
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddClick()">添加会员等级</el-button>
            </el-form-item>
          </el-form>
       </el-header>
       <div class="table-container" style="margin-top:0;">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column prop="ml_name" label="会员等级名称" width="120" align="center">
                </el-table-column>
                <el-table-column prop="tag" label="会员等级标识" align="center" />
                <el-table-column  label="会员等级图标" align="center">
                     <template slot-scope="scope">
                        <div v-if="scope.row.icon!=''">
                            <el-image
                            style="width: 100px; height: 50px"
                            :src="imgurl+scope.row.icon"
                            ></el-image>
                        </div>
                        <span v-else>未上传图标</span>
                    </template> 
                </el-table-column>
                <el-table-column prop="tech_rate"  label="技术费率" align="center" />
                <el-table-column prop="allow_service_num"  label="允许发布服务" align="center" />
                <el-table-column prop="allow_cate_num"  label="允许入驻类目" align="center" />
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
            <el-form class="shopmenber" :model="nologyform" status-icon :rules="rules" label-position="right" label-width="130px" ref="nologyform">
                <el-form-item prop="ml_name" label="会员等级名称：">
                    <el-input  v-model="nologyform.ml_name" placeholder="" clearable/>
                </el-form-item>
                <el-form-item prop="tag" label="等级标识：">
                    <el-input  v-model="nologyform.tag" placeholder="" autocomplete="off"/>
                </el-form-item>
                <el-form-item style="width:95%;" label="等级背景图：" prop="icon">
                     <el-upload
                        :action="fileAction"
                        name="img"
                        :headers="fileHeaders"
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
                <el-form-item prop="tech_rate" label="技术费率：">
                    <el-input  v-model.number="nologyform.tech_rate" placeholder="" autocomplete="off"/> %
                </el-form-item>
                <el-form-item prop="allow_service_num" label="允许发布服务：">
                    <el-input  v-model.number="nologyform.allow_service_num" placeholder="" autocomplete="off"/> 个
                </el-form-item>
                <el-form-item prop="allow_cate_num" label="技术费率：">
                    <el-input  v-model.number="nologyform.allow_cate_num" placeholder="" autocomplete="off"/> 个
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="menberopen('nologyform')">确 定</el-button>
            </div>
        </el-dialog>
    </el-main>
   </el-container>
</template>
<script>
    import {deletemenber, menberList, addmenber, editmenber} from '@/api/system/shopmenber';
    import { getToken } from '@/utils/auth';
    export default {
      name:'Shopmenber',
      data() {
        return {
            rules: {
                ml_name: [{ required: true, trigger: 'blur', message: '名称不能为空' }],
                tag: [{ required: true, trigger: 'blur', message: '等级标识不能为空' }],
                tech_rate:[{ required: true, message: '技术费率不能为空'},{ type: 'number', message: '技术费率必须为数字值'}],
                allow_service_num:[{ required: true, message: '发布服务不能为空'},{ type: 'number', message: '发布服务必须为数字值'}],
                allow_cate_num:[{ required: true, message: '入驻类目不能为空'},{ type: 'number', message: '入驻类目必须为数字值'}],
            },
            fileHeaders: { 'Authorization':'Bearer '+getToken()},
            pager:{
                page: 1,
                pageSize: 10,
                total: 0,
            },
            tableData: [],
            total:null,
            dialogTitle:"添加店铺等级",
            dialogFormVisible:false,
            //添加/编辑单位
            nologyform:{
                id:null,
                ml_name:'',
                tag:'',
                tech_rate:null,
                allow_service_num:null,
                allow_cate_num:null,
                icon:'',
            },
            imgurl:'http://ltzm1.oss-cn-shenzhen.aliyuncs.com/',
            unitall:'',
            fileAction: 'http://47.106.240.143/api/admin/upimg',
            fileList1:[],
        }
      },
      created(){
         //this.getList();
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
             this.nologyform.icon = response.data
             console.log(this.nologyform.icon);
          },
          handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
          },
          getList() {
            //   let params = {
            //       page:this.pager.page,
            //       pageSize:this.pager.pageSize
            //   }
              menberList().then((result) => {
                  this.tableData = result.data 
                  this.pager.total = result.meta.pagination.total
              }).catch((err) => {
                if(err) this.$message.error(err)
              })
          },
          
          handleAddClick() {
              this.dialogFormVisible = true;
              this.dialogTitle = "添加店铺会员等级";
              this.nologyform.id = null;
              this.nologyform.ml_name = '';
              this.nologyform.tag = '';
              this.nologyform.icon = '';
              this.nologyform.tech_rate = null;
              this.nologyform.allow_service_num = null,
              this.nologyform.allow_cate_num = null,
              this.fileList1 = [];
          },
          handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.dialogTitle = "编辑店铺会员等级";
            this.nologyform.id = row.id;
            this.nologyform.ml_name = row.ml_name;
            this.nologyform.tag = row.tag;
            this.nologyform.tech_rate = row.tech_rate;
            this.nologyform.icon = row.icon;
            this.nologyform.allow_service_num = row.allow_service_num;
            this.nologyform.allow_cate_num = row.allow_cate_num;
            //显示图片
            let imgurl1 = this.imgurl+row.icon;
            this.fileList1.push({url:imgurl1});
          },
          //添加、编辑单位
          menberopen(formName) {
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      if(this.nologyform.id){
                            let menberjson = {
                                ml_name:this.nologyform.ml_name,
                                tag:this.nologyform.tag,
                                tech_rate:this.nologyform.tech_rate,
                                icon:this.nologyform.icon,
                                allow_service_num:this.nologyform.allow_service_num,
                                allow_cate_num:this.nologyform.allow_cate_num,
                            }
                            editmenber(this.nologyform.id,menberjson).then((result) => {
                                this.$message({
                                    type: 'success',
                                    message: '编辑成功!'
                                });
                                this.getList();//删除更新页面
                            }).catch((err) => {
                                if(err) this.$message.error(err)
                            })
                         
                      }else{
                          addmenber(this.nologyform).then((result) => {
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
                
                deletemenber(row.id).then(response => {
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
  .shopmenber {
      .el-input {
          width: 95%;
      }
  }
</style>