---
title: 【Vue】Vue Router
date: 2021-08-31
sidebar: 'auto'
categories:
 - Vue
tags:
 - Vue
 - Vue Router
---
## Vue Router


#### Vue Router 是 Vue.js 官方的路由管理器
Vue Router的功能有：
- 嵌套的路由/视图表
- 模块化，基于组件的路由配置
- 路由参数，查询，通配符
- 视图过渡效果
- 导航控制
- 历史模式或hash 模式
- 自定义的滚动条行为

### 安装
NPM
```
npm install vue-router
```
Yarn
```
yarn add vue-router
```
要通过 Vue.use() 明确地安装路由功能：
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

__记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能__
```javascript
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
```
通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由

### 动态路由匹配
动态路径参数:用“动态路径参数”(dynamic segment) 来达到动态渲染组件。
```javascript
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```
一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用
可以在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params`

### 响应路由参数的变化

组件实例会被复用，两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。这也意味着组件的生命周期钩子不会再被调用。
复用组件时，想对路由参数的变化作出响应的话，可以简单地 watch (监测变化) $route 对象：
```javascript
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
```
或者使用 2.2 中引入的 [路由守卫](###路由守卫)
### 匹配优先级
同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：路由定义得越早，优先级就越高。

### 嵌套路由
由多层嵌套的组件组合而成





