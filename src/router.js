// 创建路由规则
import VueRouter from 'vue-router'

// 导入路由相关的组件
import HomeContainer from './components/tabbars/HomeContainer.vue'
import MemberContainer from './components/tabbars/MemberContainer.vue'
import CartContainer from './components/tabbars/CartContainer.vue'
import SearchContainer from './components/tabbars/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsCmt from './components/goods/GoodsCmt.vue'

const router = new VueRouter({
  routes: [ // 路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/cart', component: CartContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo, props: true }, // 为当前的路由规则，启用 props 传参
    { path: '/home/photolist', component: PhotoList },
    { path: '/home/photoinfo/:id', component: PhotoInfo, props: true },
    { path: '/home/goodslist', component: GoodsList },
    {path:'/home/goodsinfo/:id',component:GoodsInfo,props:true},
    {path:'./home/goodsdesc/:id',component:GoodsDesc,props:true},
    {path:'/home/goodscmt/:id',component:GoodsCmt,props:true}
  ],
  linkActiveClass: 'mui-active' // 设置路由高亮的类名
})

export default router