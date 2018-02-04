<template>
    
    <div>
     
   <div class="goods-list">
     
      <router-link tag="div" class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id">
        <img :src="item.img_url" alt="">                                             
        <h1 class="title">{{ item.title }}</h1>
        <div class="info">
          <p class="price">
            <span class="new">￥{{ item.sell_price }}</span>
            <span class="old">￥{{ item.market_price }}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩{{ item.stock_quantity }}件</span>
          </p>
        </div>
      </router-link>


  <mt-button type="danger" size="large" style="margin-top:7px;" @click="getMore">加载更多</mt-button>

   </div>

    </div>
</template>


<script>
    
    export default {

        data(){
            return {
                pageindex:1,
                goodslist:[]
            }
        },
        created(){
            this.getGoodsList()
        },
        methods:{
            async getGoodsList(){
                const {data} = await this.$http.get( "/api/getgoods?pageindex=" + this.pageindex);
                if(data.status===0){
                    //先拼接在重新赋值，这样能够保证多页数据共存
                    this.goodslist = this.goodslist.concat(data.message)
                }
            },
            getMore(){
                this.pageindex++;
                this.getGoodsList();
            }
        }
    }
</script>


<style lang="scss" scoped>
.goods-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 7px;
    padding-top: 0;
    .goods-item {
        width:49%;
        border:1px solid #ccc;
        margin-top: 7px;
        box-shadow: 0 0 7px #ccc;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img {
            width:100%;
        }

        .title {
            font-size: 14px;
        }

        .info {
            background-color: #ccc;
            overflow: hidden;
            p {
                margin:5px 0 0  0;

            }


            .price {
              .new {
                 font-size: 16px;
                 color:red;
                 font-weight: 700;
                }

                .old {
                    text-decoration: line-through;
                    margin-left: 15px;
                    font-size: 13px;

                }
            }

            .sell {
                display: flex;
                font-size: 13px;
                justify-content: space-between;
            }
        }

    }
}



</style>
