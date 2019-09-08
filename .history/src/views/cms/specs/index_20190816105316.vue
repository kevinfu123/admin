<template>
  <el-container>
    <el-main>
        <div  style="height:100%;">
          <el-container>
            <el-header style="height:auto; padding:0;">
              <el-form ref="searchForm" :model="searchForm" class="el-row">
                <el-row :gutter="20">
                  <el-col :md="6" :lg="4" >
                    <el-form-item>
                      <el-input placeholder="业务单号" v-model="searchForm.businessNo" clearable/>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4">
                    <el-form-item>
                      <el-input placeholder="对账单号" v-model="searchForm.billNo" clearable/>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4">
                    <el-form-item>
                      <el-input placeholder="H提单号" v-model="searchForm.houseBillLadingNo" clearable/>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4">
                    <el-form-item>
                      <el-input placeholder="M提单号" v-model="searchForm.masterBillLadingNo" clearable/>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4">
                    <el-form-item>
                      <el-input placeholder="起运港" v-model="searchForm.departurePortName" clearable/>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4">
                    <el-form-item>
                      <el-input placeholder="目的港" v-model="searchForm.destinationPortName" clearable/>
                    </el-form-item>
                  </el-col>
                  <el-col :md="12" :lg="8">
                    <el-form-item>
                      <el-date-picker
                        v-model="atd"
                        type="daterange"
                        start-placeholder="atd起始"
                        end-placeholder="atd结束"
                        style="width:100%;"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4">
                    <el-form-item>
                      <el-select
                        class="agency_list"
                        v-model="searchForm.agencyEntCode"
                        :remote-method="searchCompany"
                        :loading="companySearching"
                        clearable
                        filterable
                        remote
                        placeholder="海外代理"
                        style="width: 100%;">
                        <el-option v-for="item in agencyData" :key="item.id" :value="item.code" :label="item.name">
                          <span style="float:left;font-size:12px;">{{ item.name }}</span>
                          <el-tag style="float:right;">{{ item.code }}</el-tag>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md="6" :lg="4">
                    <el-select
                      v-model="searchForm.feeSign"
                      clearable
                      filterable
                      collapse-tags
                      placeholder="请选择状态"
                      style="width:100%;">
                      <el-option
                        v-for="item in statusData"
                        :key="item.value"
                        :label="item.label.toUpperCase()"
                        :value="item.value"
                        class="my-option"/>
                    </el-select>
                  </el-col>
                  <el-col :md="6" :lg="4">
                    <el-form-item>
                      <el-button :loading="loading" type="primary" icon="el-icon-search" @click="getAllList">搜索</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-header>
            <el-main>
              <el-table
                v-loading="loading"
                :data="list"
                :height="tableHeight"
                @expand-change="expandChange"
                stripe>
                <el-table-column prop="status" label="状态" width="100">
                  <template slot-scope="scope">
                    <el-tag type="success" size="mini" v-if="scope.row.paymentCode==='1' && scope.row.feeStatus===1">
                        待审核      
                    </el-tag>
                    <el-tag type="danger" size="mini" v-else-if="scope.row.paymentCode==='1' && scope.row.feeStatus===0">
                        未收款
                    </el-tag>
                    <el-tag type="danger" size="mini" v-else-if="scope.row.paymentCode==='2' && scope.row.feeStatus===0">
                        未付款
                    </el-tag>
                    <el-tag type="success" size="mini" v-else-if="scope.row.paymentCode==='2' && scope.row.feeStatus===1">
                        已付款
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="billNo" label="对账单号" width="180"/>
                <el-table-column prop="businessNo" label="Job#" width="180"/>
                <el-table-column prop="mblCode" label="M提单号" width="180"/>
                <el-table-column prop="hblCode" label="H提单号" width="180"/>
                <el-table-column label="收支金额($)" width="100">
                  <template slot-scope="scope">
                      <span :style="scope.row.paymentCode==='1'?'':'color:red;'">{{ scope.row.paymentCode==='1'?scope.row.billFee:-scope.row.billFee }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="etd" label="预计离港时间" width="120"/>
                <el-table-column prop="atd" label="实际离港时间" width="120"/>
                <el-table-column label="起始港/目的港" width="180">
                  <template slot-scope="scope">
                    <el-tag type="info" size="mini">{{ scope.row.departurePortName }}</el-tag>
                    <el-tag type="primary" size="mini">{{ scope.row.destinationPortName }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="containers" label="配箱信息" width="100"/>
                <el-table-column prop="saleName" label="销售" width="100"/>
                <el-table-column prop="serviceName" label="客服" width="100"/>
              </el-table>
            </el-main>
            <el-footer height="">
              <el-row :gutter="20">
                <el-col :span="14">
                  <el-pagination
                  :current-page="pager.page"
                  background
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="pager.pageSize"
                  :total="pager.total"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handlePageChange"/>
                </el-col>
              </el-row>
            </el-footer>
          </el-container>
        </div>
    </el-main>
  </el-container>
</template>

<script>
  import { Message, MessageBox, Loading } from 'element-ui'
  //import {listByPage, getBilling, getCompanyList, getAllBill} from '@/api/billing'

  export default {
    name: 'Billings',
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: 'A week before',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      
      statusData: [
          { value: 'checked', label: '已收款' },
          { value: 'unchecked', label: '未收款' },
          { value: 'unpaid', label: '未付款' },
          { value: 'paid', label: '已付款' }
      ],
      AllBill:{
        checked:0,
        paid:0,
        unchecked:0,
        unpaid:0,
      },
      pricetype:'',
      tableHeight: 300,
      list:[],
      tableData2:[],
      tableData:[],
      agencyData: [],
      atd: [],
      searchForm: {
        feeSign:'',
        agencyEntCode:'',
        billLadingNo:'',
        billNo:'',
        businessNo:'',
        houseBillLadingNo:'',
        masterBillLadingNo:'',
        departurePortName:'',
        destinationPortName:'',
        atdStart: null,
        atdEnd: null,
        page: 1,
        limit: 20
      },
      pager:{
        page: 1,
        pageSize: 20,
        total: 0,
      },
      companySearching: false,
      loading: false,
      loading1: false,
      labelPosition: 'left'
    }
  },
  created() {
    //代理数据
    //this.searchCompany()
    //初始化列表数据
    //this.getAllList()
  },
  mounted() {
    
  },
  filters: {
    transportModeFilter(row, column, val, columnIndex) {
      switch(val) {
        case '0':
        case '1': return 'SEA';
        case '2': return 'AIR';
        default: return '';
      }
    }
  },
  methods: {
    
   
    //代理数据
    searchCompany(query) {
      const listParam = {
        type: 1, // 只取收货人
        page: 1,
        limit: 100,
        filter: query,
        fields: ['code', 'name', 'nameEn']
      }
      this.companySearching = true
      getCompanyList(listParam).then(res => {
        this.companySearching = false
        if (res.success) {
           this.agencyData = res.data.rows
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        this.companySearching = false
        if (e) this.$message.error(e)
      })
    },
    //检索类型
    radioChange(){
      console.log(this.pricetype)
      this.getAllList()
    },
    /**
     * 搜索
     */
    getAllList() {
      if(this.searchForm.agencyEntCode==''){
        this.$message({
          showClose: true,
          message: '必须选择海外代理，才能查询账单！！！',
          type: 'warning'
        });
        return
      }
      this.searchForm.page = this.pager.page
      this.searchForm.limit = this.pager.pageSize
      this.searchForm.atdStart = this.atd && this.atd.length>0?this.atd[0]:null
      this.searchForm.atdEnd = this.atd && this.atd.length>1?this.atd[1]:null
      this.AllBill.checked = 0
      this.AllBill.paid = 0
      this.AllBill.unchecked = 0
      this.AllBill.unpaid = 0
      this.loading = true
      listByPage(this.searchForm).then((result) => {
        if(result.success){
          this.list = result.data.rows
          this.pager.total = result.data.count
        } else {
          this.$message.error(result.msg)
        }
      }).catch((err) => {
        if(err) this.$message.error(err)
      }).finally(() => {
        this.loading=false
      })

      //获取账单金额
      getAllBill(this.searchForm.agencyEntCode).then(res => {
        
        if (res.success) {
           this.AllBill.checked = res.data.checked
           this.AllBill.paid = res.data.paid
           this.AllBill.unchecked = res.data.unchecked
           this.AllBill.unpaid = res.data.unpaid
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        if (e) this.$message.error(e)
      })
    },
    transportModeFormatter(row, column, val, index) {
      switch(val) {
        case '0':
        case '1': return 'SEA';
        case '2': return 'AIR';
        default: return '';
      }
    },
    //账单详情
    expandChange(row,expandedRows){
      // 收缩时情况明细数据
      if(expandedRows.length === 0) {
        this.tableData = []
        this.tableData2 = []
        return
      }
      // 保留一个展开
      if(expandedRows.length>1){
          expandedRows.shift()
      } 
      this.loading1 = true
      getBilling(row.billNo,row.orderNo).then((result) =>{
        this.tableData = []
        this.tableData2 = []
        if (result.success) {
          this.tableData2.push(result.data.orderDetail)
          this.tableData = result.data.statementDetailList
        } else {
          this.$message.error(result.msg)
        }
      }).catch((err) =>{
          if(err) this.$message.error(err)
      }).finally(() => {
        this.loading1=false
      })
    },
    /**
     * 分页器：页大小变更
     */
    handleSizeChange(val) {
      this.pager.pageSize = val
      this.searchForm.pageSize = val
      this.getAllList()
    },
    /**
     * 分页器：页码变更
     */
     handlePageChange(val) {
      this.pager.page = val
      this.searchForm.page = val
      this.getAllList()
    }
  }
}
</script>
<style>
  .foot_col span{
    font-size: 13px;
    line-height: 31px;
  }
  .search-form {
    /* margin-bottom: -20px; */
  }
</style>

