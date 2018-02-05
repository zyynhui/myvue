<template>
    
    <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input class="mui-input-numbox" type="number" value="1" ref="nobox" @change="countChanged" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.js";

    export default {
      methods:{
          countChanged(){
              //每当听到数字选择框中的数据变化，就触发change 处理函数，在处理函数中，
            // 使用ref获取到这个文本框的DOM对象，并通过.value 获取到选择的数量值
            const count = parseInt(this.$refs.nobox.value);
            //接下来，需啊把获取到的最新数量值，通过$emit传递给父组件
            this.$emit("func",count);
          }
      },
      mounted(){
          // 初始化 mui 的数字选择框
           mui(".mui-numbox").numbox();

      },

      props: ["max"],

      watch:{
           max: function(newVal, oldVal) {
      // 当监视到 max 值变化以后，从新 为 nobox 设置最大值
      // 调用 nobox 提供的JS API，为 其设置最大值
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
        }
      }
    }
</script>

<style lang="scss" scoped>



</style>
