<template>
  <div class="cart-container">
    
    <!-- 购物车商品列表 -->
    <div class="goods-list">

      <!-- 每个商品项 -->
      <div class="mui-card goods-item" v-for="(item, i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<!-- 开关 -->
            <mt-switch v-model="idMapState[item.id]" @change="stateChanged(item.id, idMapState[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h1 class="title">{{ item.title }}</h1>
              <div class="buy">
                <span class="price">￥{{ item.sell_price }}</span>
                <!-- 数字选择框 -->
                <nobox :initcount="idMapCount[item.id]" :id="item.id"></nobox>
                <a href="javascript:void(0)" class="del" @click="del(item.id, i)">删除</a>
              </div>
            </div>
					</div>
				</div>
			</div>

    </div>

    <!-- 结算区域i -->
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner settlement">
						<div>
              <p>总计（不含运费）</p>
              <p>已勾选商品<span class="red">{{ settlementInfo.c }}</span>件，总价<span class="red">￥{{ settlementInfo.amount }}</span></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div> 

    <!-- <hr> -->
    <!-- {{ idMapCount }} -->
    <!-- <hr> -->
    <!-- {{ idMapState }}
    <hr>
    {{ settlementInfo }}  -->

  </div>
</template>

<script>
import nobox from "../subcomponents/nobox-cart.vue";
import {mapGetters,mapMutations } from "vuex";
export default {

  data(){
    return {
      goodslist:[]   //购物车中的商品信息
    }
  },

  created(){

   this.getCartGoods()

  },

  methods:{
    ...mapMutations(["updateGoodsState","delFormCart"]),
    async getCartGoods(){
      //如果获取到Idstr为空，则表示购物车中没有任何数据，此时不应该发起Ajax请求
      if(this.Idstr.length<=0) return;
      //根据购物车中的商品id，获取到所有商品信息
      const {data} = await this.$http.get("/api/goods/getshopcarlist/" + this.Idstr);
      if(data.status===0){
        this.goodslist = data.message;
      }
    },
       del(id, i) {
      // 根据 id 和 索引删除store中购物车的数据 和  当前页面中指定索引那条数据
      // 拿到的Id，是用来 从 store.cart 中，删除对应的个数据的；
      // 拿到的索引 i ,是用来从 当前组件 的 this.goodslist 中，删除页面上对应的那条数据的；
      this.goodslist.splice(i, 1); //  页面上的数据就删掉了
      this.delFormCart(id); // 从Store 中删除对应的商品信息
    },

    stateChanged(id,state){
      this.updateGoodsState({id,state})
    }
  },
  computed:{
    ...mapGetters(["Idstr","idMapCount","idMapState","settlementInfo"])
  },
  components:{
    nobox
  }

};   

</script>

<style lang="scss" scoped>
.cart-container {
  background-color: #eee;
  overflow: hidden;
}
.goods-list {
  .goods-item {
    .mui-card-content-inner {
      display: flex;
      img {
        width: 60px;
        height: 60px;
      }
      .info {
        display: flex;
        // 占满剩余宽度
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 13px;
        }
        .buy {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price {
            color: red;
            font-weight: bold;
            font-size: 16px;
          }
        }
      }
    }
  }
}

.settlement {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .red {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>