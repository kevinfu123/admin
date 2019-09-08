<template> 
   <el-container>
    <el-main>
       <el-header style="height:auto; padding:0;">
          <el-form :inline="true" size="small" label-width="80px">
            <el-form-item>
                <el-input size="mini" placeholder="类目关键字" v-model="listQuery.cname" clearable/>
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
           <ul class="role-table">
              <li class="header_li">
                  <div class="left left_frist">分类名称 <span>全部收缩</span></div>
                  <div class="left left1">内容数量</div>
                  <div class="left left2">首页导航栏显示规则</div>
                  <div class="left left3">排序</div>
                  <div class="left left2">首页楼层导航显示规则</div>
                  <div class="left left3">排序</div>
                  <div class="left left2">首页需求大厅展示</div>
                  <div class="left left3">排序</div>
                  <div class="right right1">技术费率</div>
                  <div class="right right3">企业/个人保证金</div>
                  <div class="right right2 text_center">操作</div>
              </li>
              <li class="role_li" v-for="(item,index) in dataList" :key="item.id">
                  <div class="left left_frist text_left">
                      <i  v-cloak  class="item-icon"></i>
                      <span v-cloak>{{item.cate_name}}</span>
                  </div>
                  <div class="left left1">无</div>
                  <div class="left left2">{{item.index_nav_show | statusFilter}}</div>
                  <div class="left left3">{{item.index_nav_sort}}</div>
                  <div class="left left2">{{item.floor_nav_show | floorFilter}}</div>
                  <div class="left left3">{{item.floor_nav_sort}}</div>
                  <div class="left left2">
                      <el-switch
                        v-model="item.index_needs_show"
                        @change="handleStatusChange(item)"
                        :active-value="1"
                        :inactive-value="0">
                      </el-switch>
                  </div>
                  <div class="left left3">{{item.index_needs_sort}}</div>
                  <div class="right right1">——</div>
                  <div class="right right3">
                    <span style="color:red;margin-right:5px;">{{Number(item.min_deposit_enterprise)}}</span>
                    /<span style="color:red;margin-left:5px;">{{Number(item.min_deposit_personal)}}</span>
                  </div>
                  <div class="right right2">
                      <el-button class="edit-but" @click="handlemanage(item)" type="text" size="small">编辑</el-button>
                      <el-button @click="handlelower(item)" type="text" size="small">新增下级</el-button>
                      <el-button @click="handleadver(item)" type="text" size="small">设置广告图</el-button>
                  </div>
                  <!-- 二级数据 -->
                  <div class="line"></div>
                  <ul class="ul-child" v-show="item.children">
                      <li class="childrole_li" v-for="(itemchild,index) in item.children" :key="itemchild.id">
                          <div class="left child_frist text_center">
                              <i  v-cloak  class="item-icon"></i>
                              <span v-cloak>{{itemchild.cate_name}}</span>
                          </div>
                          <div class="left childleft1">无</div>
                          <div class="left childleft2">{{itemchild.index_nav_show | statusFilter}}</div>
                          <div class="left childleft3">{{itemchild.index_nav_sort}}</div>
                          <div class="left childleft2">{{itemchild.floor_nav_show | floorFilter}}</div>
                          <div class="left childleft3">{{itemchild.floor_nav_sort}}</div>
                          <div class="left childleft2">
                              ——
                          </div>
                          <div class="left childleft3">{{itemchild.index_needs_sort}}</div>
                          <div class="right childright1">——</div>
                          <div class="right childright3">
                            ———
                          </div>
                          <div class="right childright2">
                              <el-button class="edit-but" @click="handlemanage(itemchild)" type="text" size="small">编辑</el-button>
                              <el-button @click="handlelower(itemchild)" type="text" size="small">新增下级</el-button>
                          </div>
                          <!-- 三级级数据 -->
                          <div class="line"></div>
                          <ul class="ul-child-item">
                              <li class="last_role_li" v-for="(itemlast,index) in itemchild.children" :key="itemlast.id">
                                  <div class="left last-child text_right">
                                      <span style="margin-right:10px;">{{itemlast.cate_name}}</span>
                                  </div>
                                  <div class="left lastleft1">无</div>
                                  <div class="left lastleft2">{{itemlast.index_nav_show | statusFilter}}</div>
                                  <div class="left lastleft3">{{itemlast.index_nav_sort}}</div>
                                  <div class="left lastleft2">{{itemlast.floor_nav_show | floorFilter}}</div>
                                  <div class="left lastleft3">{{itemlast.floor_nav_sort}}</div>
                                  <div class="left lastleft2">
                                      ——
                                  </div>
                                  <div class="left lastleft3">{{itemlast.index_needs_sort}}</div>
                                  <div class="right lastright1">{{itemlast.tech_rate}}%</div>
                                  <div class="right lastright3">
                                    ———
                                  </div>
                                  <div class="right lastright2">
                                      <el-button class="edit-but" @click="handlemanage(itemchild)" type="text" size="small">编辑</el-button>
                                  </div>
                              </li>
                              <div class="line"></div>
                          </ul>
                      </li>
                      <div class="line"></div>
                  </ul>
              </li>
              <!-- <li  v-for="(item,index) in dataList" :key="item.id">
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
              </li> -->
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
    import {deletetype, typeList, addtype, editstatus} from '@/api/system/typemanage';
    const defaultListQuery = {
        cname:null,
    };
    
    export default {
      name:'typemanage',
      data() {
        return {
            dataList: [],
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
         this.getList();
      },
      filters: {
        statusFilter(status) {
          const statuses = {
              '0': '不显示',
              '1': '左侧',
              '2': '右侧',
          }
          return statuses[status]
        },
        floorFilter(status) {
          const statuses = {
              '0': '不显示',
              '1': '显示',
          }
          return statuses[status]
        },
      },
      computed: {
        
      },
      
      methods:{
        //初始化分类数据
        getList() {

            typeList(this.listQuery).then((result) => {
              this.dataList = result.data 
            }).catch((err) => {
              if(err) this.$message.error(err)
            }) 
        },
        //修改展示状态
        handleStatusChange(row){
            let id = row.id;
            let param = {
                id:id,
                show:row.index_needs_show
            };
            console.log(param);
            editstatus(param).then(response=>{
              this.$message({
                message: '状态修改成功',
                type: 'success'
              });
            });
        },
        //设置广告图事件
        handleadver(row) {

        },
        //新增下级点击事件
        handlelower(row) {

        },
        handleSearchList() {
          this.getList();
        },
        handleAddClick() {
            this.dialogFormVisible = true;
            this.dialogTitle = "添加单位";
            this.nologyform.id = null;
            this.nologyform.quota = '';
        },
        handlemanage(row) {
          this.dialogFormVisible = true;
          this.dialogTitle = "编辑单位";
          this.nologyform.id = row.id;
          this.unitall = row.unitname;
          this.nologyform.quota = row.unitname;

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
ul,li {
  list-style: none;
}
.header_li {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e7e7e7;
    background: #F8F8F9;
    text-align: center;
}
.role_li {
    line-height: 40px;
    //border-bottom: 1px solid #e7e7e7;
    text-align: center;
    .ul-child {
      padding-left: 0;
      overflow: auto;
      .childrole_li {
        overflow: auto;
        line-height: 40px;
       // border-bottom: 1px solid #e7e7e7;
        text-align: center;
        .child_frist {
          width: 10%;
          min-width: 165px;
        }
        .childleft1 {
          width: 8%;
          min-width: 82px;
        }
        .childleft2 {
          width: 12%;
          min-width: 175px;
        }
        .childleft3 {
          width: 5%;
          width: 60px;
        }
        .childright {
          float: left;
        }
        .childright1 {
          width: 8%;
          min-width: 82px;
          border-right: 1px solid #ddd;
        }
        .childright2 {
          width: 13%;
          min-width: 250px;
          text-align: left;
        }
        .childright3 {
          width: 10%;
          min-width: 175px;
          border-right: 1px solid #ddd;
        }
        //三级样式
        .ul-child-item {
          padding-left: 0;
          overflow: auto;
          .last_role_li {
            overflow: auto;
            line-height: 40px;
            //border-bottom: 1px solid #e7e7e7;
            text-align: center;
            .last-child {
              width: 10%;
              min-width: 165px;
            }
            .lastleft1 {
              width: 8%;
              min-width: 82px;
            }
            .lastleft2 {
              width: 12%;
              min-width: 175px;
            }
            .lastleft3 {
              width: 5%;
              width: 60px;
            }
            .lastright {
              float: left;
            }
            .lastright1 {
              width: 8%;
              min-width: 82px;
              border-right: 1px solid #ddd;
            }
            .lastright2 {
              width: 13%;
              min-width: 250px;
              text-align: left;
            }
            .lastright3 {
              width: 10%;
              min-width: 175px;
              border-right: 1px solid #ddd;
            }
          }
          
        }
      }
    }
}
.left {
  float: left;
  user-select: none;
  cursor: pointer;
  border-right: 1px solid #ddd;
}
.left_frist {
  width: 10%;
  min-width: 165px;
}
//一级数据样式
.left1 {
  width: 8%;
  min-width: 82px;
}
.left2 {
  width: 12%;
  min-width: 175px;
}
.left3 {
  width: 5%;
  width: 60px;
}
.right {
  float: left;
}
.right1 {
  width: 8%;
  min-width: 82px;
  border-right: 1px solid #ddd;
}
.right2 {
  width: 13%;
  min-width: 250px;
  text-align: left;
}
.right3 {
  width: 10%;
  min-width: 175px;
  border-right: 1px solid #ddd;
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
//居左，居中，居右
.text_left {
  text-align: left;
}

.text_center {
  text-align: center;
}

.text_right {
  text-align: right;
}
.edit-but {
  margin-left: 15px;
}
</style>