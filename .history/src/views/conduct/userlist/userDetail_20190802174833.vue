<template>
<div class="app-container">
    <ul >
        <li v-for="(item,index) in navList" :class="{active:!(index-menuIndex)}" @click="menuShow(index)">
            <a href="#">{{item}}</a>
        </li>
    </ul>
    <div v-show="menuIndex == 0">内容一 </div>
    <div v-show="menuIndex == 1">内容二 </div>
</div>
</template>
 <script>
export default {
    name:'userDetail',
    data() {
        return {
            menuIndex:0,
            navList:['用户基本信息','账户资金明细'],
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
        menuShow (index) {
            this.menuIndex = index
            console.log(this.menuIndex)
        }
    }
}
</script>
