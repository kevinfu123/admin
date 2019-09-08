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
     <el-table :data="statisticDatas" border style="width: 100%;" size="medium" :row-class-name="rowClassNameHandler">
      <el-table-column label="分类名称" width="460" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          <span :style="{marginLeft: scope.row.level * 23 + 'px'}">&ensp;</span>
          <i v-if="scope.row.showChildren" :class="{'fa fa-folder-open':scope.row.showChildren, 'fa fa-file-o':!scope.row.hasChildren}" @click="onExpand(scope.row)" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
          <i v-else :class="{'fa fa-folder':scope.row.hasChildren, 'fa fa-file-o':!scope.row.hasChildren}" @click="onExpand(scope.row)" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
          <span :data-level="scope.row.level" :style="{marginLeft: 4 + 'px'}">{{ scope.row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="categoryid" label="分类ID" width="80" align="center"></el-table-column>
      <el-table-column prop="parentcategoryid" label="父类ID" width="80" align="center"></el-table-column>
      <el-table-column prop="undeployed" label="模板（未发布）" align="left"></el-table-column>
      <el-table-column prop="deployed" label="模板（已发布）" align="left"></el-table-column>
      <el-table-column prop="edit" label="合同实例（编辑中）" align="left"></el-table-column>
      <el-table-column prop="completed" label="合同实例（完成）" align="left"></el-table-column>
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
    //         columns: [
    //     {
    //       text: "事件",
    //       value: "event",
    //       width: 200
    //     },
    //     {
    //       text: "ID",
    //       value: "id"
    //     }
    //   ],
    //     tabledata: [
    //     {
    //       id: 0,
    //       event: "事件1",
    //       timeLine: 50,
    //       comment: "无"
    //     },
    //     {
    //       id: 1,
    //       event: "事件1",
    //       timeLine: 100,
    //       comment: "无",
    //       children: [
    //         {
    //           id: 2,
    //           event: "事件2",
    //           timeLine: 10,
    //           comment: "无"
    //         },
    //         {
    //           id: 3,
    //           event: "事件3",
    //           timeLine: 90,
    //           comment: "无",
    //           children: [
    //             {
    //               id: 4,
    //               event: "事件4",
    //               timeLine: 5,
    //               comment: "无"
    //             },
    //             {
    //               id: 5,
    //               event: "事件5",
    //               timeLine: 10,
    //               comment: "无"
    //             },
    //             {
    //               id: 6,
    //               event: "事件6",
    //               timeLine: 75,
    //               comment: "无",
    //               children: [
    //                 {
    //                   id: 7,
    //                   event: "事件7",
    //                   timeLine: 50,
    //                   comment: "无",
    //                   children: [
    //                     {
    //                       id: 71,
    //                       event: "事件71",
    //                       timeLine: 25,
    //                       comment: "xx"
    //                     },
    //                     {
    //                       id: 72,
    //                       event: "事件72",
    //                       timeLine: 5,
    //                       comment: "xx"
    //                     },
    //                     {
    //                       id: 73,
    //                       event: "事件73",
    //                       timeLine: 20,
    //                       comment: "xx"
    //                     }
    //                   ]
    //                 },
    //                 {
    //                   id: 8,
    //                   event: "事件8",
    //                   timeLine: 25,
    //                   comment: "无"
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ],
            statisticDatas: [],
            pastDays: 0,
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
       mounted() {
            let self = this
            self.loadStatisticData()
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
        

         _processLevelStatisticData(dataArray) {
      let self = this

      let resultArray = [] // 一级栏目
      let level = 1
      for (let i = 0; i < dataArray.length; i++) {
        let item = dataArray[i]
        // 查找一级分类
        if (item.parentcategoryid === 0) {
          item['level'] = level
          resultArray.push(item)
          self._loadChildrenData(resultArray, dataArray, item, level + 1)
        }
      }
      return resultArray
    },

    _loadChildrenData(resultArray, originArray, item, level) {
      let self = this

      let deployed = 0
      let undeployed = 0
      let edit = 0
      let completed = 0

      for (let i = 0; i < originArray.length; i++) {
        let originItem = originArray[i]
        // 判断是否是item项的子项
        if (originItem.parentcategoryid === item.categoryid) {
          item['hasChildren'] = true
          item['showChildren'] = false

          originItem['level'] = level
          originItem['visible'] = false // 子项默认隐藏
          originItem['hiddenByCategory'] = false

          resultArray.push(originItem)
          self._loadChildrenData(
            resultArray,
            originArray,
            originItem,
            level + 1
          )

          // 应该放在统计完子类数据之后
          deployed += originItem.deployed
          undeployed += originItem.undeployed
          edit += originItem.edit
          completed += originItem.completed
        }
      }
      // 计算子栏目统计合计
      item.deployed += deployed
      item.undeployed += undeployed
      item.edit += edit
      item.completed += completed
    },

    search() {
      console.log(this.pastDays)
      this.loadStatisticData()
    },

    loadStatisticData() {
      let self = this
      let params = {
        pastDays: self.pastDays
      }
      commonService.getGeneralStatistics(params).then(function(response) {
        let result = response.data
        let resultArray = self._processLevelStatisticData(result)
        self.statisticDatas = resultArray
      })
    },

    rowClassNameHandler({ row, rowIndex }) {
      // console.log(row['visible'])
      let className = 'pid-' + row.parentcategoryid
      if (
        row.parentcategoryid !== 0 &&
        (row['visible'] !== true || row['hiddenByCategory'] === true)
      ) {
        className += ' hiddenRow'
      }
      return className
    },

    onExpand(row) {
      let self = this

      let isShowChildren = !row['showChildren']
      row['showChildren'] = isShowChildren
      self._loadAllSubItems(row, true, isShowChildren)
    },

    _loadAllSubItems(item, isFirstLevlChildren, isShowChilren) {
      let self = this
      let dataArray = []
      for (let i = 0; i < self.statisticDatas.length; i++) {
        let tempItem = self.statisticDatas[i]
        if (tempItem.parentcategoryid === item.categoryid) {
          if (isFirstLevlChildren) {
            tempItem['visible'] = !tempItem['visible']
          }
          tempItem['hiddenByCategory'] = !isShowChilren

          dataArray.push(tempItem)
          let subItemArray = self._loadAllSubItems(
            tempItem,
            false,
            isShowChilren
          )
          dataArray = dataArray.concat(subItemArray)
        }
      }
      return dataArray
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