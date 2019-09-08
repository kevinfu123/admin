<template>
  <el-container>
    <el-main>
      <div style="margin-top: 50px">
        <el-form   label-width="120px" style="width: 100%" size="small">
           <el-form-item label="赠送积分：">
             <el-input v-model="toolform.tool_name"></el-input>
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

    }
  }
</script>

<style scoped>
  
</style>