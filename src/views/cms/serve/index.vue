<template> 
   <el-container>
    <el-main>
       <el-header style="height:auto; padding:0;">
          <el-form :inline="true" size="small" label-width="45px">
            <el-form-item label="分类">
              <el-select
                @change="selectclick('type1')"
                size="small"
                v-model="listQuery.cate_id_1" clearable placeholder="">
                <el-option label="全部" value="" ></el-option>
                <el-option
                  v-for="item in listdata1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                size="small"
                v-model="listQuery.cate_id_2" clearable placeholder="">
                <el-option label="全部" value="" ></el-option>
                <el-option
                  v-for="item in listdata"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select
                size="small"
                v-model="listQuery.is_show" clearable placeholder="">
                <el-option
                  v-for="item in typedata2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
                <el-input size="small" placeholder="名称" v-model="listQuery.brand_name" clearable/>
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
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddClick()">添加服务品牌</el-button>
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
                label="ID"
                width="60" align="center">
                </el-table-column>
                <el-table-column width="140" prop="brand_name" label="名称" align="center" />
                <el-table-column label="logo" align="center">
                    <template slot-scope="scope">
                      <div v-if="scope.row.brand_logo!=''">
                        <el-image
                        style="width: 100px; height: 50px"
                        :src="imgurl+scope.row.brand_logo"
                        ></el-image>
                      </div>
                      <span v-else>未上传照片</span>
                    </template> 
                </el-table-column>
                <el-table-column label="所属分类" align="center">
                    <template slot-scope="scope">
                        <ul class="Annex">
                            <li v-for="(item, index) in scope.row.cate_id">
                                {{item.c_name}}<span>；</span>
                            </li>
                        </ul>
                    </template> 
                </el-table-column>
                <el-table-column prop="logo_link" label="品牌网址" align="center" />
                <el-table-column  label="热门" width="60"  align="center">
                    <template slot-scope="scope">
                        <el-tag
                          :type="scope.row.is_hot == 1 ? 'danger' : 'success'"
                          disable-transitions>{{scope.row.is_hot == 1 ? '是' : '否'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column width="60" label="推荐" align="center">
                   <template slot-scope="scope">
                        <el-tag
                          :type="scope.row.is_recommend == 1 ? 'danger' : 'success'"
                          disable-transitions>{{scope.row.is_recommend == 1 ? '是' : '否'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="排序" width="60"  align="center" />
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
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :current-page.sync="listQuery.page"
                :page-size="listQuery.per_page"
                :page-sizes="[10,30,50]"
                :total="total">
            </el-pagination>
        </div>
        <!-- 添加/编辑单位 -->
        <el-dialog :title="dialogTitle" width="35%"  @close="handleClose" class="demo-ruleForm" :visible.sync="dialogFormVisible">
            <el-form :model="nologyform" class="serveform" status-icon :rules="rules" label-position="right" label-width="110px" ref="nologyform">
                <el-form-item prop="brand_name" label="名称：">
                    <el-input size="mini" v-model="nologyform.brand_name" placeholder="" clearable/>
                </el-form-item>
                <el-form-item prop="first_letter" label="品牌首字母：">
                    <el-input size="mini" v-model="nologyform.first_letter" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="logo：">
                    <el-upload
                        :action="fileAction"
                        :headers="fileHeaders"
                        name="img"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-success="handleSuccess1"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList1"
                        class="upload-demo"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                
                <el-form-item  label="分类：">
                    <ul class="Annex" v-model="nologyform.form_id">
                        <li v-for="(item, index) in nologyform.form_id" v-bind:key='item.c_id'>
                            {{item.c_name}}; <span @click="removeTodo(index)" style="cursor: pointer;color:red;font-size: 20px;margin-left: 8px;">x</span>
                        </li>
                    </ul>
                    <el-button size="mini" @click="handletype()">添加分类</el-button>
                </el-form-item>
                <el-form-item  label="网址：">
                    <el-input size="mini" v-model="nologyform.logo_link" placeholder="请输入昵称" clearable/>
                </el-form-item>
                <el-form-item label="排序：">
                    <el-slider  v-model="nologyform.sort"></el-slider>
                </el-form-item>
                <el-form-item label="热门：">
                    <el-radio-group v-model="nologyform.is_hot">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="推荐：">
                    <el-radio-group v-model="nologyform.is_recommend">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="状态：">
                    <span style="margin-right: 5px;">NO</span>
                    <el-switch 
                        v-model="nologyform.is_show"
                        :active-value="1"
                        :inactive-value="0"></el-switch>
                    <span style="margin-left: 5px;">YES</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="serveopen('nologyform')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加分类-->
        <el-dialog title="添加分类" width="25%"  class="demo-ruleForm" :visible.sync="dialogFormVisible1">
            <el-form :model="nologyform1" status-icon :rules="rules" label-position="right" label-width="100px" ref="nologyform1">
                <el-form-item prop="playtype2" label="一级分类">
                    <el-select
                        @change="selectclick('type2')"
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
                <el-form-item prop="playtype3" label="二级分类">
                    <el-select
                        @change="selectclick('type3')"
                        size="small"
                        v-model="nologyform1.playtype3" clearable placeholder="">
                        <el-option
                        v-for="item in listdata2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value+','+item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="playtype4" label="三级分类">
                    <el-select
                        size="small"
                        v-model="nologyform1.playtype4" clearable placeholder="">
                        <el-option
                        v-for="item in listdata3"
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
    import { serveList, deleteserve, editserve, addserve, servetype, updateApplyStatus} from '@/api/cms/serve';
    import { getToken } from '@/utils/auth';
    import { Message } from 'element-ui'
    const defaultListQuery = {
        page: 1,
        pageSize:50,
        cate_id_1:null,
        cate_id_2:null,
        is_show:null,
        brand_name:null,
    }; 
    export default {
      name:'serve',
      data() {
        return {
          //页面检索二级分类
          listdata:[],
          //一级分类
          listdata1:[],
          //弹框二级分类
          listdata2:[],
          //三级分类
          listdata3:[],
          typedata2:[
          {
            label: "全部",
            value: ''
          },{
            label: "显示",
            value: 1
          },{
            label: "不显示",
            value: 0
          }],
            rules: {
                brand_name: [{ required: true, trigger: 'blur', message: '名称不能为空' }],
                first_letter: [{ required: true, trigger: 'blur', message: '首字母不能为空' }],
                playtype2: [{ required: true, trigger: 'blur', message: '分类不能为空' }],
                playtype3: [{ required: true, trigger: 'blur', message: '分类不能为空' }],
                playtype4: [{ required: true, trigger: 'blur', message: '分类不能为空' }],
            },
            fileHeaders: { 'Authorization':'Bearer '+getToken()},
            listQuery:Object.assign({},defaultListQuery),
            tableData: [],
            total:null,
            dialogTitle:"添加服务品牌",
            dialogFormVisible:false,
            dialogFormVisible1:false,
            //添加/编辑单位
            nologyform:{
                id:null,
                brand_name:'',
                first_letter:'',
                brand_logo:'',
                logo_link:'',
                sort:0,
                is_hot:0,
                is_recommend:0,
                is_show:0,
                form_id:[],
            },
            //添加分类
            nologyform1:{
                playtype2:'',
                playtype3:'',
                playtype4:'',
            },
            unitall:'',
            fileAction: 'http://47.106.240.143/api/admin/upimg',
            fileList1:[],
            imgurl:'http://ltzm1.oss-cn-shenzhen.aliyuncs.com/',
        }
      },
      created(){
         this.searchtype(0);
         this.getList();
      },
      methods:{
          //分类数据
          //初始化一级分类数据
          searchtype(pid) {
            servetype(pid).then(res => {
                this.listdata1 = res.data.map((item) => {
                  return { value:item.id, label:item.cate_name }
                })
                
            }).catch(e => {
              if (e) this.$message.error(e)
            })
          },
          servefun(pid,type) {
            servetype(pid).then(res => {
              if(type=='type1'){
                this.listdata = res.data.map((item) => {
                  return { value:item.id, label:item.cate_name }
                })
              }else if(type=='type2') {
                this.listdata2 = res.data.map((item) => {
                  return { value:item.id, label:item.cate_name }
                })
              }else{
                this.listdata3 = res.data.map((item) => {
                  return { value:item.id, label:item.cate_name }
                })

              }
            }).catch(e => {
              if (e) this.$message.error(e)
            })
          },
          //分类change事件
          selectclick(type) {
            if(type=='type1'){
              this.listdata = [];
              this.servefun(this.listQuery.cate_id_1,type);
            }else if(type=='type2'){
              this.listdata2 = [];
              let id = this.nologyform1.playtype2.split(',')[0];
              this.servefun(id,type);
            }else{
              this.listdata3 = [];
              let c_id = this.nologyform1.playtype3.split(',')[0];
              this.servefun(c_id,type);
            }
               
          },
          handletype() {
              this.dialogFormVisible1 = true;
          },
         //添加分类确认时间
          quotaopen1(formName){
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      console.log(this.nologyform1)
                      let c_id1 = this.nologyform1.playtype2.split(',');
                      let c_id2 = this.nologyform1.playtype3.split(',');
                      let c_id3 = this.nologyform1.playtype4.split(',');
                      let  c_id = c_id1[0] +'|'+ c_id2[0] +'|'+ c_id3[0] ;
                      let  c_name = c_id1[1] +'->'+c_id2[1] +'->'+ c_id3[1];
                      console.log(c_id,c_name)
                      let cate_json={
                          c_id:c_id,
                          c_name:c_name
                      }
                      this.nologyform.form_id.push(cate_json);
                      this.dialogFormVisible1 = false;
                  } else {
                      console.log('error submit!!');
                      return false;
                  }
              });
          },
          
          //删除分类某一行
          removeTodo: function (index) {
            this.nologyform.form_id.splice(index, 1);
          },
          handleSuccess1(response, file, fileList) {
            this.nologyform.brand_logo = response.data
            console.log(this.nologyform.brand_logo)
          },
          handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
          },
          handleRemove(file, fileList) {

          },
          handlePreview(file) {
            console.log(file)
            },
          beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`)
          },
          
          getList() {
              serveList(this.listQuery).then(response => {
                this.tableData = response.data
                this.total = response.meta.pagination.total;

              }).catch(err => {
                console.log(err) // 这里catch到错误timeout
              })
          },
          //修改展示状态
          handleStatusChange(index,row){
            let param = {
                id:row.id,
                show:row.is_show
            };
            updateApplyStatus(param).then(response=>{
              this.$message({
                message: '状态修改成功',
                type: 'success'
              });
            });
          },
          handleSearchList() {
            this.getList();
          },
          handleAddClick() {
              this.dialogFormVisible = true;
              this.dialogTitle = "添加服务品牌";
              this.nologyform.id = null;
              this.nologyform.brand_name = '';
              this.nologyform.first_letter = '';
              this.nologyform.form_id = [];
              this.nologyform.brand_logo = '';
              this.nologyform.logo_link= '';
              this.nologyform.sort = null;
              this.nologyform.is_hot = null;
              this.nologyform.is_recommend = null;
              this.nologyform.is_show = null;
              this.fileList1 = [];
          },
          handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.dialogTitle = "编辑服务品牌";
            this.nologyform.id = row.id;
            this.nologyform.brand_name = row.brand_name;
            this.nologyform.first_letter = row.first_letter;
            this.nologyform.form_id = row.cate_id;
            this.nologyform.brand_logo = row.brand_logo;
            this.nologyform.logo_link= row.logo_link;
            this.nologyform.sort = row.sort;
            this.nologyform.is_hot = row.is_hot;
            this.nologyform.is_recommend = row.is_recommend;
            this.nologyform.is_show = row.is_show;
            //显示图片 	
            let imgurl1 = this.imgurl+row.brand_logo;
            this.fileList1.push({url:imgurl1});
          },
          //添加、编辑服务品牌
          serveopen(formName) {
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      //拆分id
                      var ids = [];
                      console.log(this.nologyform.cate_id);
                      if(this.nologyform.form_id.length >1){
                        this.nologyform.form_id.map((item) => {
                          ids.push(item.c_id);
                        }); 
                        this.nologyform.cate_id = ids.join(',');
                      }else{
                        this.nologyform.cate_id = this.nologyform.form_id[0].c_id;
                      }
                      if(this.nologyform.id){//编辑
                         let servejson = {
                            cate_id:this.nologyform.cate_id,
                            brand_name:this.nologyform.brand_name,
                            first_letter:this.nologyform.first_letter,
                            brand_logo:this.nologyform.brand_logo,
                            logo_link:this.nologyform.logo_link,
                            sort:this.nologyform.sort,
                            is_hot:this.nologyform.is_hot,
                            is_recommend:this.nologyform.is_recommend,
                            is_show:this.nologyform.is_show,
                         }
                         editserve(this.nologyform.id,servejson).then((result) => {
                            this.$message({
                                type: 'success',
                                message: '编辑成功!'
                            });
                            this.getList();//删除更新页面
                         }).catch((err) => {
                            if(err) this.$message.error(err)
                         })
                          
                      }else{//新增
                         addserve(this.nologyform).then(response => {
                            this.$message({
                              message: '品牌新增成功',
                              type: 'success'
                            });
                            this.getList();//更新页面
                         })
                      }
                      this.dialogFormVisible = false;
                  } else {
                      console.log('error submit!!');
                      return false;
                  }
              });
          },
          
          handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteserve(row.id).then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList();//删除更新页面
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
          handleCurrentChange(val){
            this.listQuery.page = val;
            this.getList();
          },
          handleSizeChange(val){
            this.listQuery.page = 1;
            this.listQuery.pageSize = val;
            this.getList();
          },
          /**
           * 表单关闭时事件
          */
          handleClose() {
            this.$refs.nologyform.resetFields();
            this.fileList1 = [];
          },
      }
    }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
  .input-width {
    width: 150px;
  }
  .el-select {
    width: 150px;
  }
  .serveform {
    .el-form-item {
      margin-bottom: 10px;

      .el-input {
        width: 300px;
      }
    }
  }
</style>