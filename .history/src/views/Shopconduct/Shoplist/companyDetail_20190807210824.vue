<template>
<div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="店铺资料" name="first">
            <el-main>
                <!-- 店铺基本信息 -->
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">店铺基本信息</div>
                        <div class="shop-content">
                            <el-form ref="form" :model="sizeForm" label-width="130px" size="mini">
                                <el-form-item label="店铺类型：">
                                    <span>企业</span>
                                </el-form-item>
                                <el-form-item label="店铺名称：">
                                    <span>深圳鼎盛广告传媒</span>
                                </el-form-item>
                                <el-form-item label="企业类型：">
                                    <span>外资</span>
                                </el-form-item>
                                <el-form-item label="公司规模：">
                                    <span>50-100人</span>
                                </el-form-item>
                                <el-form-item label="公司所在地：">
                                    <span>广东省深圳市宝安区 </span>
                                </el-form-item>
                                <el-form-item label="常用联系人姓名：">
                                    <span>马云</span>
                                </el-form-item>
                                <el-form-item label="常用联系电话：">
                                    <span>1111111111</span>
                                </el-form-item>
                                <el-form-item label="常用电子邮箱：">
                                    <span>test@t.com</span>
                                </el-form-item>
                                <el-form-item label="关于我们：">
                                    <span>收到福克斯的交话费</span>
                                </el-form-item>
                                <div class="div_bottom">
                                    <el-button size="medium" type="primary" @click="open2">店铺审核通过</el-button>
                                    <el-button size="medium" @click="open5('店铺')" type="primary" style="margin-left:25px;">店铺审核不通过</el-button>
                                </div>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top:20px;">
                    <el-col :span="24">
                    <template>
                        <div class="header">媒介资质</div>
                        <div class="mediumall">
                            <div class="mediumall_child" v-for="(item, i) in mediulist" >
                                <el-form label-width="130px" size="mini">
                                    <el-form-item label="媒介资质类型：">
                                        <span>{{item.mediutype}}</span>
                                    </el-form-item>
                                    <el-form-item label="代理时间：">
                                        <span>{{item.time}}</span>
                                    </el-form-item>
                                    <el-form-item label="资质图片：">
                                        <ul>
                                            <li v-for="(itemlist, index) in item.imagelist">
                                                <el-image :src="itemlist">
                                                    <div slot="placeholder" class="image-slot">
                                                        加载中<span class="dot">...</span>
                                                    </div>
                                                </el-image>
                                            </li>
                                        </ul>
                                    </el-form-item>
                                    <el-form-item label="审核状态：">
                                        <span>{{item.Auditstatus}}</span>
                                    </el-form-item>
                                    <el-form-item label="审核时间：">
                                        <span>{{item.Audittime}}</span>
                                    </el-form-item>
                                    <el-form-item label="未通过原因：" v-if="item.Nreason!== ''">
                                        <span>{{item.Nreason}}</span>
                                    </el-form-item>
                                    <div class="div_bottom" v-if="item.Nreason== ''">
                                        <el-button size="medium" type="primary" @click="open2">审核通过</el-button>
                                        <el-button size="medium" @click="open5('店铺')" type="primary" style="margin-left:25px;">审核不通过</el-button>
                                    </div>
                                </el-form>
                            </div>
                        </div>
                    </template>
                    </el-col>
                </el-row>
                <!-- 自传资质 -->
                <el-row style="margin-top:10px;">
                    <el-col :span="24">
                        <div class="grid-content">自传资质</div>
                        <div class="jop-content">
                           <div class="jop_child" v-for="(item, i) in joblist">
                                <el-form label-width="100px" size="mini">
                                    <el-form-item label="资质名称：">
                                        <span>{{item.name}}</span>
                                    </el-form-item>
                                    <el-form-item label="获得时间：">
                                        <span>{{item.time}}</span>
                                    </el-form-item>
                                    <el-form-item label="资质图片：">
                                        <el-image :src="item.url">
                                            <div slot="placeholder" class="image-slot">
                                                加载中<span class="dot">...</span>
                                            </div>
                                        </el-image>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-tab-pane>
        <el-tab-pane label="实名认证" name="second">
            <el-main>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">实名认证</div>
                        <div class="user-person">
                            <div class="user-main">
                                <div class="user-title">企业信息</div>
                                <p><span>公企业称：</span>陈先生</p>
                                <p><span>统一信任代码：</span>500011111111111111111111111</p>
                                <p><span>企业法人：</span>18888888888888</p>
                                <p class="p_one">
                                    <span>三证合一附件：</span>
                                    <el-image :src="companyinfo.url">
                                        <div slot="placeholder" class="image-slot">
                                            加载中<span class="dot">...</span>
                                        </div>
                                    </el-image>
                                </p>
                                <p><span>第三方验证状态：</span>已通过</p>
                                <p><span>平台审核状态：</span>待审核</p>
                                <p style="margin-top:20px;margin-left: 80px;padding-bottom: 10px;">
                                    <el-button type="primary" @click="open2">审核通过</el-button>
                                    <el-button @click="open5('实名')" type="primary" style="margin-left:25px;">审核不通过</el-button>
                                </p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!-- 媒体资质 -->
                <el-row>
                    <el-col :span="24">
                        <div class="user-person">
                            <div class="user-main">
                                <div class="user-title">企业法人信息</div>
                                <p><span>手机号：</span>{{legalForm.phoneNo}}</p>
                                <p><span>姓名：</span>{{legalForm.name}}</p>
                                <p><span>身份证号码：</span>{{legalForm.IdcardNo}}</p>
                                <p class="p_two">
                                    <span>身份证附件：</span>
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
                                <p><span>第三方验证状态：</span>{{legalForm.Certificates}}</p>
                                
                                <p><span>平台审核状态：</span>{{legalForm.Auditstatus}}</p>
                                <p style="margin-top:20px;margin-left: 80px;padding-bottom: 10px;">
                                    <el-button type="primary" @click="open2">审核通过</el-button>
                                    <el-button @click="open5('媒体')" type="primary" style="margin-left:25px;">审核不通过</el-button>
                                </p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!-- 企业对公账户信息 -->
                <el-row>
                    <el-col>
                        <div class="account-main">
                            <div class="account-title">企业对公账户信息</div>
                            <el-form :model="accountform" label-width="140px" size="mini">
                                <el-form-item label="对公账户名：">
                                    <span>{{accountform.accountname}}</span>
                                </el-form-item>
                                <el-form-item label="对公账户卡号：">
                                    <span>{{accountform.accountNo}}</span>
                                </el-form-item>
                                <el-form-item label="开户行名称：">
                                    <span>{{accountform.Naturename}}</span>
                                </el-form-item>
                                <el-form-item label="开户支行全称：">
                                    <span>{{accountform.allname}}</span>
                                </el-form-item>
                                <el-form-item label="开户行所在地：">
                                    <span>{{accountform.location}}</span>
                                </el-form-item>
                                <el-form-item label="第三方验证状态：">
                                    <span>{{accountform.Certificates}}</span>
                                </el-form-item>
                                <el-form-item label="对公打款验证状态：">
                                    <span>{{accountform.moneytype}}</span>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
                <!-- 实名认证状态 -->
                <el-row>
                    <el-col>
                        <div class="realname-main">
                            <div class="real-title">企业对公账户信息</div>
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
                        <el-button  class="button_medium" size="medium" v-if="scope.row.paymentCode==='1'" @click="handleViewDetail1(scope.$index, scope.row)">退回保证金</el-button>
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
    <!-- 审核弹窗 -->
    <el-dialog :title="dialogTitle" width="500px" @close="handleClose" class="demo-ruleForm" :visible.sync="dialogFormVisible">
        <el-form :model="form" status-icon :rules="rules" label-position="right" label-width="120px" ref="ValidateForm">
            <el-form-item prop="reason" label="不通过原因：">
                <el-input :rows="3" type="textarea" v-model="form.reason" placeholder="请输入原因"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="open1()">审核不通过</el-button>
        </div>
    </el-dialog>
    <!-- 确认缴纳弹窗 -->
    <el-dialog title="确认缴纳" width="500px" @close="handleClose1" class="demo-ruleForm" :visible.sync="dialogFormVisible1">
        <el-form :model="formdata" status-icon :rules="rules" label-position="right" label-width="120px" ref="ValidateForm1">
            <el-form-item prop="time" label="到账时间：">
                <el-date-picker
                v-model="formdata.time"
                type="datetime"
                placeholder="选择到账时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="receivables" label="收款凭证：">
                <el-input  v-model="formdata.receivables"></el-input>
            </el-form-item>
            <el-form-item prop="account" label="到账金额：">
                <el-input  v-model="formdata.account"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="open3()">确定</el-button>
        </div>
    </el-dialog>
    <!-- 退回保证金弹窗 -->
    <el-dialog title="退回保证金" width="500px" @close="handleClose2" class="demo-ruleForm" :visible.sync="dialogFormVisible2">
        <div style="margin-left:30px;">退回手续费说明：退回手续费费率为1%</div>
        <el-form :model="formdata1" status-icon :rules="rules" label-position="right" label-width="120px" ref="ValidateForm2">
            <el-form-item label="可退还金额：">
                <span style="font-weight:bold;">{{Refundable}}</span>
            </el-form-item>
            <el-form-item prop="refund" label="退还金额：">
                <el-input  v-model="formdata1.refund"></el-input>
            </el-form-item>
            <el-form-item prop="bankaccount" label="选择银行：">
                <el-input  v-model="formdata1.bankaccount"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="open4()">确定</el-button>
        </div>
    </el-dialog>
</div>

</template>

<script>
import {formatDate} from '@/utils/date';
import {zijinList,allApply} from '@/api/conduct/conduct';
export default {
    name:'userDetail',
    data() {
        return {
            rules: {
                reason: [{ required: true, trigger: 'blur', message: '原因不能为空' }],
                account: [{ required: true, trigger: 'blur', message: '请输入金额' }],
                receivables: [{ required: true, trigger: 'blur', message: '请输入收款凭证' }],
                time: [{type: 'date',required: true, trigger: 'change', message: '请选择到账时间' }],
                refund: [{ required: true, trigger: 'blur', message: '请输入退款金额' }],
                bankaccount: [{required: true, trigger: 'blur', message: '请选择银行账户' }],
            },
            //
            accountform:{
                accountname:'深圳市鼎盛广告传媒', 
                accountNo:'500011111111111111111111111',
                Naturename:'招商银行',
                allname: '深圳市招商银行洪浪北支行',
                location:'深圳市宝安区',
                Certificates:'已通过',
                moneytype:'未通过'
            },
            //企业法人信息
            legalForm:{
                phoneNo:'13822222222',
                IdcardNo:'500011111111111111111111111',
                name:'深圳市鼎盛广告传媒',
                Certificates:'已经通过',
                Auditstatus:'待审核',
                imagelist:[
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
                ],
            },
            //企业信息
            companyinfo:{
                url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            },
            joblist:[
                {name:'阿里巴巴',time:'2019-07-03--2019-07-06',url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'},
                {name:'阿里巴巴',time:'2019-07-03--2019-07-06',url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'}
            ],
            //媒介资质
            mediulist:[
                {mediutype:'一级代理',time:'2019-07-03--2019-07-06',Auditstatus:'未通过',Audittime:'2019-07-01 12:34',Nreason:'未通过原因描述',
                imagelist:[
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
                ]},
                {mediutype:'一级代理',time:'2019-07-03--2019-07-06',Auditstatus:'未通过',Audittime:'2019-07-01 12:34',Nreason:'',
                imagelist:[
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
                ]},
            ],
            sizeForm:{
                
            },
            form:{
                reason: '',
            },
            //确认缴纳弹窗数据
            formdata:{
                time: '',
                receivables:'',
                account:null,
            },
            //退款弹窗数据
            Refundable:null,
            formdata1:{
                refund:'',
                bankaccount:null,
            },
            dialogtype:'',
            dialogTitle:'',
            dialogFormVisible:false,
            dialogFormVisible1:false,
            dialogFormVisible2:false,
            activeName: 'first',
            list:[],
            imagelist:[
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
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
                this.edit(this.countid)
            }else if(this.activeName =='second'){
                this.edit(this.countid)
            }else{
                this.edit(this.countid)
            }
            
        })
    },
    methods:{
        //确认缴纳
        handleViewDetail(index,row) {
            this.dialogFormVisible1 = true;
        },
        handleViewDetail1(index,row) {
            this.dialogFormVisible2 = true;
            this.Refundable = row.Bond;
        },
        //审核不通过
        open5(type) {
            this.dialogtype = type;
            console.log(this.dialogtype);
            if(type=='店铺'){
                this.dialogTitle = '店铺审核';
            }else if(type=='实名'){
                this.dialogTitle = '实名审核';
            }
            
            this.dialogFormVisible = true;
        },
        //审核成功弹框
        open2() {
            this.$message({
            showClose: true,
            message: '恭喜你，审核成功',
            type: 'success'
            });
        },
        //审核不通过
        open1() {
            this.$refs.ValidateForm.validate((valid) => {
                if (valid) {
                    //调接口
                    if(this.dialogtype == '店铺'){
                        console.log(11111)
                    }else if(this.dialogtype == '店铺'){

                    }
                    console.log(333333)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //确认缴纳弹窗
        open3() {
            this.$refs.ValidateForm1.validate((valid) => {
                if (valid) {
                    //调接口
                    console.log(typeof this.formdata.account)
                    console.log(333333)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //退款弹窗
        open4() {
            this.$refs.ValidateForm2.validate((valid) => {
                if (valid) {
                    //调接口
                    console.log(333333)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //初始化接口
        edit(id){
            console.log(id);
        },
        handleClick(tab, event) {
            if(this.activeName=='first'){

            }else if(this.activeName =='second'){

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
        /**
       * 表单关闭时事件
       */
        handleClose() {
            this.$refs.ValidateForm.resetFields();
        },
        handleClose1() {
            this.$refs.ValidateForm1.resetFields();
        },
        handleClose2() {
            this.$refs.ValidateForm2.resetFields();
        }
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
        .shop-content {
           background: #f2f2f2;
           .el-form {
               padding: 10px 0;
               .el-form-item {
                   margin-bottom: 0;
                   padding: 3px 0;
               }
               .div_bottom {
                    padding: 20px 0 20px 98px;
               }
           }
        }
        //实名认证状态
        .realname-main {
            background: #f2f2f2;
            padding: 0 12px 50px 12px;
            .real-title {
                margin-left: 10px;
                margin-bottom: 7px;
            }
            p {
                margin: 0;
                font-size: 14px;
                line-height: 30px;
                span {
                    color: #606266;
                    display: inline-block;
                    width: 130px;
                    text-align: right;
                }
            }
        }
        //企业对公账户信息
        .account-main {
            background: #f2f2f2;
            padding: 15px 12px;
            .account-title {
                margin-left: 10px;
                margin-bottom: 7px;
            }
            .el-form {
                border-bottom: 1px solid #797979;
                padding-left: 7px;
            }
        }
        //媒介资质
        .mediumall {
            padding-bottom: 35px;
            background: #f2f2f2;
            overflow: auto;
            padding: 15px 0;
            .mediumall_child {
                margin-left: 20px;
                margin-right: 30px;
                .el-form {
                    .div_bottom {
                        margin-left: 40px;
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
            .mediumall_child:nth-child(2n+1) {
                border-bottom: 1px solid #d7d7d7;
            }
        }
        //工作经历
        .jop-content {
            background: #f2f2f2;
            overflow: auto;
            padding: 15px 0;
            .jop_child {
                float: left;
                width: 49%;
                .el-form {
                    .el-image{
                        width: 200px;
                    }
                }
            }
            .jop_child:nth-child(2n+1) {
                border-right: 1px solid #797979;
            }
            .jop_child:nth-child(2n) {
                .el-form {
                    padding-left: 20px;
                }
            }
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
        //企业信息css
        .user-person {
            
            position: relative;
            background: #f2f2f2;
            padding: 15px 12px;
            .user-main {
                border-bottom: 1px solid #797979;
                .user-title {
                    margin-left: 10px;
                    font-size: 16px;
                    line-height: 30px;
                }
                p {
                    margin: 0;
                    font-size: 14px;
                    line-height: 30px;
                    span {
                        color: #606266;
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
                    .el-image {
                        float: left;
                        width: 180px;
                    }
                }
                .p_two {
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
 }
 .button_medium {
    padding: 10px 13px;
 }
    
}

</style>