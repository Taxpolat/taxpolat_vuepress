---
title: 【Vue】Vue SVG的使用
date: 2021-10-14
sidebar: 'auto'
author: 'Taxpolat'
categories:
 - Vue
tags:
 - Vue
 - 开发技巧
---

## SVG
::: tip
__SVG__ : __可缩放矢量图形（Scalable Vector Graphics，SVG）__, 是一种用于描述二维的矢量图形, 基于 XML 的标记语言。作为一个基于文本的开放网络标准，SVG能够优雅而简洁地渲染不同大小的图形，并和CSS，DOM，JavaScript和SMIL等其他网络标准无缝衔接。本质上，SVG 相对于图像，就好比 HTML 相对于文本。因此SVG在页面，不会变形也不会糊掉。    
   
- 和传统的点阵图像模式，像JPEG和PNG不同，SVG格式提供的是矢量图，这意味着它的图像能够被无限放大而不失真或降低质量，并且可以方便地修改内容。
- 正如 HTML 一样，SVG 也有可被 JavaScript 访问的文档对象模型（DOM）和事件。
- 社区和工具比较全，能满足开发者很多的需求。
      
#### 正因为SVG以上的有点，SVG在项目有着广泛的使用
:::

## 使用

以下整理了一下`SVG`在`Vue`项目中的使用方法及步骤：
1. 在`src/components/`下创建`SvgIcon/index.vue`组件

```vue

// index.vue
<template>
  <div  :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>

```
2. 在`src/`下创建一个`icons`目录，目录结构如下：
   `svg`目录主要用于存放`svg`文件，来看一下`index.js`的内容，功能就是把组件注册到全局，方便使用：
   ```js
    import Vue from 'vue'
    import SvgIcon from '@/components/SvgIcon' // svg组件

    // 注册到全局
    Vue.component('svg-icon', SvgIcon)

    const requireAll = requireContext => requireContext.keys().map(requireContext)
    const req = require.context('./svg', false, /\.svg$/)
    requireAll(req)

   ```
  ::: tip
    当然，如果你有自己的想法或需求，可以单独引入，无需非要注册到全局。
  :::
3. `main.js中引入`
   这一步就没什么好说的了，如果需要注册到全局，需要在入口文件中引入。
  ```js
  import '@/icons'
  ```
4. 在 `vue.config.js`中配置 `svg-sprite-loader`
```js
  // set svg-sprite-loader
  config.module
    .rule('svg')
    .exclude.add(resolve('src/icons'))
    .end()
  config.module
    .rule('icons')
    .test(/\.svg$/)
    .include.add(resolve('src/icons'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
    .end()
```
5. `vue`中使用
   
```vue 
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <svg-icon icon-class="smile" size="10"></svg-icon>
  </div>
</template>
<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
```
   
  :::danger
  1. 必须使用svg文件
  2. svg文件必须放在`icons/svg`下面
  3. `svg-icon` 的 `iconClass`属性传的，必须跟`svg`文件的文件名一样。
  :::
