<template>
  <el-container>
    <el-main>
      <div style="margin-top: 50px">
        <el-form   label-width="120px" style="width: 100%" size="small">
           <el-form-item label="工具名称：">
             <el-input class="tool_name" v-model="toolform.tool_name"></el-input>
           </el-form-item>
           <el-form-item label="价格配置：">
              <el-table :data="value.member_upgrade"
                  style="width: 80%" border>
                <el-table-column
                  label="会员等级"
                  align="center"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.fullPrice"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="会员有效期"
                  align="center"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.reducePrice"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="现价"
                  align="center"
                  width="120">
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
        </el-form>
      </div>
    </el-main>
   </el-container>
</template>

<script>
  import {deletetool, tool, edittool} from '@/api/tool/market';
  export default {
    name: 'Market',
    data() {
      return {
        toolform:{
          id:null,
          tool_name:'',
          tool_img:'',
          support_platform:[],
          conf_id:[{
            id:,
          },{
            id:
          },{

          }]
        },
        imgurl:'http://ltzm1.oss-cn-shenzhen.aliyuncs.com/',
        fileAction: 'http://47.106.240.143/api/admin/upimg',
        fileList1:[],
      }
    },
    created(){
      this.getList();
    },
    methods:{
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