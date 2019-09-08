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
            
    <!-- <tree-grid :columns="columns" :tree-structure="true" :data-source="dataSource"></tree-grid> -->
            <!-- <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column label="分类名称" width="250" align="left">
                    <template slot-scope="scope">
                        <el-tree :data="scope.row.typename" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </template> 
                </el-table-column>
                <el-table-column
                label="首页导航栏 / 排序" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.Navigabar }}</span>
                        /
                        <span style="color:#F56C6C;">{{ scope.row.sort1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="首页楼层导航 / 排序" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.Floorbar }}</span>
                    /
                    <span style="color:#F56C6C;">{{ scope.row.sort2 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="首页需求大厅展示" width="180"  align="center">
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.Hallstatus"
                        @change="handleStatusChange(scope.$index,scope.row)"
                        :active-value="1"
                        :inactive-value="0">
                        </el-switch>
                    </template>   
                </el-table-column>
                <el-table-column prop="sort3" label="排序" width="60" align="center">
                </el-table-column>
                <el-table-column prop="Technicalrates" label="技术费率" width="100" align="center">
                </el-table-column>
                <el-table-column prop="bond" label="保证金" width="100"  align="center">
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
            </el-table> -->
        </div>
        <!-- 添加/编辑单位 -->
        <el-dialog :title="dialogTitle" width="600px"  @close="handleClose" class="demo-ruleForm" :visible.sync="dialogFormVisible">
            <el-form :model="nologyform" status-icon :rules="rules" label-position="right" label-width="140px" ref="nologyform">
                <el-form-item style="margin-bottom: 16px;" prop="quota"  label="分类名称：">
                    <el-input  size="mini" v-model="nologyform.quota" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="上级分类：">
                    <el-input size="mini"  v-model="nologyform.quota" placeholder="" clearable/>
                </el-form-item>
                <el-form-item label="首页导航栏显示：">
                  <el-select
                    size="mini"
                    v-model="nologyform.radio1" clearable placeholder="">
                    <el-option
                      v-for="item in listdata"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="排序：">
                    <el-slider v-model="nologyform.sort1"></el-slider>
                </el-form-item>
                <el-form-item  label="楼层导航栏显示：">
                    <template>
                        <el-radio v-model="nologyform.radio2" label="1">是</el-radio>
                        <el-radio v-model="nologyform.radio2" label="2">否</el-radio>
                    </template>
                </el-form-item>
                <el-form-item  label="排序：">
                    <el-slider v-model="nologyform.sort2"></el-slider>
                </el-form-item>
                <el-form-item  label="首页需求大厅显示：">
                   <template>
                        <el-radio v-model="nologyform.radio3" label="1">是</el-radio>
                        <el-radio v-model="nologyform.radio3" label="2">否</el-radio>
                    </template>
                </el-form-item>
                <el-form-item  label="排序：">
                    <el-slider v-model="nologyform.sort3"></el-slider>
                </el-form-item>
                <el-form-item  label="最低缴纳保证金：">
                    <el-input size="mini" v-model="nologyform.bond" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="分类关键词：">
                    <el-input size="mini" v-model="nologyform.unitname" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="分类描述：">
                    <el-input size="mini"  v-model="nologyform.describe" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="分类图标：">
                    <el-input v-model="nologyform.icon">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="quotaopen('nologyform')">确 定</el-button>
            </div>
        </el-dialog>
    </el-main>
   </el-container>
</template>

<script>
 
    // import TreeGrid from "@/components/TreeTable";
    import {deleteApply,nuitList,addunit} from '@/api/management';
    const defaultListQuery = {
        unitname:null,
    };
    export default {
      name:'managementlist',
     
      //components: { TreeGrid },
      data() {
        return {
            statisticDatas: [],
            pastDays: 0,
            rules: {
                quota: [{ required: true, trigger: 'blur', message: '名称不能为空' }],
            },
            listQuery:Object.assign({},defaultListQuery),
            tableData: [],
            total:null,
            dialogTitle:"添加单位",
            dialogFormVisible:false,
            //添加/编辑单位
            listdata:[{
                label: "首页导航栏左侧",
                value: 1
              },{
                label: "首页导航栏右侧",
                value: 2
              },{
                label: "不显示",
                value: 3
            }],
            iconPopover: false,
            nologyform:{
                id:null,
                quota:null,
                radio1:'2',
                radio2:'2',
                radio3:'2',
                sort1:0,
                sort2:0,
                sort3:0,
                bond:null,
                unitname:null,
                describe:null,
                icon:'icon',
            },
            unitall:'',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
        }
      },
      created(){
         //this.getList();
      },
      computed: {
        // 格式化数据源
        data: function () {
            let me = this
            if (me.treeStructure) {
            let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
            console.log(data)
            return data
            }
            return me.dataSource
        }
      },
      
      methods:{
          /**
         * 图标选择事件
         */
        iconSelected(text) {
        this.nologyform.icon = text
        // 隐藏icon popover
        this.iconPopover = false
        },
          //分类名称树
          handleNodeClick(data) {
             console.log(data);
          },
          getList() {
            //   this.tableData = [{
            //     typename:
            //     id:12,
            //     Navigabar:'左侧',
            //     Floorbar:'左侧楼层导航',
            //     sort1:10,
            //     sort2:100,
            //     sort3:20,
            //     Hallstatus:0,
            //     bond:5000,
            //     Technicalrates:'20%',
            //     unitname: '王小虎',
            //     }, { 
            //     typename:[],
            //     id:12,
            //     Navigabar:'左侧',
            //     Floorbar:'左侧楼层导航',
            //     sort1:10,
            //     sort2:100,
            //     sort3:20,
            //     Hallstatus:1,
            //     bond:5000,
            //     Technicalrates:'20%',
            //     unitname: '王小虎',
            //     }, {
            //     typename:[],
            //     id:12,
            //     Navigabar:'左侧',
            //     Floorbar:'左侧楼层导航',
            //     sort1:10,
            //     sort2:100,
            //     sort3:20,
            //     Hallstatus:1,
            //     bond:5000,
            //     Technicalrates:'20%',
            //     unitname: '王小虎',
            //     }]
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
  .demo-ruleForm {
      
    
        .el-form {
          .el-form-item {
              margin-bottom: 0;
          }
        }
   
  }
  .input-width {
    width: 150px;
  }
  .el-select {
    width: 120px;
  }
  
</style>