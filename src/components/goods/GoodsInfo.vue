<template>
    
    <div class="goodsinfo-container">
    <!-- 小球 -->
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="flag" ref="ball"></div>
    </transition>




        <!-- 轮播图区域 -->

        <div class="mui-card">
              <div class="mui-card-content">
                <div  class="mui-card-content-inner">
                    <swipe :list="lunboList" :imgname="'src'"></swipe>

                </div>

              </div>

        </div>


  <!-- 商品购买区域 -->
      <div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
              <span class="old">市场价：<del>￥{{ goodsinfo.market_price }}</del></span>
              <span>销售价：<span class="new">￥{{ goodsinfo.sell_price }}</span></span>
            </p>
            <p>
              <span>购买数量：</span>
              <nobox :max="goodsinfo.stock_quantity" @func="getSelectedCount"></nobox>
            </p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
					</div>
				</div>
			</div>
       


       
      <!-- 商品参数区域 -->
      <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <p>商品货号：{{ goodsinfo.goods_no }}</p>
            <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
            <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
					</div>
				</div>
				<div class="mui-card-footer btn-bottoms">
               <mt-button type="primary" size="large" plain @click="goDesc">图文介绍</mt-button>
            <mt-button type="danger" size="large" plain style="margin-top: 10px;" @click="goCmt">商品评论</mt-button>
                </div>
			</div>

    </div>
</template>


<script>
import swipe from "../subcomponents/Swipe.vue";
import nobox from "../subcomponents/nobox-goodsinfo.vue";

import { mapMutations } from "vuex";

export default {
  data() {
    return {
      lunboList: [], // 轮播图数组
      goodsinfo: {}, //商品详情
      flag: false,

      selectedCount: 1 //默认选中一个商品
    };
  },

  created() {
    this.getGoodsLunbo();
    this.getGoodsInfo();   
  },
  methods: {
    ...mapMutations(["addToShopCar"]),
    async getGoodsLunbo() {
      const { data } = await this.$http.get("/api/getthumimages/" + this.id);

      if (data.status === 0) {
        this.lunboList = data.message;
      }
    },
    async getGoodsInfo() {
      const { data } = await this.$http.get("/api/goods/getinfo/" + this.id);
      if (data.status === 0) {
        this.goodsinfo = data.message[0];
      }
    },
    addToCart() {
      //点击加入购物车

      this.flag = !this.flag;

      this.addToShopCar({id:this.id,count:this.selectedCount,state:true,price:this.goodsinfo.sell_price});

    },  
    goCmt() {
      this.$router.push("/home/goodscmt/" + this.id);
    },
      goDesc() {
      //点击跳转到描述页面
       this.$router.push("/home/goodsdesc/" + this.id);
    },
    beforeEnter(el){
        el.style.transform = "translate(0,0)";
    },

    enter(el,done){
        el.offsetWidth;
         // 获取 小球DOM元素，并调用 getBoundingClientRect() 获取 坐标位置对象
      const ballPosition = this.$refs.ball.getBoundingClientRect();

    //获取徽标DOM元素并调用 getBoundingClientRect() 获取 坐标位置对象
      const badgePosition = document.getElementById("badge").getBoundingClientRect()

   //徽标.top - 小球.top = y
    const y = badgePosition.top - ballPosition.top
    //徽标.left - 小球.left = x

    const x = badgePosition.left - ballPosition.left

    el.style.transform = "translate(" + x + "px, " + y + "px)";
    el.style.transition = "all 0.4s cubic-bezier(.1,0.46,1,.3)"

    done()

    },
    afterEnter(el){
      this.flag = !this.flag
    },

    getSelectedCount(c){
      this.selectedCount = c; 
    }
  },
  props: ["id"],
  components: {
    swipe,   //注册子组件
    nobox
  }
};
</script>



<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .btn-bottoms {
    display: block;
  }

  .price {
    .old {
      margin-right: 10px;
    }
    .new {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    position: absolute;
    border-radius: 50%;
    z-index: 11;
    top: 370px;
    left: 150px;
  }
}
</style>
