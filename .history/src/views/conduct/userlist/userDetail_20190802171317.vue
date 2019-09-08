<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户基本信息" name="first">

        </el-tab-pane>
        <el-tab-pane label="账户资金明细" name="second">

        </el-tab-pane>
    </el-tabs>
</template>
 <script>
export default {
    name:'userDetail',
    data() {
        return {
            activeName: 'first',

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
            console.log(tab, event);
        }
    }
}
</script>
