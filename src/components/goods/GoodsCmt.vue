<template>
    
    <div>
        <cmt :id="id"></cmt>
    </div>
</template>


<script>

import cmt from "../subcomponents/Comment.vue"
    
    export default {
        props:["id"],
        components:{
            cmt
        }
    }
</script>


<style lang="scss" scoped>



</style>
