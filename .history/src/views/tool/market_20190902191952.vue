<template>
  <el-container>
    <el-main>
      <div style="">
        <el-form :model="toolform"  label-width="120px" style="width: 100%" size="small">
           <el-form-item label="工具名称：">
             <el-input class="tool_name" v-model="toolform.tool_name"></el-input>
           </el-form-item>
           <el-form-item label="价格配置：">
              <el-table :data="toolform.member_upgrade"
                  style="width: 80%" border>
                <el-table-column
                  label="会员等级"
                  align="center"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.fullPrice"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="会员有效期"
                  align="center"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.validity_limit"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="现价"
                  align="center"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.price"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="handleRemoveFullReduction(scope.$index, scope.row)">删除</el-button>
                    <el-button type="text" @click="handleAddFullReduction(scope.$index, scope.row)">添加</el-button>
                  </template>
                </el-table-column>
              </el-table>
           </el-form-item>
           <el-form-item style="width:95%;" label="等级背景图：" prop="icon">
                <el-upload
                  :action="fileAction"
                  name="img"
                  :headers="fileHeaders"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-success="handleSuccess1"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList1"
                  class="upload-demo"
                  list-type="picture">
                  <el-button size="small" type="primary">上传文件</el-button>
              </el-upload>
          </el-form-item>
          <el-form-item  label="支持平台：">
              <template>
                <el-checkbox-group 
                  v-model="toolform.support_platform"
                  :min="1"
                  :max="2">
                  <el-checkbox label="1">PC</el-checkbox>
                  <el-checkbox label="2">手机</el-checkbox>
                </el-checkbox-group>
              </template>
          </el-form-item>
          <el-form-item  label="详情介绍：">
              <Tinymce ref="editor" :height="350" style="width:80%;" v-model="toolform.description" />
          </el-form-item>
          <el-form-item  label="是否显示：">
              <template>
                <el-radio v-model="toolform.is_show" label="1">显示</el-radio>
                <el-radio v-model="toolform.is_show" label="0">不显示</el-radio>
              </template>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
   </el-container>
</template>

<script>
  import Tinymce from '@/components/Tinymce';
  import {deletetool, tool, edittool} from '@/api/tool/market';
  import { getToken } from '@/utils/auth';
  export default {
    name: 'Market',
    components: { Tinymce },
    data() {
      return {
        toolform:{
          id:null,
          tool_name:'',
          tool_img:'',
          support_platform:[],
          member_upgrade:[],
          is_show:null,
        },
        fileHeaders: { 'Authorization':'Bearer '+getToken()},
        imgurl:'http://ltzm1.oss-cn-shenzhen.aliyuncs.com/',
        fileAction: 'http://47.106.240.143/api/admin/upimg',
        fileList1:[],
      }
    },
    created(){
      this.getList();
    },
    methods:{
      //上传照片事件
      handlePreview(file) {
        console.log(file)
      },
      handleRemove(file, fileList) {

      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleSuccess1(response, file, fileList) {
          this.toolform.tool_img = response.data
          console.log(this.toolform.tool_img);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      getList() {

        tool().then((result) => {
            //this.tableData = result.data 
            
        }).catch((err) => {
          if(err) this.$message.error(err)
        })
      },

      handleRemoveFullReduction(index, row) {
        let fullReductionList = this.value.productFullReductionList;
        if (fullReductionList.length === 1) {
          fullReductionList.pop();
          fullReductionList.push({
            fullPrice: 0,
            reducePrice: 0
          });
        } else {
          fullReductionList.splice(index, 1);
        }
      },
      handleAddFullReduction(index, row) {
        let fullReductionList = this.value.productFullReductionList;
        if (fullReductionList.length < 3) {
          fullReductionList.push({
            fullPrice: 0,
            reducePrice: 0
          });
        } else {
          this.$message({
            message: '最多只能添加三条',
            type: 'warning'
          });
        }
      },
    }
  }
</script>

<style scoped>
  .tool_name {
    width: 300px;
  }
</style>