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
        this.penga = this.$route.query["peng"];            
    },
    computed: {
        
    },
    mounted() {
        this.$nextTick(() => {
            //this.edit()
        })
    },
    methods:{

    }
}
</script>
