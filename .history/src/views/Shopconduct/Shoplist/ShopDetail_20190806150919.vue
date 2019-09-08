<template>
<div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="店铺资料" name="first">
            <el-main>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">用户基本信息</div>
                        <div class="t-content">
                            <el-col :span="8">
                                <div class="demo-type">
                                    <img :src="alljson.user.url"/>
                                </div>
                                <span class="phone">1888888888666</span>
                            </el-col>
                            <el-col :span="16" style="padding-bottom: 30px;padding-top: 10px;">
                                <div class="user">
                                    <ul>
                                        <li><span class="user_info">用户编号：</span><span class="user_item">t_9625_UGzjld</span></li>
                                        <li><span class="user_info">用户昵称：</span><span class="user_item">设计云</span></li>
                                        <li><span class="user_info">姓名：</span><span class="user_item">张美丽</span></li>
                                        <li><span class="user_info">账户余额：</span><span class="user_item">22222222</span></li>
                                        <li><span class="user_info">生日：</span><span class="user_item">1987-05-21</span></li>
                                        <li><span class="user_info">联系地址：</span><span class="user_item">广东省深圳市宝安区  </span></li>
                                        <li><span class="user_info">联系电话：</span><span class="user_item">1888888888666</span></li>
                                        <li><span class="user_info">QQ：</span><span class="user_item">58823433</span></li>
                                        <li><span class="user_info">注册时间：</span><span class="user_item">2019-07-01 12:34</span></li>
                                        <li><span class="user_info">微信：</span><span class="user_item">jane58823433</span></li>
                                        <li><span class="user_info">用户来源：</span><span class="user_item">PC端</span></li>
                                        <li><span class="user_info">email：</span><span class="user_item">575313@qq.com</span></li>
                                    </ul>
                                </div>
                            </el-col>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:30px;">
                    <el-col :span="24">
                    <template>
                        <div class="header">银行卡管理</div>
                        <div class="bankall">
                            <el-table
                                :data="alljson.tableData1"
                                border
                                style="width: 100%">
                                <el-table-column prop="bankname" label="一级分类名称"  align="center">
                                </el-table-column>
                                <el-table-column prop="BankAccount" label="二级分类名称" align="center">
                                </el-table-column>
                                <el-table-column prop="AccountName" label="三级分类名称"  align="center">
                                </el-table-column>
                                <el-table-column prop="branchBank" label="保证金" align="center">
                                </el-table-column>
                                <el-table-column label="保证金状态" width="180" align="center">
                                    <template slot-scope="scope">
                                        <el-tag
                                            :type="scope.row.renType === '1' ? 'danger' : 'success'"
                                            disable-transitions>{{scope.row.renType === '1' ? '未缴纳' : '已缴纳'}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-button v-if="scope.row.paymentCode==='1'" @click="handleViewDetail(scope.$index, scope.row)" type="text" size="mini">退回保证金</el-button>
                                        <el-button v-if="scope.row.paymentCode==='0'" @click="handleViewDetail(scope.$index, scope.row)" type="text" size="mini">确认缴纳</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </template>
                    </el-col>
                </el-row>
                <el-row style="margin-top:20px;">
                    <el-col :span="24">
                        <div class="grid-content">实名认证（个人）</div>
                        <div class="user-person">
                            <p><span>姓名：</span>陈先生</p>
                            <p><span>身份证号码：</span>500011111111111111111111111</p>
                            <p><span>手机号：</span>18888888888888</p>
                            <p><span>第三方验证状态：</span>已拥有</p>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-tab-pane>
        <el-tab-pane label="实名认证" name="second">
            <el-main>
                <el-row style="margin-top:20px;">
                        <el-col :span="24">
                            <div class="grid-content">实名认证（个人）</div>
                            <div class="user-person">
                                <p><span>姓名：</span>陈先生</p>
                                <p><span>身份证号码：</span>500011111111111111111111111</p>
                                <p><span>手机号：</span>18888888888888</p>
                                <p class="p_one">
                                    <span>身份证图片：</span>
                                    <ul>
                                        <li v-for="(item, i) in imagelist">
                                            <el-image :src="item">
                                                <div slot="placeholder" class="image-slot">
                                                    加载中<span class="dot">...</span>
                                                </div>
                                            </el-image>
                                        </li>
                                    </ul>
                                </p>
                                <p><span>第三方验证状态：</span>已通过</p>
                                <p><span>实名认证状态：</span>待审核</p>

                            </div>
                        </el-col>
                    </el-row>
            </el-main>
        </el-tab-pane>
        <el-tab-pane label="入驻技能" name="third">
            <template>
             <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column prop="Classi1" label="一级分类名称"  align="center">
                </el-table-column>
                <el-table-column prop="Classi2" label="二级分类名称" align="center">
                </el-table-column>
                <el-table-column prop="Classi3" label="三级分类名称"  align="center">
                </el-table-column>
                <el-table-column prop="Bond" label="保证金" align="center">
                </el-table-column>
                <el-table-column label="保证金状态" width="180" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.BondType === '1' ? 'danger' : 'success'"
                            disable-transitions>{{scope.row.BondType === '1' ? '未缴纳' : '已缴纳'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button  class="button_medium" size="medium" v-if="scope.row.paymentCode==='1'" @click="handleViewDetail(scope.$index, scope.row)">退回保证金</el-button>
                        <el-button  size="medium" v-if="scope.row.paymentCode==='0'" @click="handleViewDetail(scope.$index, scope.row)">确认缴纳</el-button>
                    </template>
                </el-table-column>
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
            activeName: 'first',
            list:[],
            imagelist:[
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            ],
            tableData:[
                {id:1,Classi1:"品牌平面设计/营销",Classi2:"创意设计，h5设计",Classi3:"logo设计，h5",Bond:1000,BondType:1,paymentCode:'0'},
                {id:2,Classi1:"影视/宣传片拍摄",Classi2:"创意设计，h5设计",Classi3:"logo设计，h5",Bond:2000,BondType:2,paymentCode:'0'},
                {id:3,Classi1:"影视/宣传片拍摄",Classi2:"创意设计，h5设计",Classi3:"logo设计，h5",Bond:3000,BondType:2,paymentCode:'1'},
                {id:4,Classi1:"影视/宣传片拍摄",Classi2:"创意设计，h5设计",Classi3:"logo设计，h5",Bond:4000,BondType:2,paymentCode:'1'},
                {id:5,Classi1:"影视/宣传片拍摄",Classi2:"创意设计，h5设计",Classi3:"logo设计，h5",Bond:5000,BondType:2,paymentCode:'1'}
            ],
            pager:{
                page: 1,
                pageSize: 20,
                total: 5,
            },
            alljson:{
                user:{
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                },
                tableData1:[
                   {addtime:"2018-09-15T04:24:27.000+0000",bankname:"中国民生银行",BankAccount:"622622******7758",AccountName:"张洁",
                   branchBank:"深圳民生银行前海湾支行",paymentCode:'0'},
                   {addtime:"2018-09-15T04:24:27.000+0000",bankname:"中国民生银行",BankAccount:"622622******7758",AccountName:"张洁",
                   branchBank:"深圳民生银行前海湾支行",paymentCode:'1',},
                   {addtime:"2018-09-15T04:24:27.000+0000",bankname:"中国民生银行",BankAccount:"622622******7758",AccountName:"张洁",
                   branchBank:"深圳民生银行前海湾支行",paymentCode:'1'}
                ]  
            }
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
    },
    computed: {
        
    },
    mounted() {
        this.$nextTick(() => {
            if(this.activeName =='first'){
                console.log(222222)
                this.edit(this.countid)
            }else if(this.activeName =='second'){
                console.log(33333)
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
        },
        
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    .el-main {
      padding: 0;
      .el-row{

        .grid-content {
            background: #cccccc;
            line-height: 40px;
            text-indent: 10px;
        }
        .t-content{
            background: #f2f2f2;
            overflow: auto;
            .demo-type {
                margin: auto;
                margin-top: 42px;
                text-align: center;
                width: 100px;
                height: 100px;
                background: #ffffff;
                img {
                    border-radius: 50%;
                    width: 99%;
                    height: 99%;
                    padding: 5px;
                    background: #ccc;
                }
            }
            .phone {
                text-align: center;
                display: inherit;
                margin-top: 20px;
                font-size: 14px;
            }
            .user {
                ul{
                    list-style: none;
                    li {
                        float: left;
                        width: 49%;
                        border-left:1px solid #797979;
                        border-top:1px solid #a1a1a1;  
                        span {
                            display: inline-block;
                        }
                        .user_info {
                            width: 33%;
                            border-right: 1px solid #a1a1a1;
                            text-align: center;
                            line-height: 32px;
                        }
                        .user_item {
                            width: 67%;
                            text-align: left;
                            text-indent: 10px;
                            line-height: 32px;
                        }
                    }
                    li:nth-child(even) {
                        border-right: 1px solid #797979;
                    }
                    li:nth-child(11) {
                        border-bottom: 1px solid #a1a1a1; 
                    }
                    li:last-child {
                        border-bottom: 1px solid #a1a1a1; 
                    }
                }
            }
        }
        //银行卡管理css
        .header {
            background: #cccccc;
            line-height: 40px;
            text-indent: 10px;
        }
        .bankall {
            padding-bottom: 30px;
            background: #f2f2f2;
            .el-table {
                background: #f2f2f2;
            }
        }
        //实名认证css
        .user-person {
            background: #f2f2f2;
            padding: 15px 0;
            p {
                margin: 0;
                font-size: 14px;
                line-height: 30px;
                span {
                    display: inline-block;
                    width: 130px;
                    text-align: right;
                }
            }
            .p_one {
                overflow: auto;
                span {
                    float: left;
                }
                ul {
                    list-style: none;
                    float: left;
                    width: 550px;
                    padding: 0;
                    margin-top: 0;
                    margin-bottom: 0;
                    li {
                        float: left;
                        width: 180px;
                        padding: 4px;
                    }
                }
            }
        }
    }
 }
 .button_medium {
    padding: 10px 13px;
 }
    
}

</style>