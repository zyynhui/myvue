<template>
  <div>

    <!-- 头部的滑动区域 -->
    <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
            <!-- 我们想要按需，只为 全部默认添加  mui-active -->
						<a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cate" :key="item.id" @tap="getPhotoListByCateId(item.id)">
							{{ item.title }}
						</a>
					</div>
				</div>

			</div>


      <!-- 图片懒加载的列表 -->

      <ul>
        <router-link v-for="item in photolist" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
          <!-- v-lazy 的值 应该是图片的地址 -->
          <img v-lazy="item.img_url">
          <div class="info">
            <h1 class="title">{{ item.title }}</h1>
            <div class="body">{{ item.zhaiyao }}</div>
          </div>
        </router-link>
      </ul>


  </div>

</template>

<script>
// 导入MUI 的JS文件
import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      cate: [], // 图片分类数组
      photolist: [] // 图片列表
    };
  },
  created() {
    this.getCategory();
    // 默认进入页面之后，就自动获取 全部分类 下的所有图片列表
    this.getPhotoListByCateId(0);
  },
  methods: {
    async getCategory() {
      // 获取所有的图片分类
      const { data } = await this.$http.get("/api/getimgcategory");
      if (data.status === 0) {
        // 手动拼接出一个 全部分类对象，并unshift到 数组的开头
        data.message.unshift({ id: 0, title: "全部" });
        this.cate = data.message;
      }
    },
    async getPhotoListByCateId(cateId) {
      // 根据分类的Id获取图片列表
      const { data } = await this.$http.get("/api/getimages/" + cateId);
      if (data.status === 0) {
        this.photolist = data.message;
      }
    }
  },
  mounted() {
    // 当 组件执行到 mounted 函数时候，页面上的DOM元素已经渲染好了，此时，才能真正初始化插件
    // 初始化区域滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>

<style lang="scss" scoped>
#slider {
  // 提高 # slider 区域的 水平手指滑动效果
  touch-action: pan-x;
}

ul {
  list-style: none;
  margin: 0;
  padding: 10px;
  li {
    background-color: #ddd;
    text-align: center;
    box-shadow: 0 0 7px #666;
    position: relative;
    & + li {
      margin-top: 10px;
    }
    img {
      vertical-align: middle;
      width: 100%;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      position: absolute;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      max-height: 85px;
      overflow: hidden;
      .title {
        font-size: 14px;
        color: #fff;
      }
      .body {
        font-size: 13px;
        text-align: left;
        text-indent: 2em;
        color: #fff;
      }
    }
  }
}
</style>
