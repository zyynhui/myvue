<template>
    
     <div class="goodsdesc-container">
      <h3 class="title">{{ goodsDesc.title}}</h3>
    <hr>

    <div class="content" v-html="goodsDesc.content">

    </div>

    </div> 





</template>


<script>
    
    export default {
        data(){
            return {
                goodsDesc:{}  // 商品描述对象
            }
        },
        created(){
          this.getGoodsDesc()
        },
        methods:{
            async getGoodsDesc (){
             const { data } = await this.$http.get("/api/goods/getdesc/" + this.id);
                if(data.status===0){
                    this.goodsDesc  = data.message[0]
                }
            }
        },
        props:["id"]
    }
</script>

<style lang="scss" scoped>
.goodsdesc-container {
  padding: 3px;

  .title {
    font-size: 15px;
    margin: 15px 0;
    color: #26a2ff;
    text-align: center;
  }
}

</style>
