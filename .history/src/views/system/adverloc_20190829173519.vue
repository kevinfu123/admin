<template> 
   <el-container>
    <el-main>
       <el-header style="height:auto; padding:0;">
          <el-form :inline="true" size="small" label-width="80px">
            <el-form-item>
                <el-input size="small" placeholder="单位名称" v-model="listQuery.position" clearable/>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="handleSearchList()"
                    size="mini">
                    搜索
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddClick()">添加广告位置</el-button>
            </el-form-item>
         </el-form>
       </el-header>
       <div class="table-container" style="margin-top:0;">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="id"
                label="广告位置编号"
                width="120" align="center">
                </el-table-column>
                <el-table-column prop="position" label="广告位置" align="center" />
                <el-table-column prop="width"  label="位置宽度" align="center" />
                <el-table-column prop="height"  label="位置高度" align="center" />
                <el-table-column prop="description"  label="广告描述" align="center" />
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini"
                        @click="handleEdit1(scope.$index, scope.row)">查看广告</el-button>
                        <el-button size="mini"
                        @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                :page-sizes="[10,30,50]"
                :total="total">
            </el-pagination>
        </div>
        <!-- 添加/编辑单位 -->
        <el-dialog :title="dialogTitle" width="35%"  @close="handleClose" class="demo-ruleForm" :visible.sync="dialogFormVisible">
            <el-form :model="nologyform" status-icon :rules="rules" label-position="right" label-width="130px" ref="nologyform">
                <el-form-item prop="position" label="广告位置：">
                    <el-input  v-model="nologyform.position" placeholder="" clearable/>
                </el-form-item>
                <el-form-item prop="width" label="位置宽度：">
                    <el-input  v-model.number="nologyform.width" placeholder="" autocomplete="off"/>
                </el-form-item>
                <el-form-item prop="height" label="位置高度：">
                    <el-input  v-model.number="nologyform.height" placeholder="" autocomplete="off"/>
                </el-form-item>
                <el-form-item  label="广告位描述：">
                     <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="nologyform.description">
                        </el-input>
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
    import {deleteApply,nuitList,addunit} from '@/api/management';
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        position:null,
    }; 
    export default {
      name:'managementlist',
      data() {
        return {
            rules: {
                position: [{ required: true, trigger: 'blur', message: '广告位置不能为空' }],
                width:[{ required: true, message: '宽度不能为空'},{ type: 'number', message: '宽度必须为数字值'}],
                height:[{ required: true, message: '高度不能为空'},{ type: 'number', message: '高度必须为数字值'}],
            },
            listQuery:Object.assign({},defaultListQuery),
            tableData: [],
            total:null,
            dialogTitle:"添加位置管理",
            dialogFormVisible:false,
            //添加/编辑单位
            nologyform:{
                id:null,
                position:'',
                width:null,
                height:null,
                description:'',
            },
            
        }
      },
      created(){
         this.getList();
      },
      methods:{
          getList() {
              this.tableData = [{
                adverNo:12,
                position:'首页广告大bannen图',
                pwidth:'330',
                pheight:'330',
                unitname: '王小虎',
                Sources:'广告位描述',
                }, {
                adverNo:12,
                pwidth:'330',
                pheight:'330',
                position:'首页广告大bannen图',
                Sources:'广告位描述',
                }, {
                adverNo:12,
                position:'首页广告大bannen图',
                unitname: '王小虎',
                pwidth:'330',
                pheight:'330',
                Sources:'广告位描述',
                }]
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
          handleSearchList() {
            //this.listQuery.pageNum = 1;
            this.getList();
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
          handleDelete(index, row) {
            console.log(index, row);
          },
          handleCurrentChange(val){
            this.listQuery.pageNum = val;
            this.getList();
          },
          handleSizeChange(val){
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
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