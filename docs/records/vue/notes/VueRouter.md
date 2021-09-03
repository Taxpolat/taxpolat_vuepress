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

::: danger 
记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
:::
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
通过注入路由器，__我们可以在任何组件内通过 `this.$router`__,__访问路由器，也可以通过 `this.$route` 访问当前路由__
:::warning
`this.$router`和 `this.$route`的区别：   
1. `this.$router` 访问路由器,`this.$route` 访问当前路由,
2. `this.$router` 相当于一个全局的路由器对象,包含了很多属性和对象（比如 `history 对象`），任何页面都可以调用其 `push()`, `replace()`, `go()` 等方法
3. `his.$route`表示当前路由对象, 每一个路由都会有一个 route 对象，是一个局部的对象，可以获取对应的 `name`, `path`, `params`, `query` 等属性
:::
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
::: tip
同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：路由定义得越早，优先级就越高。
:::

### 嵌套路由

::: tip
由多层嵌套的组件组合而成
::: 
基本使用方法：   
```html
<div id="app">
  <router-view></router-view>
</div>
```
```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [{ path: '/user/:id', component: User }]
})
```
::: tip
__`<router-view></router-view>`__ 是嵌套路由最顶层的出口，渲染最高级路由匹配到的组件。
:::

同样的，一个组件也可以包含自己的嵌套`<router-view></router-view>`

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```
::: tip
要在嵌套的出口中渲染组件，需要在 `VueRouter` 的参数中使用 `children` 配置：
:::
```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```
:::warning
以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径
:::
### 编程式导航
::: tip
`<router-link>` 创建 a 标签来定义导航链接, 还可以借助 `router` 的实例方法，通过编写代码来实现
:::
#### router.push(location, onComplete?, onAbort?)
::: danger


注意：在 Vue 实例内部，你可以通过`$router` 访问路由实例。因此你可以调用 `this.$router.push`
:::   
   
使用`router.push`,会向 `history 栈`添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL

::: tip
`<router-link :to="...">` 等同于调用 `router.push(...)`
:::

`router.push`方法的`参数`可以是一个`字符串路径`, 或者一个`描述地址的对象`。
例如：   
```js
router.push({ path: 'home' })
router.push({ path: 'register', query: { plan: 'private' }})
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
router.push({ path: '/user', params: { userId }}) // -> /user
```
:::danger
提供了 `path`，`params` 会被忽略,`path`和`params`不可以一起使用，需要提供路由的 name 或手写完整的带有参数的 path。   
同样的规则也适用于 `router-link` 组件的 to 属性
:::