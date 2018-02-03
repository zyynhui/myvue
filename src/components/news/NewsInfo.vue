<template>
  <div class="newsinfo-container">
    <h3 class="title">{{ newsinfo.title }}</h3>
    <p class="info">
      <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>
    <hr>

  <div class="content" v-html="newsinfo.content"></div>


  <!-- 评论子组件 -->
  <!-- NewsInfo 组件是父组件，comment 是子组件  -->
  <!-- 父组件上，有一个 props 属性，为新闻id， 需要把 新闻Id当作参数传递给 评论子组件 -->
  <!-- 涉及到了 父向子传值   使用 v-bind: 属性绑定形式，把 数据传给子组件-->
  <comment :id="id"></comment>

  </div>
</template>

<script>
// 1. 导入自己需要的子组件
import comment from "../subcomponents/Comment.vue";

export default {
  data() {
    return {
      newsinfo: {} // 默认新闻详情是一个空对象
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    async getNewsInfo() {
      // 根据ID值获取新闻详情
      const { data } = await this.$http.get("/api/getnew/" + this.id);
      if (data.status === 0) {
        this.newsinfo = data.message[0];
      }
    }
  },
  props: ["id"],
  components: {
    // 注册 私有的子组件
    comment
  }
};
</script>


<style lang="scss" scoped>
.newsinfo-container {
  padding: 3px;
}
.title {
  font-size: 15px;
  color: red;
  text-align: center;
  margin: 15px 0;
}
.info {
  display: flex;
  justify-content: space-between;
  color: #26a2ff;
  font-size: 13px;
}
</style>
