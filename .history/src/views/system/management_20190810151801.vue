<template> 
   <el-container>
    <el-main>
       <el-header style="height:auto; padding:0;">
          <el-form :inline="true" size="small" label-width="80px">
            <el-form-item>
                <el-input placeholder="单位名称" v-model="unitname" clearable/>
            </el-form-item>
            <el-form-item>
                <el-button
                    style="float:right"
                    type="primary"
                    @click="handleSearchList()"
                    size="small">
                    搜索
                    </el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddClick()">添加</el-button>
            </el-form-item>
         </el-form>
       </el-header>
       

    </el-main>
   </el-container>
</template>
<script>
    export default {
      name:'Shoplist',
      data() {
        return {
            unitname:'',

        }
      },
      created(){
         this.getList();
      },
      methods:{

          getList() {

          },

          handleSearchList() {
            this.listQuery.pageNum = 1;
            this.getList();
          },
          handleAddClick() {

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