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
    :data="data"
    border
    style="width: 100%"
    :row-style="showTr">
    <el-table-column v-for="(column, index) in columns" :key="column.dataIndex"
      :label="column.text">
      <template scope="scope">
        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>
        <button class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-caret-right" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
        </button>
        <span v-else-if="index===0" class="ms-tree-space"></span>
        {{scope.row[column.dataIndex]}}
      </template>
    </el-table-column>
    <el-table-column label="操作" v-if="treeType === 'normal'" width="260">
      <template scope="scope">
        <button type="button" class="el-button el-button--default el-button--small">
          <router-link
            :to="{ path: requestUrl + 'edit', query: {id: scope.row.Oid} }"
            tag="span">
            编辑
          </router-link>
        </button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete()">
          删除
        </el-button>
        <button type="button" class="el-button el-button--success el-button--small">
          <router-link :to="{ path: requestUrl, query: {parentId: scope.row.parentOId} }"
                       tag="span">
            添加下级树结构
          </router-link>
        </button>
      </template>
    </el-table-column>
  </el-table>
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
 
    import Utils from '../utils/treeindex.js';
    var util = {};
	util.treeTableXcode = function(data,xcode){
		xcode = xcode || "";
		for(var i=0;i<data.length;i++){
			var item = data[i];
			item.xcode = xcode + i;
			if(item.children && item.children.length > 0){
				util.treeTableXcode(item.children,item.xcode+"-");
			}
		}
	};

    import {deleteApply,nuitList,addunit} from '@/api/management';
    const defaultListQuery = {
        unitname:null,
    };
    export default {
      name:'managementlist',
      props: {
// 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
      treeStructure: {
        type: Boolean,
        default: function () {
          return false
        }
      },
// 这是相应的字段展示
      columns: {
        type: Array,
        default: function () {
          return []
        }
      },
// 这是数据源
      dataSource: {
        type: Array,
        default: function () {
          return []
        }
      },
// 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
      requestUrl: {
        type: String,
        default: function () {
          return ''
        }
      },
// 这个是是否展示操作列
      treeType: {
        type: String,
        default: function () {
          return 'normal'
        }
      },
// 是否默认展开所有树
      defaultExpandAll: {
        type: Boolean,
        default: function () {
          return false
        }
      },
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
            defaultProps: {
                children: 'children',
                label: 'label'
            },
        }
      },
      created(){
         this.getList();
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
            // 显示行
            showTr: function (row, index) {
                let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
                row._show = show
                return show ? '' : 'display:none;'
            },
            // 展开下级
            toggle: function (trIndex) {
                let me = this
                let record = me.data[trIndex]
                record._expanded = !record._expanded
            },
            // 显示层级关系的空格和图标
            spaceIconShow (index) {
                let me = this
                if (me.treeStructure && index === 0) {
                return true
                }
                return false
            },
            // 点击展开和关闭的时候，图标的切换
            toggleIconShow (index, record) {
                let me = this
                if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
                return true
                }
                return false
            },
            handleDelete () {
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                    }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            }
      }
    }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .ms-tree-space{position: relative;
        top: 1px;
        display: inline-block;
        font-family: 'Glyphicons Halflings';
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: 18px;
        height: 14px;
    }
  .ms-tree-space::before{content: ""}
  table td{
    line-height: 26px;
  }

  .input-width {
    width: 150px;
  }
  .el-select {
    width: 120px;
  }
  
</style>