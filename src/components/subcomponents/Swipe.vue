<template>
    
  <mt-swipe :auto="4000">

      <mt-swipe-item v-for="item in list" :key="item.img">

          <img :src="item[imgname]" alt="" :class="[isfull ? 'full' : '']">

      </mt-swipe-item>
  </mt-swipe>
</template>


<script>
    export default {
        props:["list","imgname","isfull"]
    };
</script>



<style lang="scss" scoped>
 .mint-swipe {
     height:180px;
     //伦博图的每一页
     .mint-swipe-item {
         //让轮播图居中的样式，并不是分歧点，都可以使用居中的轮播图
         text-align: center;
         img {
             height:100%;
            
         }
     }
 }


//  控制轮播图宽度是否占满整个父元素的类样式
 .full {
     width:100%;
 }

</style>
