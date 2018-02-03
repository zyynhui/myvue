<template>
  <div>
    
    <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1 class="title">{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                <span>发表时间：{{ item.add_time | dateFormat }}</span>
                <span>点击：{{ item.click }}次</span>
              </p>
						</div>
					</router-link>
				</li>
			</ul>

  </div>
</template>

<script>
export default {
  data() {
    return {
      newslist: [] // 新闻列表的空数据
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    async getNewsList() {
      // 获取 新闻列表数据
      const { data } = await this.$http.get("/api/getnewslist");
      if (data.status === 0) {
        // 要把数据渲染到页面上；页面上如果要渲染数据的话，都要从 data 上来拿数据；
        this.newslist = data.message;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-media-body {
  .title {
    font-size: 14px;
  }
  .mui-ellipsis {
    font-size: 13px;
    color: #26a2ff;
    display: flex;
    justify-content: space-between;
  }
}
</style>
