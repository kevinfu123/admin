<template>
  <el-container>
    <el-main>
        <div  style="height:100%;">
          <el-container>
            <el-header style="height:auto; padding:0;">
              <el-form ref="searchForm" :model="searchForm"  class="el-row">
                <el-row :gutter="20">
                  <el-col :md="4" :lg="3" >
                    <el-form-item label="分类" label-width="40px">
                        <el-select
                          v-model="searchForm.specstype"
                          size="small"
                          clearable
                          filterable
                          collapse-tags
                          placeholder="分类"
                          style="width:100%;">
                          <el-option label="全部一级" value=""></el-option>
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
                      v-model="searchForm.specstatus"
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
                      <el-input size="small" placeholder="ID、名称" v-model="searchForm.specsname" clearable/>
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
                <el-table-column prop="brand_name" label="名称" width="140" align="center"/>
                <el-table-column label="所属分类" align="center">
                    <template slot-scope="scope">
                        <ul class="Annex">
                            <li v-for="(item, index) in scope.row.cate_id">
                                {{item.c_name}}<span>；</span>
                            </li>
                        </ul>
                    </template> 
                </el-table-column>
                <el-table-column  label="销售属性" width="100"  align="center">
                    <template slot-scope="scope">
                        <el-tag
                          :type="scope.row.is_hot == 1 ? 'danger' : 'success'"
                          disable-transitions>{{scope.row.is_hot == 1 ? '是' : '否'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="输入方式" width="180" align="center">
                   <template slot-scope="scope">
                    <el-tag type="success" size="mini" v-if="scope.row.inputtype==0">
                        手动输入    
                    </el-tag>
                    <el-tag type="danger" size="mini" v-else-if="scope.row.inputtype==1">
                        下拉列表选择
                    </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="可选值" width="200" align="center">

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
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                
              </el-table>
            </div>
            <div class="pagination-container">
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
            </div>
          </el-container>
        </div>
          <!-- 添加/编辑单位 -->
        <el-dialog :title="dialogTitle" width="35%"  @close="handleClose" class="demo-ruleForm" :visible.sync="dialogFormVisible">
            <el-form :model="nologyform" status-icon  label-position="right" label-width="100px" ref="nologyform">
                <el-form-item  label="名称：">
                    <el-input  v-model="nologyform.ggname" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="分类：">
                    <ul class="Annex" v-model="nologyform.cate_id">
                        <li v-for="(item, index) in nologyform.cate_id" v-bind:key='item.c_id'>
                            {{item.c_name}}; <span @click="removeTodo(index)" style="cursor: pointer;color:red;font-size: 20px;margin-left: 8px;">x</span>
                        </li>
                    </ul>
                    <el-button size="mini" @click="handletype()">添加分类</el-button>
                </el-form-item>
                <el-form-item  label="网址：">
                    <el-input  v-model="nologyform.url" placeholder="请输入昵称" clearable/>
                </el-form-item>
                <el-form-item label="排序：">
                    <el-slider v-model="nologyform.sort"></el-slider>
                </el-form-item>
                <el-form-item label="品牌标签：">
                    <el-checkbox-group v-model="nologyform.checkList">
                        <el-checkbox label="1">热门</el-checkbox>
                        <el-checkbox label="2">推荐</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="状态：">
                    <span style="margin-right: 5px;">NO</span>
                    <el-switch v-model="nologyform.playno"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="1"
                        inactive-value="0"></el-switch>
                    <span style="margin-left: 5px;">YES</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="quotaopen('nologyform')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加分类-->
        <el-dialog title="添加分类" width="25%"  class="demo-ruleForm" :visible.sync="dialogFormVisible1">
            <el-form :model="nologyform1" status-icon  label-position="right" label-width="100px" ref="nologyform1">
                <el-form-item label="一级分类">
                    <el-select
                        @change="selectclick1()"
                        size="small"
                        v-model="nologyform1.playtype2" clearable placeholder="">
                        <el-option
                        v-for="item in listdata1"
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
  //import {listByPage, getBilling, getCompanyList, getAllBill} from '@/api/billing'

  export default {
    name: 'specs',
    data() {
      return {
      
      list:[],
       //一级分类
        listdata1:[
          {
            label: "一级分类",
            value: 2
          }],
      typeData:[
        {
          label: "一级分类",
          value: 1
        }
      ],
      statusData:[{
          label: "全部",
          value: 0
        },{
          label: "显示",
          value: 1
        },{
          label: "不显示",
          value: 2
        }],
      searchForm: {
        specstype:'',
        specstatus:'',
        specsname:null,
        page: 1,
        limit: 20
      },
      pager:{
        page: 1,
        pageSize: 20,
        total: 0,
      },
       //添加/编辑单位
      nologyform:{
          id:null,
          checkList:[],
          sort:0,
          ggname:'',
          ggloc:'',
          playno:'1',
          name:'',
          phone:null,
          url:null,
          cate_id:[{c_id:'1|6|7',c_name:'移动广告媒体->娱乐类->抖音'},
              {c_id:'1|3|7',c_name:'移动广告媒体->娱乐类->抖音'}],
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
      labelPosition: 'left'
    }
  },
  created() {
    //初始化列表数据
    //this.getAllList()
  },
  mounted() {
    
  },
  filters: {
    
  },
  methods: {
    //添加规格弹窗
    handleAddClick() {
      this.dialogFormVisible = true;
      this.dialogTitle = "添加单位";
      this.nologyform.id = null;
      this.nologyform.quota = '';
    },
    
    /**
     * 搜索
     */
    getAllList() {
      
     // this.loading = true
      listByPage(this.searchForm).then((result) => {
        if(result.success){
          this.list = result.data.rows
          this.pager.total = result.data.count
        } else {
          this.$message.error(result.msg)
        }
      }).catch((err) => {
        if(err) this.$message.error(err)
      }).finally(() => {
        this.loading=false
      })

      
    },
    //账单详情
    
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
  .foot_col span{
    font-size: 13px;
    line-height: 31px;
  }
  .search-form {
    /* margin-bottom: -20px; */
  }
</style>

