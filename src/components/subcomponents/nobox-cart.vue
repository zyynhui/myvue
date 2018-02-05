<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 26px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input class="mui-input-numbox" type="number" :value="initcount" ref="nobox" @change="countChanged" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div> 
</template>


<script>
    //导入mui的js文件

    import mui from "../../lib/mui/js/mui.js"

    import { mapMutations } from "vuex"
    export default {
    methods:{
        ...mapMutations(["updateGoodsCount"]),
        countChanged(){
            const count = parseInt(this.$refs.nobox.value);

            this.updateGoodsCount({id:this.id,count:count});
        }
    },

    mounted(){
        //初始化mui的数字选择框
        mui(".mui-numbox").numbox();
    },

    props:['initcount','id']

    }
</script>


<style lang="scss" scoped>


</style>
