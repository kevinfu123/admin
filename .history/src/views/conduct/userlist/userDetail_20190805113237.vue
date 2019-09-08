<template>
<div class="app-container">
    <!-- <ul >
        <li v-for="(item,index) in navList" :class="{active:!(index-menuIndex)}" @click="menuShow(index)">
            <a href="#">{{item}}</a>
        </li>
    </ul>
    <div v-show="menuIndex == 0">内容一 </div>
    <div v-show="menuIndex == 1">内容二 </div> -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户基本信息" name="first">
            <el-main>
                <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
                </el-row>
            </el-main>
            
        </el-tab-pane>
        <el-tab-pane label="账户资金明细" name="second">
            <template>
             <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column label="操作时间" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.operationdate | formatTime}}</template>
                </el-table-column>
                <el-table-column prop="OrderNo" label="订单编号" width="180" align="center">
                </el-table-column>
                <el-table-column label="交易项目" align="center">
                    <template slot-scope="scope">
                        {{scope.row.Transaction | statusFilter}}
                    </template>
                </el-table-column>
                <el-table-column label="交易类型" width="180" align="center">
                    <template slot-scope="scope">
                        {{scope.row.Transactiontype | statusFilter1}}
                    </template>
                </el-table-column>
                <el-table-column prop="Tmoney" label="交易金额" align="center">
                </el-table-column>
                <el-table-column prop="balanceAmount" label="账户余额" width="180" align="center">
                </el-table-column>
                <el-table-column prop="tsm" label="交易说明" align="center"></el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination
                  :current-page="pager.page"
                  background
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="pager.pageSize"
                  :total="pager.total"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handlePageChange"/>
            </div>
           </template>
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import {formatDate} from '@/utils/date';
import {zijinList,allApply} from '@/api/conduct/conduct';
export default {
    name:'userDetail',
    data() {
        return {
            // menuIndex:0,
            // navList:['用户基本信息','账户资金明细'],
            activeName: 'first',
            list:[],
            tableData:[
                {operationdate:"2018-09-15T04:24:27.000+0000",Tmoney:400,OrderNo:1111111,Transaction:1,Transactiontype:1,balanceAmount:9527,
                tsm:"任务托管赏金"},
                {operationdate:"2018-09-15T04:24:27.000+0000",Tmoney:400,OrderNo:1111111,Transaction:2,Transactiontype:2,balanceAmount:9527,
                tsm:"任务托管赏金"},
                {operationdate:"2018-09-15T04:24:27.000+0000",Tmoney:400,OrderNo:1111111,Transaction:3,Transactiontype:3,balanceAmount:9527,
                tsm:"任务托管赏金"},
                {operationdate:"2018-09-15T04:24:27.000+0000",Tmoney:400,OrderNo:1111111,Transaction:4,Transactiontype:4,balanceAmount:9527,
                tsm:"任务托管赏金"},
                {operationdate:"2018-09-15T04:24:27.000+0000",Tmoney:400,OrderNo:1111111,Transaction:5,Transactiontype:5,balanceAmount:9527,
                tsm:"任务托管赏金"}
            ],
            pager:{
                page: 1,
                pageSize: 20,
                total: 5,
            },
        };
    },
    created() {
        //获取传递过来的id
        this.countid = this.$route.query["id"];    
        this.activeName = this.$route.query["type"]; 
        console.log(this.activeName);  
    },
    filters:{
      formatTime(time) {
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      statusFilter(status) {
        const statuses = {
            '1': '任务标题',
            '2': '服务标题',
            '3': '增资服务名称',
            '4': '工具市场工具名称',
            '5': '提现到银行卡',
            '6': '充值',
            '7': '线索名称',
            '8': '任务标题退款'
        }
        return statuses[status]
      },
      statusFilter1(status) {
        const statu = {
            '1': '购买服务',
            '2': '购买增值服务',
            '3': '托管赏金',
            '4': '充值',
            '5': '提现',
            '6': '订单退款',
            '7': '购买工具服务',
            '8': '购买线索',
            '9': '购买上刊画面',
            '10': '购买案例',
            '11': '购买传记',
            '12': '收入结算'
        }
        return statu[status]
      }
    },
    computed: {
        
    },
    mounted() {
        this.$nextTick(() => {
            if(this.activeName =='first'){
                console.log(222222)
                this.edit(this.countid)
            }else{
                console.log(33333)
                this.edit(this.countid)
            }
            
        })
    },
    methods:{
        //初始化接口
        edit(id){
            console.log(id);
        },
        handleClick(tab, event) {
            if(this.activeName=='first'){

            }else{

            }
        },
        // menuShow (index) {
        //     this.menuIndex = index
        //     console.log(this.menuIndex)
        // }
        //表格列表接口数据
        getAllList(){

        },


        /**
         * 分页器：页大小变更
         */
        handleSizeChange(val) {
            this.pager.pageSize = val
            //this.getAllList()
        },
        /**
         * 分页器：页码变更
         */
        handlePageChange(val) {
            this.pager.page = val
            //this.searchForm.page = val
            //this.getAllList()
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    // ul li {
    //     margin-left: 2px;
    //     list-style:none;
    //     display:inline-block;
    //     height:30px;
    //     line-height:30px;
    //     width:120px;
    //     text-align:center;
    //     background: #d7d7d7;
    // }
    // li.active {
    //     background: #AEAEAE;
    // }
    
}

</style>