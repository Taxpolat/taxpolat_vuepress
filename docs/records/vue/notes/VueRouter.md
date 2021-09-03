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
:star:  :star:    
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
  :star:  :star:    

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
 :star:     
::: tip
同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：路由定义得越早，优先级就越高。
:::
### 嵌套路由 
 :star: :star:   
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
 :star: :star:   
::: tip
`<router-link>` 创建 a 标签来定义导航链接, 还可以借助 `router` 的实例方法，通过编写代码来实现
:::
#### router.push() 
:star: :star: :star:   
router.push(location, onComplete?, onAbort?) 
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
### router.replace()
 :star: :star: :star:   
 router.replace(location, onComplete?, onAbort?)
:::danger
跟`router.push`很像，唯一的不同就是，它不会向 `history` 添加新记录   
`<router-link :to="..." replace>` =	`router.replace(...)`
:::
### router.go(n) 
:star: :star: :star:   
参数n是一个整数,在 history 记录中向前或者后退多少步,`window.history.go(n)`类似。
```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)
// 后退一步记录，等同于 history.back()
router.go(-1)
```
::: danger
`router.push`、 `router.replace` 和 `router.go` 跟 `window.history.pushState`、 `window.history.replaceState` 和 `window.history.go (opens new window)`好像， 实际上它们确实是效仿 `window.history API`` 的 。:nerd_face:
:::
### 导航守卫
 :star: :star: :star::star: :star:    
__vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航, 有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。__

:::danger
记住：   
__参数或查询的改变并不会触发进入/离开的导航守卫__
:::
#### 全局前置守卫
:star: :star: :star::star: :star:    
使用 `router.beforeEach` 注册一个全局前置守卫：
```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```
:::tip
每个守卫方法接收三个参数：
- to: Route: 即将要进入的目标 路由对象
- from: Route: 当前导航正要离开的路由
- next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 `next 方法`的调用参数。
  - `next()`: 进行管道中的下一个钩子
  - `next(false)`: 中断当前的导航, URL 地址会重置到 from 路由对应的地址.
  - `next('/')` 或者 `next({ path: '/' })`: 跳转到一个不同的地址.
  - 可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 `router-link` 的 to prop 或 `router.push` 中的选项.
  - `next(error)`:导航会被终止且该错误会被传递给 `router.onError()` 注册过的回调
:::
__确保 next 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错__

全局路由守卫的用途：用户身份验证，验证通过下一步，不通过就返回到login：
```js
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated){
    next({ name: 'Login' })
  }
  else{
    next()
  }
})
```
#### 路由独享的守卫
 :star: :star: :star::star: :star:     
可以在路由配置上直接定义 beforeEnter 守卫：   
__全局前置守卫的方法参数是一样的__
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
用途：
1. 页面跳转置顶处理
移动端有时候会出现跳转页面以后页面不置顶，直接自动滑滑动，页面展示不全的问题。此时就可以使用`路由独享的守卫`的方式强项给页面置顶。
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        window.scrollTo(0, 0); 
        next();
      }
    }
  ]
})
```
#### 组件内的守卫
 :star: :star: :star::star: :star:    

组件内路由导航守卫有：
- beforeRouteEnter
- beforeRouteUpdate
- beforeRouteLeave
```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```
:::danger
警告：   
__beforeRouteEnter 守卫 不能 访问 this ！！！！__   
__beforeRouteEnter 守卫 不能 访问 this ！！！！__   
__beforeRouteEnter 守卫 不能 访问 this ！！！！__   
- `beforeRouteEnter` 是支持给`next` 传递回调的唯一守卫    
- 对于 `beforeRouteUpdate` 和` beforeRouteLeave` 来说，`this` 已经可用了，所以不支持传递回调
:::

`beforeRouteLeave`的用途：
类似用户填写一个表单但是还未提交要离开时，禁止用户离开或者提醒用户离开的业务场景， 该导航可以通过 `next(false)` 来取消:
```js
beforeRouteLeave (to, from, next) {
  if (this.isSubmit) {
    next()
  } else {
    window.alert('修改未提交，禁止离开！')
    next(false)
  }
}
```
### 路由元信息（meta ）
:star:   

定义路由的时候可以配置 `meta` 字段:
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```
:::tip
首先：    
`routes` 配置中的每个路由对象为 路由记录    
路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录    
一个路由匹配到的所有路由记录会暴露为 `$route` 对象 (还有在导航守卫中的路由对象) 的 `$route.matched` 数组, 需要遍历 `$route.matched` 来检查路由记录中的 `meta 字段`
:::
```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

### 路由懒加载
 :star: :star: :star: :star: :star:   
`路由懒加载`为Vue项目的优化方式之一。
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。
:::tip
异步组件:
```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```
:::
路由懒加载中我们要用到异步组件，所以改为这样配置：
```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: loadView('Home')
    },
    {
      path: '/about',
      name: 'about',
      component: loadView('About')
    }
  ]
})
```
::: tip
将其他的文件配置完成后，我们就可以在浏览器中看到懒加载的效果了，即只有当路由匹配成功时，才会加载相应的组件，而且加载一次后会将它缓存，下次再访问这个路由，不会重新加载
:::
