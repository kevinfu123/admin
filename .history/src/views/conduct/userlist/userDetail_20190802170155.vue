<template>




    
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
        edit(id){
            console.log(333333);
            console.log(id);
        }
    }
}
</script>
