<template> 
   <el-container>
    <el-main>
       <el-header style="height:auto; padding:0;">
          <el-form :inline="true" size="small" label-width="80px">
            <el-form-item>
                <el-input size="mini" placeholder="类目关键字" v-model="listQuery.unitname" clearable/>
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
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddClick()">添加类目</el-button>
            </el-form-item>
         </el-form>
       </el-header>
       <div class="table-container" style="margin-top:0;">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column prop="id" label="分类名称" width="180" align="left">

                </el-table-column>
                <el-table-column
                label="首页导航栏 / 排序" align="center">

                </el-table-column>
                <el-table-column
                label="首页楼层导航 / 排序" align="center">

                </el-table-column>
                <el-table-column label="首页需求大厅是否展示" width="180"  align="center">

                </el-table-column>
                <el-table-column
                label="排序" width="60" align="center">
                     
                </el-table-column>
                <el-table-column label="技术费率" width="100" align="center">
                     
                </el-table-column>
                <el-table-column label="保证金" width="100"  align="center">
                     
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 添加/编辑单位 -->
        <el-dialog :title="dialogTitle" width="500px"  @close="handleClose" class="demo-ruleForm" :visible.sync="dialogFormVisible">
            <el-form :model="nologyform" status-icon :rules="rules" label-position="right" label-width="80px" ref="nologyform">
                <el-form-item prop="quota" label="单位：">
                    <el-input  v-model="nologyform.quota" placeholder="请输入单位" clearable/>
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
        unitname:null,
    };
    export default {
      name:'managementlist',
      data() {
        return {
            rules: {
                quota: [{ required: true, trigger: 'blur', message: '单位不能为空' }],
            },
            listQuery:Object.assign({},defaultListQuery),
            tableData: [],
            total:null,
            dialogTitle:"添加单位",
            dialogFormVisible:false,
            //添加/编辑单位
            nologyform:{
                id:null,
                quota:null,
            },
            unitall:'',
        }
      },
      created(){
         this.getList();
      },
      methods:{
          getList() {
              this.tableData = [{
                id:12,
                unitname: '王小虎',
                }, {
                id:12,
                unitname: '王小虎',
                }, {
                id:12,
                 unitname: '王小虎',
                }, {
                id:12,
                unitname: '王小虎',
                }]
          },

          handleSearchList() {
            //this.listQuery.pageNum = 1;
            this.getList();
          },
          handleAddClick() {
              this.dialogFormVisible = true;
              this.dialogTitle = "添加单位";
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
            this.dialogTitle = "编辑单位";
            this.nologyform.id = row.id;
            this.unitall = row.unitname;
            this.nologyform.quota = row.unitname;

          },
          handleDelete(index, row) {
            console.log(index, row);
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