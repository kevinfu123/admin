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
                  align="center">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.sml_id" filterable placeholder="请选择">
                      <el-option
                        v-for="item in level_datalist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="会员有效期"
                  align="center">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.validity_limit" filterable placeholder="请选择">
                      <el-option
                        v-for="item in valid_data"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="现价"
                  align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.price"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="handleRemoveFull(scope.$index, scope.row)">删除</el-button>
                    <el-button type="text" @click="handleAddFull(scope.$index, scope.row)">添加</el-button>
                  </template>
                </el-table-column>
              </el-table>
           </el-form-item>
           <el-form-item style="width:80%;" label="工具主图：" prop="icon">
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
                <el-radio v-model="toolform.is_show"  :label="1">显示</el-radio>
                <el-radio v-model="toolform.is_show"  :label="0">不显示</el-radio>
              </template>
          </el-form-item>
          <el-form-item>
              <el-button class="btn" size="medium" type="primary" @click="handleClick()">保存</el-button>
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
        level_datalist:[],
        valid_data:[],
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
        this.fileList1 = [];
        tool().then((result) => {
            this.toolform = Object.assign({},result.main_data);
            this.toolform.support_platform =this.toolform.support_platform.split(',');
            if(this.toolform.tool_img){
              let tool_img = this.imgurl + this.toolform.tool_img;
              this.fileList1.push({url:tool_img})
            }
            //下拉列表数据
            this.level_datalist = result.level_data.map((item)=>{
               return { value:item.id, label:item.ml_name}
               //item.ml_name.replace(/会员/ig, "")
            })
            let valid_data1 = result.valid_data
            for(var key in valid_data1){ 
              this.valid_data.push({value:Number(key),label:valid_data1[key]});
            }
            console.log(this.valid_data);
        }).catch((err) => {
          if(err) this.$message.error(err)
        })
      },

      handleRemoveFull(index, row) {
        let member_upgrade = this.toolform.member_upgrade;
        if (member_upgrade.length === 1) {
          member_upgrade.pop();
          member_upgrade.push({
            sml_id: 0,
            validity_limit: 0,
            price:0
          });
        } else {
          if(row.sml_id!=0){
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  
                  deletetool(row.id).then(response => {
                      this.$message({
                          type: 'success',
                          message: '删除成功!'
                      });
                  }).catch((e) => {
                      if(err) this.$message.error(err)
                  })
                  member_upgrade.splice(index, 1);
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  });          
              });
          }else{
            member_upgrade.splice(index, 1);
          }
          
        }
      },
      handleAddFull(index, row) {
        let member_upgrade = this.toolform.member_upgrade;
        if (member_upgrade.length < 10) {
          member_upgrade.push({
            sml_id: 0,
            validity_limit: 0,
            price:0
          });
        } else {
          this.$message({
            message: '最多只能添加十条',
            type: 'warning'
          });
        }
      },
      handleClick() {
        let support_platform1 = this.toolform.support_platform.join(',');
        let tooljson = {
          tool_name:this.toolform.tool_name,
          tool_img:this.toolform.tool_img,
          support_platform:support_platform1,
          description:this.toolform.description,
          is_show:this.toolform.is_show,
          member_upgrade:this.toolform.member_upgrade,
        }
        edittool(this.toolform.id,tooljson).then(response => {
            this.$message({
                type: 'success',
                message: '修改成功!'
            });
            this.getList();//刷新页面
        }).catch((e) => {
            if(err) this.$message.error(err)
        })
      },
    }
  }
</script>

<style scoped>
  .tool_name {
    width: 300px;
  }
  .btn {
    width: 150px;
  }
</style>