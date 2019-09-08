<template> 
   <el-container>
    <el-main>
       <el-header style="height:auto; padding:0;">
          <el-form :inline="true" size="small" label-width="45px">
            <el-form-item label="分类">
              <el-select
                @change="selectclick()"
                size="small"
                v-model="listQuery.cate_id_1" clearable placeholder="">
                <el-option label="全部" value="0" ></el-option>
                <el-option
                  v-for="item in listdata1"
                  :key="item.id"
                  :label="item.cate_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                size="small"
                v-model="listQuery.cate_id_2" clearable placeholder="">
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
                  v-for="item in listdata2"
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
            <el-form :model="nologyform" status-icon :rules="rules" label-position="right" label-width="100px" ref="nologyform">
                <el-form-item  label="名称：">
                    <el-input  v-model="nologyform.ggname" placeholder="" clearable/>
                </el-form-item>
                <el-form-item  label="logo：">
                    <el-upload
                        :action="fileAction"
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
            <el-form :model="nologyform1" status-icon :rules="rules" label-position="right" label-width="100px" ref="nologyform1">
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
                <el-form-item label="二级分类">
                    <el-select
                        @change="selectclick1()"
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
                <el-form-item label="三级分类">
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
    import { serveList, deleteserve, editserve, addserve, servetype} from '@/api/cms/serve';
    // import { getToken } from '@/utils/auth';
    import { Message } from 'element-ui'
    const defaultListQuery = {
        page: 1,
        per_page:50,
        cate_id_1:null,
        cate_id_2:null,
        is_show:null,
        brand_name:null,
    }; 
    export default {
      name:'serve',
      data() {
        return {
        listdata:[
          {
            label: "全部",
            value: 1
          },
          {
            label: "二级分类",
            value: 2
          }],
            //一级分类
        listdata1:[],
          //二级分类
          listdata2:[
          {
            label: "全部",
            value: 1
          },
          {
            label: "二级分类",
            value: 2
          }],
          //三级分类
          listdata3:[
          {
            label: "全部",
            value: 1
          },
          {
            label: "二级分类",
            value: 2
          }],
          listdata2:[
          {
            label: "全部",
            value: null
          },{
            label: "显示",
            value: 1
          },{
            label: "不显示",
            value: 0
          }],
            rules: {
                quota: [{ required: true, trigger: 'blur', message: '单位不能为空' }],
            },
            listQuery:Object.assign({},defaultListQuery),
            tableData: [],
            total:null,
            dialogTitle:"添加单位",
            dialogFormVisible:false,
            dialogFormVisible1:false,
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
            //添加分类
            nologyform1:{
                playtype2:'',
                playtype3:'',
                playtype4:'',
            },
            unitall:'',
            fileAction: 'http://172.22.17.248:9990/newsys/file',
            fileList1:[],
            imgurl:'http://ltzm1.oss-cn-shenzhen.aliyuncs.com/',
        }
      },
      created(){
         this.searchtype(0)
         this.getList();
      },
      methods:{
          //分类数据
          searchtype(pid) {
            servetype(pid).then(res => {
              if (res.success) {
                this.listdata1 = res.data
              } else {
                this.$message.error(res.msg)
              }
            }).catch(e => {
              if (e) this.$message.error(e)
            })
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
                      this.nologyform.cate_id.push(cate_json);
                      this.dialogFormVisible1 = false;
                  } else {
                      console.log('error submit!!');
                      return false;
                  }
              });
          },
          selectclick1() {

          },
          //删除分类某一行
           removeTodo: function (index) {
              this.nologyform.cate_id.splice(index, 1);
              console.log(this.nologyform.cate_id);
           },
          handleSuccess1(response, file, fileList) {
            this.detailForm.smallImageUrl = response.data.url
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
          selectclick() {
               console.log(this.listQuery.playtype1);
               this.listdata = [];
               this.listdata = [{
                    label: "全部",
                    value: 1
                },
                {
                    label: "三级分类",
                    value: 2
                }];
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
          handleCurrentChange(val){
            this.listQuery.page = val;
            this.getList();
          },
          handleSizeChange(val){
            this.listQuery.page = 1;
            this.listQuery.per_page = val;
            this.getList();
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
    width: 120px;
  }
  
</style>