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
        this.countid = this.$route.query["id"];            
    },
    computed: {
        
    },
    mounted() {
        this.$nextTick(() => {
            //this.edit(this.countid)
        })
    },
    methods:{
        edit(id){
            console.log(id)
        }
    }
}
</script>
