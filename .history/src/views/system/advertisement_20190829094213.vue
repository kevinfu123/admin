<template> 
   <el-container>
    <el-main>
       <el-header style="height:auto; padding:0;">
          <el-form :inline="true" size="small" label-width="80px">
            <el-form-item label="播放周期">
              <div class="block">
                <el-date-picker
                  v-model="listQuery.Openingdate"
                  type="daterange"
                  start-placeholder="起始"
                  end-placeholder="结束"
                  value-format="yyyy-MM-dd HH:mm"
                  format="yyyy-MM-dd HH:mm">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="是否显示">
              <el-select
                size="small"
                v-model="listQuery.playstatus" clearable placeholder="">
                <el-option
                  v-for="item in listdata1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="广告来源">
              <el-select
                size="small"
                v-model="listQuery.Sources" clearable placeholder="">
                <el-option
                  v-for="item in listdata"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
                <el-input size="small" placeholder="单位名称" v-model="listQuery.unitname" clearable/>
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
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddClick()">添加</el-button>
            </el-form-item>
         </el-form>
       </el-header>
       <div class="table-container" style="margin-top:0;">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="adverNo"
                label="广告编号"
                width="80" align="center">
                </el-table-column>
                <el-table-column width="140" prop="unitname" label="广告名称" align="center" />
                <el-table-column label="广告缩略图" align="center">
                    <template slot-scope="scope">
                        <el-image
                        style="width: 100px; height: 50px"
                        :src="scope.row.url"
                        ></el-image>
                    </template> 
                </el-table-column>
                <el-table-column prop="position" label="广告位置" align="center" />
                <el-table-column width="100"  prop="startdate" label="开始日期" align="center" />
                <el-table-column width="100"   prop="enddate" label="结束日期" align="center" />
                <el-table-column prop="clicks" width="100" label="点击次数" align="center" />
                <el-table-column prop="sort" label="排序" width="60"  align="center" />
                <el-table-column label="是否显示" width="100"  align="center">
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.Hallstatus"
                        @change="handleStatusChange(scope.$index,scope.row)"
                        :active-value="1"
                        :inactive-value="0">
                        </el-switch>
                    </template>   
                </el-table-column>
                <el-table-column prop="Sources" width="120" label="广告来源" align="center" />
                <el-table-column prop="imgsrc" label="图片链接" align="center" />
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
                :current-page.sync="listQuery.pageNum"
                :page-size="listQuery.pageSize"
                :page-sizes="[10,30,50]"
                :total="total">
            </el-pagination>
        </div>
        <!-- 添加/编辑单位 -->
        <el-dialog :title="dialogTitle" width="35%"  @close="handleClose" class="demo-ruleForm" :visible.sync="dialogFormVisible">
            <el-form :model="nologyform" status-icon :rules="rules" label-position="right" label-width="130px" ref="nologyform">
                <el-form-item prop="quota" label="广告名称：">
                    <el-input  v-model="nologyform.ggname" placeholder="请输入广告名称" clearable/>
                </el-form-item>
                <el-form-item  label="广告位置：">
                    <el-input  v-model="nologyform.ggloc" placeholder="请输入广告名称" clearable/>
                </el-form-item>
                <el-form-item  label="开始日期：">
                    <el-date-picker
                        v-model="nologyform.startdate"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>   
                </el-form-item>
                <el-form-item  label="结束日期：">
                     <el-date-picker
                        v-model="nologyform.enddate"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker> 
                </el-form-item>
                <el-form-item  label="广告缩略图：">
                    <el-input  v-model="nologyform.quota" placeholder="" clearable/>
                </el-form-item>
                <el-form-item label="显示：">
                    <span style="margin-right: 5px;">NO</span>
                    <el-switch v-model="nologyform.playno"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="1"
                        inactive-value="0"></el-switch>
                    <span style="margin-left: 5px;">YES</span>
                </el-form-item>
                <el-form-item  label="广告联系人昵称：">
                    <el-input  v-model="nologyform.name" placeholder="请输入昵称" clearable/>
                </el-form-item>
                <el-form-item label="广告联系人电话：">
                    <el-input  v-model="nologyform.phone" placeholder="请输入电话" clearable/>
                </el-form-item>
                <el-form-item label="图片跳转链接：">
                    <el-input  v-model="nologyform.url" placeholder="" clearable/>
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
    import {deleteApply,nuitList,addunit} from '@/api/management';
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        unitname:null,
        Openingdate:null,
        Sources:null,
        playstatus:null,
    }; 
    export default {
      name:'managementlist',
      data() {
        return {
            listdata1:[
          {
            label: "显示",
            value: 1
          },
          {
            label: "不显示",
            value: 2
          }],
          listdata:[
          {
            label: "平台上传",
            value: 1
          },
          {
            label: "用户购买",
            value: 2
          }],
          
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
                ggname:'',
                ggloc:'',
                startdate:'',
                enddate:'',
                playno:'1',
                name:'',
                phone:null,
                url:null,
            },
            unitall:'',
        }
      },
      created(){
         this.getList();
      },
      methods:{
          getList() {
              this.tableData = [{
                adverNo:12,
                sort:1,
                startdate:'2019-07-01',
                enddate:'2019-12-30',
                position:'首页广告大bannen图',
                unitname: '王小虎',
                clicks:2000,
                Sources:'平台上传',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                imgsrc:'http://www.zhongmei66.com',
                Hallstatus:0,
                }, {
                adverNo:12,
                sort:1,
                startdate:'2019-07-01',
                enddate:'2019-12-30',
                position:'首页广告大bannen图',
                unitname: '王小虎',
                clicks:2000,
                Sources:'平台上传',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                imgsrc:'http://www.zhongmei66.com',
                Hallstatus:1,
                }, {
                adverNo:12,
                sort:1,
                startdate:'2019-07-01',
                enddate:'2019-12-30',
                position:'首页广告大bannen图',
                unitname: '王小虎',
                clicks:2000,
                Sources:'平台上传',
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                imgsrc:'http://www.zhongmei66.com',
                Hallstatus:1,
                }]
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
            this.listQuery.pageNum = val;
            this.getList();
          },
          handleSizeChange(val){
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
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
  .input-width {
    width: 150px;
  }
  .el-select {
    width: 120px;
  }
  
</style>