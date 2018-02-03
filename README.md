# Vue 项目

## 憋说话，用心感受每一行代码中的诗情雅意

## 搭建项目的结构
1. 安装vue并渲染App.vue根组件
2. 在 App.vue 根组件中，使用 MintUI 提供的 Header 组件 和  MUI 提供的 tabbar.html，实现头部和尾部
3. 美化 tabbar 的样式和字体图标

## 通过 vue-router 实现 tabbar 组件的切换
1. 安装并配置 vue-router     `Vue.use(VueRouter)`
2. 把 tabbar 上的四个按钮，改造成`router-link`
3. 在 `components` 文件夹下，创建一个`tabbars`文件夹，专门存放 tabbar 相关的4个组件
4. 创建一个单独的`router.js`路由文件模块，并配置路由的对应关系，最后，在 `router.js` 中使用 `export default router` 把路由对象暴露出去；
5. 在 `main.js` 导入 `router.js`  并挂载到VM上
6. 在 `App.vue` 中间区域，添加`router-view`容器；

## 实现tabbar路由的高亮
1. 在 创建路由对象的时候，添加`linkActiveClass`指向`mui-active`

## 实现路由切换的动画
1. 把 `App.vue` 中的 `<router-view></router-view>` 用 `<transition></transition>` 包裹起来
2. 创建类样式，并实现左侧消失，右侧进入；
3. 要解决的问题：
 + 如何实现左侧离开，右侧进入
 + 如何隐藏多余的横向滚动条
 + 如何左侧离开的组件不占标准流

## 实现了 Home 组件中的轮播图效果
1. 使用 Mint-UI中的 Swipe 组件实现轮播图布局
2. 为 Swipe 组件 添加高度 180px；
3. 在项目中安装 axios , 并挂载到 `Vue.prototype.$http` 上
4. 在 HomeContainer 中，封装一个获取轮播图的方法，并在 created 中调用；把获取的数据挂载到 data 上
5. 使用 `v-for` 渲染轮播图数据，要提供 `:key` 属性

## 配置Axios
1. 配置全局请求Ajax时候的`baseURL`
2. 配置拦截器
 + 在 `App.vue` 中配置拦截器的函数`initInterceptors`，并在 `created`中调用
 + 使用MintUI提供的 `Indicator` 组件展示loading效果

## 实现六宫格布局
1. 基于 MUI 提供的 `grid-default.html` 来改造成六宫格
2. 背景色要改成白色；去掉每个图片外部的 灰色边框；
3. 图片的大小和文字的大小也需要调整；
4. 在调整样式的时候，要本着：能复制粘贴现有类名的，绝不手写；

## 返回按钮的实现
1. 使用v-if结合flag控制返回按钮的显示和隐藏
2. 使用watch监视`this.$route.path`来监视路由地址的变化，并根据最新的地址，和`/home`进行判断，从而决定`flag`的值为false还是true;
3. 使用`this.$router.go(-1)`实现后退功能；
4. 使用 `watch` 的 `immediate: true` 实现页面刚进入的时候，强制调用一下`watch`；
```
watch: {
  '$route.path': {
    handler: 处理函数,
    immediate: true // 页面刚进入，就强制监视一下数据的变化
  }
}
```

## 把项目用git上传到码云或者github的仓储中

## 点击`新闻资讯`跳转到`新闻资讯列表`
1. 把 `HomeContainer` 组件中的 新闻资讯按钮，改造成`router-link` 并添加 `to` 属性；
2. 在项目的 `src -> components -> news` 文件夹下，创建一个 `NewsList.vue` 组件；
3. 在 `router.js` 中，导入`NewsList.vue` 组件，并添加一条新的路由规则；

## 获取新闻列表的数据
1. 在 `NewsList.vue` 组件中，定义methods节点，并添加`getNewsList`函数；
2. 当页面刚渲染出来的时候，就要在`created`中调用一下`getNewsList`

## 渲染新闻列表页面
1. 使用 MUI 提供的 `media-list.html` 来创建页面的结构；
2. 使用v-for指令，循环渲染 列表数据；

## 点击新闻列表项跳转到新闻详情页面
1. 把每个通过`v-for`渲染的列表项，使用`router-link`包裹一下，并提供`:to`属性；注意：这个 to 属性中，需要携带 当前这条新闻的Id   `<router-link :to="'/home/newsinfo/' + item.id">`
2. 在 `src -> components -> news` 目录下，创建 `NewsInfo.vue` 组件
3. 找到`router.js`，导入`NewsInfo.vue` 组件。并添加对应的路由规则；
4. 由于新闻详情页面，需要根据新闻的Id获取新闻数据，所以，可以为路由规则，添加`props: true` 启用 props  传参
5. 在  `NewsInfo.vue` 组件 内部，可以定义 `props: ['id']` 来接收并使用 URL 中传递的新闻Id参数；

## 获取新闻详情数据并渲染页面
1. 封装 `getNewsInfo` 方法，并把获取到的数据，挂载到 data 上的 `newsinfo` 对象中；
2. 调用vue相关的指令渲染页面数据，并自己手写样式，美化页面；

## 在 `.vue` 组件中如何注册私有子组件
1. 在 `script` 标签中，使用`import 组件 from '路径'` 导入需要的组件；
2. 在 `components` 属性中，把导入的组件，注册为自己的私有子组件；
3. 把注册的组件名称，以标签形式，引入页面中；


## 制作图片列表页面中的顶部滑动区域
1. 我们希望使用MUI提供的`tab-top-webview-main.html`东西，来实现顶部的滑动效果；
2. 当我们把基本的HTML结构，拷贝要页面中以后，发现没有滑动效果；经过分析：发现滑动效果插件，需要按照官方网站提供的方式，手动初始化：
```
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
```
3. 经过分析，得到结论，`mui()`这个函数，必须被导入导入 才能使用，于是，我们手动使用`import mui from '../../lib/mui/js/mui.js'` 来导入的MUI的JS文件；
4. 当把 `mui.js` 文件导入之后，发现浏览器报错了：`Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
5. 经过分析上述的报错问题：导入的`mui.js`中，可能使用了`caller`, `callee`, `arguments`这些特性，但是，我们打包好的`bundle.js`这个文件，默认启用了严格模式，因此，在严格模式下，不持支`mui.js`中的语法；
6. 如果要解决上述的报错问题，有两个解决方案：
 + 把 `mui.js` 中的 caller callee arguments 都改掉；（不可取）
 + 手动把`webpack`的严格模式禁用掉；（这是我们要采取的方案）
7. 如何禁用webpack的严格模式呢？需要安装一个对应的插件即可：
 + 使用的插件连接为[babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode)
 + 安装插件`cnpm install babel-plugin-transform-remove-strict-mode -D`
 + 在`.babelrc` 文件中，添加插件名称：
    ```
    {
      "plugins": ["transform-remove-strict-mode"]
    }
    ```

## 实现缩略图效果的插件
[vue2-preview](https://www.npmjs.com/package/vue2-preview)

