<template>
  <el-container>
    <el-main>
        <div  style="height:100%;">
            <el-header style="height:auto; padding:0;">
              <el-form ref="searchForm" :model="searchForm"  class="el-row">
                <el-row :gutter="20">
                  <el-col :md="4" :lg="3" >
                    <el-form-item label="分类" label-width="40px">
                        <el-select
                          v-model="searchForm.cate_id"
                          size="small"
                          clearable
                          filterable
                          collapse-tags
                          placeholder="分类"
                          style="width:100%;">
                          <el-option label="全部" value=""></el-option>
                          <el-option
                            v-for="item in typeData"
                            :key="item.value"
                            :label="item.label.toUpperCase()"
                            :value="item.value"
                            class="my-option"/>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="4" :lg="3">
                    <el-form-item label="状态" label-width="45px">
                    <el-select
                      v-model="searchForm.is_show"
                      size="small"
                      clearable
                      filterable
                      collapse-tags
                      placeholder="状态"
                      style="width:100%;">
                      <el-option
                        v-for="item in statusData"
                        :key="item.value"
                        :label="item.label.toUpperCase()"
                        :value="item.value"
                        class="my-option"/>
                    </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="4" :lg="3" >
                    <el-form-item>
                      <el-input size="small" placeholder="属性名称" v-model="searchForm.attr_name" clearable/>
                    </el-form-item>
                  </el-col>
                  <el-col :md="8" :lg="4">
                    <el-row>
                      <el-col :md="12" :lg="8">
                        <el-form-item>
                          <el-button size="small" :loading="loading" type="primary" icon="el-icon-search" @click="getAllList">搜索</el-button>
                        </el-form-item>
                      </el-col>
                      <el-col :md="12" :lg="16">
                        <el-form-item>
                          <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAddClick()">添加规格属性</el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form>
            </el-header>
            <div class="table-container" style="margin-top:0;">
              <el-table
                v-loading="loading"
                :data="list"
                border
                style="width: 100%;">
                <el-table-column prop="id" label="ID" width="60" align="center"/>
                <el-table-column prop="attr_name" label="名称" width="140" align="center"/>
                <el-table-column label="所属分类" align="center">
                    <template slot-scope="scope">
                        <div>
                            <span v-for="(item, index) in scope.row.cate_id">{{item.cate_name}}；</span>
                        </div>
                    </template> 
                </el-table-column>
                <el-table-column  label="销售属性" width="100"  align="center">
                    <template slot-scope="scope">
                        <el-tag
                          :type="scope.row.sale_attr == 1 ? 'success' : 'danger'"
                          disable-transitions>{{scope.row.sale_attr == 1 ? '是' : '否'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="输入方式" width="180" align="center">
                   <template slot-scope="scope">
                    <el-tag type="success" size="mini" v-if="scope.row.input_type==1">
                        手动输入    
                    </el-tag>
                    <el-tag type="danger" size="mini" v-else-if="scope.row.input_type==2">
                        下拉列表选择
                    </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="input_select_val" label="可选值" width="200" align="center">
                </el-table-column>
                <el-table-column prop="" label="可筛选" width="80" align="center">
                    <template slot-scope="scope">
                        <el-tag
                          :type="scope.row.screen == 1 ? 'success' : 'danger'"
                          disable-transitions>{{scope.row.screen == 1 ? '是' : '否'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100"  align="center">
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.is_show"
                        @change="handleStatusChange(scope.$index,scope.row)"
                        :active-value="1"
                        :inactive-value="0">
                        </el-switch>
                    </template>   
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini"
                        @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                
              </el-table>
            </div>
            <div class="pagination-container">
                  <el-pagination
                    :current-page="pager.page"
                    background
                    :page-sizes="[20, 30, 50, 100]"
                    :page-size="pager.pageSize"
                    :total="pager.total"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handlePageChange">
                  </el-pagination>
            </div>
        </div>
          <!-- 添加/编辑单位 -->
        <el-dialog :title="dialogTitle" width="35%"  @close="handleClose" class="demo-ruleForm" :visible.sync="dialogFormVisible">
            <el-form :model="nologyform" class="specsform" status-icon :rules="rules" label-position="right" label-width="100px" ref="nologyform">
                <el-form-item prop="attr_name" label="名称：">
                    <el-input size="mini" v-model="nologyform.attr_name" placeholder="" clearable/>
                </el-form-item>
                <el-form-item prop="cate_id" label="分类：">
                    <ul class="Annex" v-model="nologyform.cate_id">
                        <li v-for="(item, index) in nologyform.cate_id" v-bind:key='item.id'>
                            {{item.cate_name}}; <span @click="removeTodo(index)" style="cursor: pointer;color:red;font-size: 20px;margin-left: 8px;">x</span>
                        </li>
                    </ul>
                    <el-button size="mini" @click="handletype()">添加分类</el-button>
                </el-form-item>
                <el-form-item  label="输入方式：">
                    <el-radio-group @change="radioChange" v-model="nologyform.input_type">
                      <el-radio :label="1">手动输入</el-radio>
                      <el-radio :label="2">下拉列表选择</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-show="input_show"  label="可选值：">
                    <el-input :autosize="{ minRows: 1, maxRows: 4}"
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="nologyform.input_select_val">
                    </el-input>
                    <div>请使用“|”符号分隔，如A|B，范围数值需与筛选范围一 一对应</div>
                </el-form-item>
                <el-form-item  label="销售属性：">
                    <el-radio-group  v-model="nologyform.sale_attr">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="属性筛选：">
                    <el-radio-group @change="radiooptional" v-model="nologyform.optional">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div v-show="input_show1" class="input_show1">
                  <el-form-item style="margin-bottom:0;"  label="筛选范围：">
                      <el-input :autosize="{ minRows: 1, maxRows: 4}"
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="nologyform.optional_val_1">
                      </el-input>
                      <div>请使用“|”符号分隔，如A|B，范围数值需与筛选范围一 一对应</div>
                  </el-form-item>
                  <el-form-item style="margin-bottom:0;"  label="范围数值：">
                      <el-input :autosize="{ minRows: 1, maxRows: 4}"
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="nologyform.optional_val_2">
                      </el-input>
                      <div>请使用“|”符号分隔，如A|B，范围数值需与筛选范围一 一对应</div>
                  </el-form-item>
                </div>
                <el-form-item label="状态：">
                    <el-radio-group  v-model="nologyform.is_show">
                      <el-radio :label=1>显示</el-radio>
                      <el-radio :label=0>不显示</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="specsopen('nologyform')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加分类-->
        <el-dialog title="添加分类" width="25%"  class="demo-ruleForm" :visible.sync="dialogFormVisible1">
            <el-form :model="nologyform1" status-icon :rules="rules"  label-position="right" label-width="100px" ref="nologyform1">
                <el-form-item prop="playtype2" label="一级分类">
                    <el-select
                        size="small"
                        v-model="nologyform1.playtype2" clearable placeholder="">
                        <el-option
                        v-for="item in typeData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value+','+item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="quotaopen1('nologyform1')">确 定</el-button>
            </div>
        </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import { Message, MessageBox, Loading } from 'element-ui'
  import { specsList, deletespecs, editspecs, addspecs, specstype, updateApplyStatus} from '@/api/cms/specs';
  export default {
    name: 'specs',
    data() {
      return {
      rules: {
                attr_name: [{ required: true, trigger: 'blur', message: '名称不能为空' }],
                playtype2: [{ required: true, trigger: 'blur', message: '分类不能为空' }],
                cate_id: [{ required: true, trigger: 'blur', message: '分类不能为空' }],
            },
      list:[],
      typeData:[],
      statusData:[{
          label: "全部",
          value: ''
        },{
          label: "显示",
          value: 1
        },{
          label: "不显示",
          value: 2
        }],
      searchForm: {
        cate_id:'',
        is_show:'',
        attr_name:'',
        page: 1,
        pageSize: 10
      },
      pager:{
        page: 1,
        pageSize: 10,
        total: 0,
      },
       //添加/编辑单位
      nologyform:{
          id:null,
          cate_id:[],
          attr_name:'',
          input_type:1,
          input_select_val:'',
          sale_attr:0,
          optional:0,
          optional_val_1:null,
          optional_val_2:null,
          is_show:1,
      },
      nologyform1:{
        playtype2:'',
      },
      dialogFormVisible:false,
      dialogFormVisible1:false,
      dialogTitle:'添加规格属性',
      dialogTitle1:'添加分类',
      loading: false,
      loading1: false,
      labelPosition: 'left',
      input_show:false,
      input_show1:false,
      imgurl:'http://ltzm1.oss-cn-shenzhen.aliyuncs.com/',
    }
  },
  created() {
    //初始化分类数据
    this.searchtype(0);
    //初始化列表数据
    this.getAllList();
  },
  mounted() {
    
  },
  filters: {
    
  },
  methods: {
    //初始化一级分类数据
    searchtype(pid) {
      specstype(pid).then(res => {
        this.typeData = res.data.map((item) => {
          return { value:item.id, label:item.cate_name }
        })
      }).catch(e => {
        if (e) this.$message.error(e)
      })
    },    
    //检索输入方式类型
    radioChange(){
      console.log(this.nologyform.input_type)
      if(this.nologyform.input_type ==2){
          this.input_show = true;
      }else{
          this.input_show = false;
      }
    },
    //检索属性筛选类型
    radiooptional() {
      if(this.nologyform.optional ==1){
          this.input_show1 = true;
      }else{
          this.input_show1 = false;
      }
    },
    handletype() {
      this.dialogFormVisible1 = true;
    },
    //添加规格弹窗
    handleAddClick() {
      this.dialogFormVisible = true;
      this.dialogTitle = "添加规格属性";
      this.nologyform.id = null;
      
      
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.dialogTitle = "编辑规格属性";
      this.nologyform.id = row.id;
      this.nologyform.cate_id = row.cate_id;
      this.nologyform.attr_name = row.attr_name;
      this.nologyform.input_type = row.input_type;
      if(this.nologyform.input_type ==2){
          this.input_show = true;
      }else{
          this.input_show = false;
      }
      this.nologyform.input_select_val = row.input_select_val;
      this.nologyform.sale_attr = row.sale_attr;
      this.nologyform.optional = row.optional;
      if(this.nologyform.optional==1){
          this.input_show1 = true;
      }else{
          this.input_show1 = false;
      }
      this.nologyform.optional_val_1 = row.optional_val_1;
      this.nologyform.optional_val_2 = row.optional_val_2;  
      this.nologyform.is_show = row.is_show; 
    },
    /**
     * 搜索
     */
    getAllList() {
      this.loading = true
      specsList(this.searchForm).then((result) => {
        this.list = result.data
        this.pager.total = result.meta.pagination.total
        this.loading=false
      }).catch((err) => {
        if(err) this.$message.error(err)
      })

    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          deletespecs(row.id).then(response => {
              this.$message({
                  type: 'success',
                  message: '删除成功!'
              });
              this.getAllList();//删除更新页面
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
    //修改展示状态
    handleStatusChange(index,row){
        let id = row.id;
        let param = {
            id:id,
            show:row.is_show
        };
        console.log(param);
        updateApplyStatus(param).then(response=>{
          this.$message({
            message: '状态修改成功',
            type: 'success'
          });
        });
    },
    //编辑或新增规格
    specsopen(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                //拆分id
                var ids = []
                this.nologyform.cate_id.map((item) => {
                    ids.push(Number(item.id));
                }); 
                this.nologyform.cate_id = ids.join(',');
                if(this.nologyform.optional==1){
                    
                }else{
                    this.nologyform.optional_val_1 = '';
                    this.nologyform.optional_val_2 = '';
                }
                if(this.nologyform.id){//编辑
                    let specsjson = {
                        cate_id:this.nologyform.cate_id,
                        attr_name:this.nologyform.attr_name,
                        input_type:this.nologyform.input_type,
                        input_select_val:this.nologyform.input_select_val,
                        sale_attr:this.nologyform.sale_attr,
                        optional:this.nologyform.optional,
                        optional_val_1:this.nologyform.optional_val_1,
                        optional_val_2:this.nologyform.optional_val_2,
                        is_show:this.nologyform.is_show,
                    }
                    editspecs(this.nologyform.id,specsjson).then((result) => {
                        this.$message({
                            type: 'success',
                            message: '编辑成功!'
                        });
                        this.getAllList();//删除更新页面
                    }).catch((err) => {
                        if(err) this.$message.error(err)
                    })
                }else{//新增
                    addspecs(this.nologyform).then(response => {
                      this.$message({
                        message: '规格新增成功',
                        type: 'success'
                      });
                      this.getAllList();//更新页面
                    })
                }
                this.dialogFormVisible = false;
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    },
    //添加分类确认验证
    quotaopen1(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log(this.nologyform1)
                let c_id1 = this.nologyform1.playtype2.split(',');
                let  c_id = c_id1[0];
                let  c_name = c_id1[1];
                console.log(c_id,c_name)
                let cate_json={
                    id:c_id,
                    cate_name:c_name
                }
                this.nologyform.cate_id.push(cate_json);
                this.dialogFormVisible1 = false;
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    },
    //删除分类某一行数据
    removeTodo: function (index) {
      this.nologyform.cate_id.splice(index, 1);
      console.log(this.nologyform.cate_id);
    },
    /**
     * 分页器：页大小变更
     */
    handleSizeChange(val) {
      this.pager.pageSize = val
      this.searchForm.pageSize = val
      this.getAllList()
    },
    /**
     * 分页器：页码变更
     */
     handlePageChange(val) {
      this.pager.page = val
      this.searchForm.page = val
      this.getAllList()
    },
    /**
     * 表单关闭时事件
    */
    handleClose() {
      this.$refs['nologyform'].resetFields();
    },
}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .input-width {
    width: 150px;
  }
  .el-select {
    width: 150px;
  }
  .foot_col span{
    font-size: 13px;
    line-height: 31px;
  }
  .search-form {
    /* margin-bottom: -20px; */
  }
  .input_show1 {
    .el-select {
      width: 50%;
    }
  }
  .Annex {
     margin: 0;
     list-style: none;
     display: -webkit-flex; /* Safari */
     display: flex;
     flex-direction:column;
     padding-left: 0;
     li {
         
     }
    }
  .specsform {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
</style>

