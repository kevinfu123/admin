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
                  <div class="left left_frist">分类名称 <span @click="allfold()">{{openvalue}}</span></div>
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
              <div v-if="dataList.length==0" style="height:200px;text-align:center;line-height:200px;color:red;border-bottom:1px solid #e0e0e0;font-size:20px;letter-spacing: 5px;">
                   搜索不对，无数据！！！
              </div>
              <li class="role_li" v-for="(item,index) in dataList" :key="item.id">
                  <div class="left left_frist text_left">
                      <i @click="togglefold(index,item)" :class="{'el-icon-caret-right':openicon[index].folded,'el-icon-caret-bottom':!openicon[index].folded}"
                       v-cloak  class="item-icon"></i>
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
                    ￥<span style="color:red;margin-right:5px;margin-left:2px;">{{Number(item.min_deposit_enterprise)}}</span>
                    /<span style="color:red;margin-left:5px;">{{Number(item.min_deposit_personal)}}</span>
                  </div>
                  <div class="right right2">
                      <el-button class="edit-but" @click="handlemanage(item)" type="text" size="small">编辑</el-button>
                      <el-button @click="handlelower(item)" type="text" size="small">新增下级</el-button>
                      <el-button @click="handleadver(item)" type="text" size="small">设置广告图</el-button>
                  </div>
                  <!-- 二级数据 -->
                  <div class="line"></div>
                  <ul class="ul-child" v-show="isOpenItem[index] && isOpenItem[index].group">
                      <li class="childrole_li" v-for="(itemchild,j) in item.children" :key="itemchild.id">
                          <div class="left child_frist text_center">
                              <i @click="checkSecondItem(index,j,itemchild)" :class="{'el-icon-caret-right':itemchild.folded,'el-icon-caret-bottom':!itemchild.folded}"
                               v-cloak  class="item-icon"></i>
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
                              <el-button class="edit-but" @click="lowermanage(itemchild)" type="text" size="small">编辑</el-button>
                              <el-button @click="lowerclick(itemchild)" type="text" size="small">新增下级</el-button>
                          </div>
                          <!-- 三级级数据 -->
                          <div class="line"></div>
                          <ul class="ul-child-item" v-show="isOpenItem[index] && isOpenItem[index].child[j]">
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
                                      <el-button class="edit-but" @click="handlemanagechild(itemlast)" type="text" size="small">编辑</el-button>
                                  </div>
                              </li>
                              <div class="line"></div>
                          </ul>
                      </li>
                      <div class="line"></div>
                  </ul>
              </li>
          </ul>
       </div>
        <!-- 添加/编辑单位 -->
        <el-dialog :title="dialogTitle" width="700px"  @close="handleClose" class="demo-ruleForm" :visible.sync="dialogFormVisible">
            <el-form :model="nologyform" status-icon :rules="rules" label-position="right" label-width="155px" ref="nologyform">
                <el-form-item style="margin-bottom: 16px;" prop="cate_name"  label="分类名称：">
                    <el-input style="width:60%;"  size="mini" v-model="nologyform.cate_name" placeholder="" clearable/>
                </el-form-item>
                <el-form-item prop="pid" label="上级分类：">
                    <el-cascader
                    style="width:60%;"
                    size="mini"
                    v-model="nologyform.pid"
                    :options="options"
                    :props="{ checkStrictly: true }"
                    clearable
                    @change="handleChange">
                    <template slot-scope="{ node, data }">
                      <span>{{ data.label }}</span>
                      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                    </template>
                    </el-cascader>
                </el-form-item>
                <el-form-item prop="index_nav_show" style="margin-bottom: 16px;" label="首页导航栏显示：">
                  <el-select
                    style="width:60%;"
                    size="mini"
                    v-model="nologyform.index_nav_show" clearable placeholder="">
                    <el-option
                      v-for="item in listdata"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="margin-bottom: 16px;" prop="index_nav_sort" label="排序：">
                    <el-input style="width:60%;"  size="mini" v-model.number="nologyform.index_nav_sort" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  label="楼层导航栏显示：">
                    <template>
                      <el-radio v-model="nologyform.floor_nav_show" label="1">是</el-radio>
                      <el-radio v-model="nologyform.floor_nav_show" label="2">否</el-radio>
                    </template>
                </el-form-item>
                <el-form-item  label="排序：">
                    <el-input style="width:60%;"  size="mini" v-model.number="nologyform.floor_nav_sort" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  label="首页需求大厅显示：">
                   <template>
                     <el-radio v-model="nologyform.index_needs_show" label="1">是</el-radio>
                     <el-radio v-model="nologyform.index_needs_show" label="2">否</el-radio>
                   </template>
                </el-form-item>
                <el-form-item  label="排序：">
                    <el-input style="width:60%;"  size="mini" v-model.number="nologyform.index_needs_sort" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  label="特殊技术费率：">
                    <el-input :disabled="tech_ratedisabled" style="width:30%" size="mini" v-model.number="nologyform.tech_rate" autocomplete="off"></el-input>
                    <span style="color:red;margin-left:5px;">注意:这个限制于三级类目</span>
                </el-form-item>
                <el-form-item  label="企业最低缴纳保证金：">
                    <el-input size="mini" v-model="nologyform.min_deposit_enterprise" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="个人最低缴纳保证金：">
                    <el-input size="mini" v-model="nologyform.min_deposit_personal" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="分类关键词：">
                    <el-input type="textarea" :rows="2" size="mini"  v-model="nologyform.cate_keywords" placeholder="" clearable/>
                    <div>关键词用于搜索引擎搜索，用"|"隔开，可输入多个</div>
                </el-form-item>
                <el-form-item  label="分类描述：">
                    <el-input type="textarea" :rows="2" size="mini"  v-model="nologyform.cate_description" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="分类图标：">
                    <el-input style="width:80%;" size="mini" v-model="nologyform.cate_icon" />
                    <el-upload
                        style="width: 15%;float: right;"
                        :action="fileAction"
                        name="img"
                        :headers="fileHeaders"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-success="handleSuccess1"
                        :on-exceed="handleExceed"
                        class="upload-demo"
                        >
                        <el-button size="small" type="primary">浏览</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" >确 定</el-button>
                <!-- @click="manageopen('nologyform')" -->
            </div>
        </el-dialog>
    </el-main>
   </el-container>
</template>

<script>
    import {edittype, typeList, addmanage, editstatus, catecut} from '@/api/system/typemanage';
    import { getToken } from '@/utils/auth';
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
              cate_name: [{ required: true, trigger: 'blur', message: '名称不能为空' }],
              pid:[{ required: true, trigger: 'blur', message: '父级id不能为空' }],
              index_nav_show:[{ required: true, trigger: 'blur', message: '首页导航栏不能为空' }],
              index_nav_sort:[{ required: true, message: '首页导航栏排序不能为空'},{ type: 'number', message: '首页导航栏排序为数字'}],
            },
            listQuery:Object.assign({},defaultListQuery),
            tableData: [],
            total:null,
            dialogTitle:"添加分类",
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
                value: 0
            }],
            iconPopover: false,
            nologyform:{
                id:null,
                pid:[0],
                cate_name:'',
                cate_icon:'',
                cate_description:'',
                cate_keywords:'',
                index_nav_show:null,
                index_nav_sort:null,
                floor_nav_show:null,
                floor_nav_sort:null,
                index_needs_show:null,
                index_needs_sort:null,
                min_deposit_enterprise:null,
                min_deposit_personal:null,
                tech_rate:null,
            },
            openvalue:'全部收缩',
            isOpenItem: [],//控制每级面板的打开与折叠
            openicon:[],
            imgurl:'http://ltzm1.oss-cn-shenzhen.aliyuncs.com/',
            fileAction: 'http://47.106.240.143/api/admin/upimg',
            fileHeaders: { 'Authorization':'Bearer '+getToken()},
            options:[],
            tech_ratedisabled:true,
        }
      },
      created(){
        //  this.gettype();
        //  this.getList();
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
        //全部收缩
        allfold() {
           let len = this.isOpenItem.length;
           if(this.openvalue=='全部收缩'){
              this.openvalue = '全部展开';
              for (let i = 0; i < len; i++) {
                  //根据数据初始化折叠面板折叠状态
                  this.$set(this.isOpenItem[i], 'group', false);
                  this.$set(this.openicon[i], "folded", true);
              }
           }else{
             this.openvalue = '全部收缩';
             for (let i = 0; i < len; i++) {
                  //根据数据初始化折叠面板折叠状态
                  this.$set(this.isOpenItem[i], 'group', true);
                  this.$set(this.openicon[i], "folded", false);
              }
           }
           this.$set(this.isOpenItem, 'group', !this.isOpenItem);
        },
        //点击展开或收缩
        togglefold(index,item) {
            if (typeof this.openicon[index].folded === "false") {
                this.$set(this.openicon[index], "folded", true);
            } else {
                this.openicon[index].folded = !this.openicon[index].folded;
            }
            this.$set(this.isOpenItem[index], 'group', !this.isOpenItem[index].group);
        },
        //二级展开或收缩
        checkSecondItem(firstIndex, secondIndex, item) {//展开或折叠第二层面板
            if (typeof item.folded === "undefined") {
                this.$set(item, "folded", true);
            } else {
                item.folded = !item.folded;
            }
            this.$set(this.isOpenItem[firstIndex].child, secondIndex, !this.isOpenItem[firstIndex].child[secondIndex]);
        },
        //初始化分类数据
        gettype() {
            catecut().then((result) =>{
              this.options = result;
              //this.options.unshift({value:0,label:'顶级分类'});
              this.options.splice(0,0,{value:0,label:'顶级分类'});
            }).catch((err) => {
              if(err) this.$message.error(err)
            }) 
        },
        //上级分类事件
        handleChange() {
          if(this.nologyform.pid.length>1) {
             this.tech_ratedisabled = false;
          }else{
             this.tech_ratedisabled = true;
          }
          console.log(this.nologyform.pid)
        },
        //初始化分类数据
        getList() {
            typeList(this.listQuery).then((result) => {
              this.dataList = result.data 
              let len = this.dataList.length;
              for (let i = 0; i < len; i++) {
                  //根据数据初始化折叠面板折叠状态
                  this.isOpenItem.push([]);
                  this.openicon.push([]);
                  this.$set(this.isOpenItem[i], 'group', true);
                  this.$set(this.isOpenItem[i], 'child', []);
                  this.$set(this.openicon[i],'folded',false);
                  //设置第二层级的状态
                  for (let j in this.dataList[i].children) {
                      this.isOpenItem[i].child.push(true)
                  }
              }
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
        //一级新增下级点击事件
        handlelower(row) {
          console.log(row)
          this.dialogFormVisible = true;
          this.nologyform.id = null;
          this.nologyform.pid = [row.id];
        },
        //一级编辑事件
        handlemanage(row) {
          this.dialogFormVisible = true;
          this.dialogTitle = "编辑一级分类";
          this.nologyform.id = row.id;
          this.nologyform.pid = [row.id];
          this.nologyform.cate_name = row.cate_name;
          this.nologyform.cate_icon = row.cate_icon;
          this.nologyform.cate_description = row.cate_description;
          this.nologyform.cate_keywords = row.cate_keywords;
          this.nologyform.index_needs_show = row.index_needs_show; 
          this.nologyform.index_nav_show = row.index_nav_show; 
          this.nologyform.index_nav_sort = row.index_nav_sort;     
          this.nologyform.floor_nav_show = row.floor_nav_show;
          this.nologyform.floor_nav_sort = row.floor_nav_sort;    
          this.nologyform.index_needs_sort = row.index_needs_sort;   
          this.nologyform.min_deposit_enterprise = row.min_deposit_enterprise;    
          this.nologyform.min_deposit_personal = row.min_deposit_personal;       
        },
        //二级新增下级事件
        lowerclick(row) {
          this.dialogFormVisible = true;
          this.nologyform.id = null;
          this.nologyform.pid = [row.pid,row.id];
        },
        lowermanage(row) {

        },
        //三级编辑事件
        handlemanagechild() {

        },
        handleSearchList() {
          // this.getList();
        },
        handleAddClick() {
            this.dialogFormVisible = true;
            this.dialogTitle = "添加分类";
            this.nologyform.id = null;
            this.nologyform.pid = [0];
            this.nologyform.cate_name = '';
            this.nologyform.cate_icon = null;
            this.nologyform.cate_description = null;
            this.nologyform.cate_keywords = null;
            this.nologyform.index_nav_show = null;
            this.nologyform.index_nav_sort = null;
            this.nologyform.floor_nav_show = null;
            this.nologyform.floor_nav_sort = null;
            this.nologyform.index_needs_show = null;
            this.nologyform.index_needs_sort = null;
            this.nologyform.min_deposit_enterprise = null;
            this.nologyform.min_deposit_personal = null;
            this.nologyform.tech_rate = null;
        },
        
        //添加、编辑一级分类
        manageopen(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var  pid;
                    if(this.nologyform.pid.length<2) {
                      pid = this.nologyform.pid[0];
                    } else {
                      pid = this.nologyform.pid[1];
                    };
                    this.nologyform.pid = pid;
                    if(this.nologyform.id) {//编辑
                       if(!this.nologyform.cate_icon) {
                         delete this.nologyform.cate_icon; 
                       }
                       if(!this.nologyform.cate_description) {
                         delete this.nologyform.cate_description; 
                       }
                       if(!this.nologyform.cate_keywords) {
                         delete this.nologyform.cate_keywords; 
                       }
                       delete this.nologyform.tech_rate;
                       edittype(this.nologyform.id,this.nologyform).then((result) => {
                          this.$message({
                              type: 'success',
                              message: '编辑成功!'
                          });
                          this.getList();//新增更新页面
                       }).catch((err) => {
                          if(err) this.$message.error(err)
                       })
                    } else {//新增
                        addmanage(this.nologyform).then(response => {
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
        
        //图片上传事件
        handlePreview(file) {
            console.log(file)
        },
        handleRemove(file, fileList) {

        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${file.name}？`)
        },
        handleSuccess1(response, file, fileList) {
            this.nologyform.cate_icon = response.data;
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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
  ul,li {
    list-style: none;
  }
  .role-table {
    border: 1px solid #ebeef5;
    border-bottom: none;
    padding: 0;
    position: relative;
    list-style: none;
    color: #606266;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    min-width: 1670px;
    font: 12px "微软雅黑";
}
.header_li {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ebeef5;
    background: #F8F8F9;
    text-align: center;
    color: #909399;
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
        text-align: center;
        div {
          height:40px;
        }
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
          border-right: 1px solid #ebeef5;
        }
        .childright2 {
          width: 13%;
          min-width: 250px;
          text-align: left;
        }
        .childright3 {
          width: 10%;
          min-width: 175px;
          border-right: 1px solid #ebeef5;
        }
        //三级样式
        .ul-child-item {
          padding-left: 0;
          overflow: auto;
          .last_role_li {
            overflow: auto;
            line-height: 40px;
            border-bottom: 1px solid #ebeef5;
            text-align: center;
            div {
              height: 40px;
            }
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
              border-right: 1px solid #ebeef5;
            }
            .lastright2 {
              width: 13%;
              min-width: 250px;
              text-align: left;
            }
            .lastright3 {
              width: 10%;
              min-width: 175px;
              border-right: 1px solid #ebeef5;
            }
          }
          .last_role_li:last-child {
            border-bottom:none;
          }
        }
      }
    }
}
.role_li>div {
      height: 40px;
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
    height: 1px !important;
    background: #ebeef5;
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
.el-upload-list{
  display: none;
}

</style>