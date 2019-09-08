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
           <ul class="role-table col-xs-offset-2 col-md-offset-1 col-sm-offset-2">
              <li class="header_li">
                  <div class="left left_frist">分类名称 <span>全部收缩</span></div>
                  <div class="left left1">内容数量</div>
                  <div class="left left2">首页导航栏显示规则</div>
                  <div class="left left3">排序</div>
                  <div class="left left4">首页楼层导航显示规则</div>
                  <div class="left left3">排序</div>
                  <div class="left left5">首页需求大厅展示</div>
                  <div class="left left3">排序</div>
                  <div class="right right1">技术费率</div>
                  <div class="right right2">保证金</div>
                  <div class="right right3">操作</div>
              </li>
              <div class="vertical-line"></div>
              <li  v-for="(item,index) in dataList" :key="item.id">
                  <div class="left h40"  @click="fold(item)">
                      <i :class="{'el-icon-caret-right':item.folded,'el-icon-caret-bottom':!item.folded}"
                        v-cloak v-if="item.second"
                        class="item-icon"></i>
                      <el-checkbox @click.native="handleOneCheckAll($event,item)" v-cloak v-if="!item.second" :indeterminate="item.isIndeterminate" v-model="item.checkAll"> {{item.title}}</el-checkbox>
                          <span v-if="item.second" v-cloak>{{item.title}}</span>
                  </div>
                  <div class="right h40">
                      <el-checkbox v-if="item.second" :indeterminate="item.isIndeterminate" @change="checkSecondAll(item)" v-model="item.firstCheckAll"> 所有</el-checkbox>

                      <el-checkbox-group v-model="item.checkedCities" @change="handleOneCheckedCitiesChange(item)" v-else>
                          <el-checkbox  v-for="m in item.list" :label="m.id" :key="m.id" v-cloak> {{m.name}}</el-checkbox>
                      </el-checkbox-group>
                  </div>
                  <div class="line"></div>
                  <ul v-show="item.second&&!item.folded">
                      <li class="h40" v-for="(second,cur) in item.second" :key="second.id">
                          <div class="left">
                              <el-checkbox   v-model="second.checkAll" @change="handleCheckAllChange($event,item,second)" v-cloak>
                                  {{second.title}}
                              </el-checkbox>
                          </div>
                          <div class="right">
                              <el-checkbox-group v-model="second.checkedCities" @change="handleCheckedCitiesChange(item,second)">
                                  <el-checkbox v-for="p in second.list" :label="p.id" :key="p.id" v-cloak >
                                      {{p.name}}
                                  </el-checkbox>
                              </el-checkbox-group>
                          </div>
                          <div class="line"></div>
                      </li>
                  </ul>
              </li>
          </ul>

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
    //import treeTable from "@/components/treetable/index.vue";
    // import TreeGrid from "@/components/TreeTable";
    import {deleteApply,nuitList,addunit} from '@/api/management';
    const defaultListQuery = {
        unitname:null,
    };
    
    export default {
      name:'typemanage',
      //components: { TreeGrid,treeTable },
      data() {
        return {
             dataList: [
            {
                title: "概况",
                id: "0",
                checkedCities:[],
                list: [
                    {
                        name: "浏览",
                        id: "10001"
                    },
                    {
                        name: "修改",
                        id: "11111"
                    }
                ]
            },
            {
                title: "会员管理",
                id: "1",
                second: [
                    {
                        title: "会员列表",
                        id: "11",
                        list: [
                            {
                                name: "新增",
                                id: "10002"
                            },
                            {
                                name: "修改",
                                id: "10003"
                            }
                        ],
                        checkedCities: []
                    },
                    {
                        title: "会员等级",
                        id: "12",
                        list: [
                            {
                                name: "新增",
                                id: "10004"
                            },
                            {
                                name: "修改",
                                id: "10005"
                            },
                            {
                                name: "删除",
                                id: "1006"
                            }

                        ],
                        checkedCities: []
                    }
                ]
            },
            {
                title: "菜品管理",
                id: "2",
                second: [
                    {
                        title: "菜品列表",
                        id: "21",
                        list: [
                            {
                                name: "新增",
                                id: "10007"
                            },
                            {
                                name: "修改",
                                id: "10008"
                            }
                        ],
                        checkedCities: []
                    },
                    {
                        title: "会员等级",
                        id: "22",
                        list: [
                            {
                                name: "浏览",
                                id: "10009"
                            },
                            {
                                name: "新增",
                                id: "10010"
                            },
                            {
                                name: "修改",
                                id: "10011"
                            },
                            {
                                name: "删除",
                                id: "10012"
                            }
                        ],
                        checkedCities: []
                    }
                ]
            }
        ],
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
  .role-table {
    border: 1px solid #e0e0e0;
    border-bottom: none;
    padding: 0;
    position: relative;
    list-style: none;
}

.header_li {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e7e7e7;
    background: #F8F8F9;
    text-align: center;
    .left {
      float: left;
      padding-left: 10px;
      user-select: none;
      cursor: pointer;
    }
    .left_frist {
      width: 10%;
      min-width: 165px;
    }
    .left1 {
      width: 5%;
      min-width: 82px;
    }
    .left2 {
      width: 10%;
      min-width: 175px;
    }
    .left3 {
      width: 3%;
      width: 60px;
    }
    .right {
        float: left;
        padding-left: 10px;
    }

}

.vertical-line {
    width: 1px;
    height: 100%;
    background: #ddd;
    position: absolute;
    left: 30%;
    top: 0
}

.one {
    padding-left: 20px;
}

.item-icon {
    margin-left: -5px;
    padding: 5px;
}

.line {
    clear: both;
    width: 100%;
    height: 1px;
    background: #e0e0e0;
}
.h40{
    height: 39px;
    line-height: 39px;
}
[v-cloak] {
    display: none;
}

</style>