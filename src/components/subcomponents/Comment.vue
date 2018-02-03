<template>
  <div>
    <h4>发表评论 - {{ id }}</h4>
    <hr>

    <textarea placeholder="请输入要BB的内容（最多吐槽120个字）" maxlength="120" v-model="cmtMsg"></textarea>

    <mt-button type="primary" size="large" @click="postCmt">发表评论</mt-button>


    <!-- 评论列表区域 -->
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in cmtlist" :key="i">
        <div class="cmt-title">第{{ i+1 }}楼&nbsp;用户：{{ item.user_name }}&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
        <div class="cmt-body">{{ item.content }}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

  </div>
</template>


<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageindex: 1, // 默认请求第一页的评论数据
      cmtlist: [], // 评论列表数组
      isover: false, // 评论是否加载完了， 默认认为没有加载完
      cmtMsg: "" // 用户要发表的评论内容
    };
  },
  created() {
    this.getCommentList();
  },
  methods: {
    async getCommentList() {
      // 在调用Ajax获取数据之前，先判断isover是否为true
      if (this.isover) return;
      // 获取评论列表
      const { data } = await this.$http.get(
        "/api/getcomments/" + this.id + "?pageindex=" + this.pageindex
      );
      if (data.status === 0) {
        if (data.message.length <= 0) return (this.isover = true);
        // this.cmtlist = data.message;
        // 如何合并数组？？？
        // 老数组.concat(新数组)
        // concat 并不会修改原数组，而是返回一个拼接好的新数组
        this.cmtlist = this.cmtlist.concat(data.message);
        console.log("ok");
      }
    },
    getMore() {
      // 点击加载更多评论
      // 分析：
      // 1. 要让 pageindex 自增+1
      // 2. 直接调用现成的 getCommentList 就行了
      this.pageindex++;
      this.getCommentList();
    },
    async postCmt() {
      // 发表评论
      // 校验非法值
      if (this.cmtMsg.trim().length <= 0) return Toast("评论内容不能为空！");
      const { data } = await this.$http.post("/api/postcomment/" + this.id, {
        content: this.cmtMsg.trim()
      });
      if (data.status === 0) {
        Toast("发表评论成功！");
        // 自己在客户端拼接出一个新的评论对象
        const newCmt = {
          user_name: "匿名用户",
          add_time: new Date(),
          content: this.cmtMsg.trim()
        };
        // 将 自己拼接的评论对象，手动 unshift 到 评论列表的第一项；这样，能够节省一次Ajax网络请求；
        this.cmtlist.unshift(newCmt);
        // 清空评论内容
        this.cmtMsg = "";
        // 从新加载 评论列表
      }
    }
  },
  props: ["id"] // 子组件如果想要获取到 父组件传递过来的数据，必须使用 porps 来定义和接收
};
</script>

<style lang="scss" scoped>
textarea {
  margin: 0;
  font-size: 14px;
}

.cmt-list {
  margin: 5px 0;
  .cmt-item {
    .cmt-title {
      font-size: 14px;
      line-height: 30px;
      background-color: #ddd;
    }
    .cmt-body {
      font-size: 13px;
      line-height: 35px;
      text-indent: 2em;
    }
  }
}
</style>
