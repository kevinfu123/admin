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
            用户管理
        </el-tab-pane>
        <el-tab-pane label="账户资金明细" name="second">
            配置管理
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
export default {
    name:'userDetail',
    data() {
        return {
            // menuIndex:0,
            // navList:['用户基本信息','账户资金明细'],
            activeName: 'first',
            list:[],
            tabledata:[],
        };
    },
    created() {
        //获取传递过来的id
        this.countid = this.$route.query["id"];            
    },
    computed: {
        
    },
    mounted() {
        this.$nextTick(() => {
            this.edit(this.countid)
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
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
// .app-container {
//     ul li {
//         margin-left: 2px;
//         list-style:none;
//         display:inline-block;
//         height:30px;
//         line-height:30px;
//         width:120px;
//         text-align:center;
//         background: #d7d7d7;
//     }
//     li.active {
//         background: #AEAEAE;
//     }
// }

</style>