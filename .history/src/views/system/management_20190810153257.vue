<template> 
   <el-container>
    <el-main>
       <el-header style="height:auto; padding:0;">
          <el-form :inline="true" size="small" label-width="80px">
            <el-form-item>
                <el-input placeholder="单位名称" v-model="listQuery.unitname" clearable/>
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
       <div class="table-container">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="180" align="center">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180" align="center">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
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
    </el-main>
   </el-container>
</template>
<script>
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        unitname:null,
    };
    export default {
      name:'Shoplist',
      data() {
        return {
            listQuery:Object.assign({},defaultListQuery),
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }],
            total:null,
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
          handleEdit(index, row) {
            console.log(index, row);
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