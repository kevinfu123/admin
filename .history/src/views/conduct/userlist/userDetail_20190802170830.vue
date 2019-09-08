<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    </el-tabs>
</template>
 <script>
export default {
    name:'userDetail',
    data() {
        return {

        }
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
