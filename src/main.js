// 项目入口文件
import Vue from 'vue'
// 导入 vue-router 包
import VueRouter from 'vue-router'
// 为 Vue 安装 vue-router
Vue.use(VueRouter)


import Vuex from 'vuex'

Vue.use(Vuex)

const cart = JSON.parse(localStorage.getItem('cart') || '[]')

const store = new Vuex.Store({
  state:{
    cart     //  购物车数组
  },
  mutations:{
 addToShopCar(state,info){     // 这里的 info {id：90，count:1}

   let isfind = false
   state.cart.some(item =>{
     if(item.id===info.id){
       item.count +=info.count  //表示商品已存在，只更新数量
       isfind = true // 更新状态标识符，表示购物车中曾经有这个商品
       return true // 终止后续的some循环

     }
   })
   
   if(!isfind)  state.cart.push(info)

   localStorage.setItem('cart', window.JSON.stringify(state.cart))
      
   

 },

 updateGoodsCount(state,info){
   //循环cart购物车，使用some找到要更新的那个商品，把购物车中的商品count更新为info.count

   state.cart.some(item =>{
     if(item.id ===info.id){
       item.count = info.count
       return true
     }
   })

   localStorage.setItem('cart', window.JSON.stringify(state.cart))
 },
 delFormCart(state,id){
   state.cart.some((item,i)=>{
     if(item.id==id){
       state.cart.splice(i,1)

       return true
     }
   })
   

   localStorage.setItem('cart', window.JSON.stringify(state.cart))
 },

 updateGoodsState(state,info){
   state.cart.some(item =>{
     if(item.id==info.id){
       item.state = info.state
       return true
     }
   })
   localStorage.setItem('cart', window.JSON.stringify(state.cart))

 }
  },
  getters:{
    totalcount(state){
      //计算徽标商品中的总数量
      let c =0
      state.cart.forEach( item =>{
        c += item.count
      })

      return c
    },
    Idstr(state){
 //获取购物车中的所有商品id字符串，拼接  88,89,90
      let arr = []
      state.cart.forEach(item =>{
        arr.push(item.id)
      })   

      return arr.join(',')
    },
    idMapState(state){

     const o = {}

     state.cart.forEach(item =>{
       o[item.id] = item.state
     })

     return o;

    },
    idMapCount(state){
     //获取购物车中，商品ID -> count 之间的映射关系，从而得到一个对象
      const o = {}

      state.cart.forEach(item =>{
        o[item.id] = item.count
      })

      return o


    },
    settlementInfo(state){
      let info = {c:0,amount:0}

      state.cart.forEach(item =>{

        if(item.state){
          info.c = item.count  // 加入勾选数量
          info.amount += item.count*item.price  
        }

      })

      return info 
    }
  }
})

// 创建全局的时间过滤器    data   date
import moment from 'moment' // 导入格式化时间的包
Vue.filter('dateFormat', function (val) {
  // 借助于 moment.js 包来快速格式化时间
  return moment(val).format('YYYY-MM-DD HH:mm:ss')
})


// 导入并安装vue缩略图插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)


// 导入 axios 并挂载
import axios from 'axios'
// 配置全局的Ajax根路径
axios.defaults.baseURL = 'http://39.106.32.91:3000';
Vue.prototype.$http = axios


// 导入MintUI并导入样式
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 为 Vue 安装 MintUI
Vue.use(MintUI)


// 导入美化MUI的样式表
import './lib/mui/css/mui.min.css'
// 导入 MUI 的扩展图标库
import './lib/mui/css/icons-extra.css'


// 导入根组件
import App from './components/App.vue'

// 导入自己封装的 路由模块
import router from './router.js'

const vm = new Vue({
  el: '#app',
  render: c => c(App),
  router, // 将路由挂载到 VM 实例上
  store  //将vuex创建的store实例挂载到VM上
})







// 大家在搭建项目结构的时候：
// 1. 先把 App.vue 根组件渲染出来