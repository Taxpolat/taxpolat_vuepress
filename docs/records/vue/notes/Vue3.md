---
title: 【Vue】Vue 3
date: 2021-11-25
sidebar: 'auto'
author: 'Taxpolat'
categories:
 - Vue
tags:
 - Vue
---

## Vue3 带来了什么

1. 性能提升
   - 打包大小
   - 渲染速度
   - 内存占用
2. 源码的升级
3. 拥抱TypeScript
   - 更好的在Vue中使用TS

4. 其他新的特性

   1. Composition Api (组合API)

   2. 新的内置组件
   3. 其他的改变

5. HMR： Hot module replacement 热重载

## 代码分析

### main.js

1. 引入的不在是Vue的构造函数了， 是createApp的工厂函数

__createApp：__

- 工厂函数可以直接调用
- 创建应用实例对象 -- app
- createApp('app').mount() 挂载

2. 挂载

3. 不支持以前2.0版本的写法

### App.vue

1. 组件中的模版结构可以没有根标签，也就是说template标签里可以不需要根标签

```vue
<!-- vue2.0 -->
<template>
	<div>
        <p>hello vue</p>
        <HelloWorld />
    </div>
</template>
<!-- vue3.0 -->
<template>
    <p>hello vue</p>
    <HelloWorld />
</template>
```

## Composition API  组合式API

### setup 函数

1. Vue3.0 里面的全新的配置项。

2. Composition API 都写到 setUp函数里边，是所有Composition API的一个舞台。

3. 组件中所有用到的： 数据，方法等等配置均在setup中。

4. setup 函数两种返回值：

- 返回对象：则对象中的属性，方法，在模版中可以直接去使用。 (重点关注)

```vue
<template>
  <h1>我是App组件</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <button @click="seyHello">欢迎</button>
</template>
<script>
export default {
  name: "App",
  setup() {
    // 数据
    let name = "Taxpolat";
    let age = 24;
    // 方法
    function seyHello() {
      alert(`我叫${name}, 今年${age}岁了`);
    }
    return {
      name,
      age,
      seyHello,
    };
  },
};
</script>
```

- 返回渲染函数：则可以自定义渲染内容了（了解， 可能不太常用）

```vue
<template>
  <h1>我是App组件</h1>
</template>
<script>
import { h } from "vue";
export default {
  name: "App",
  setup() {
    return () => h("h1", "Taxpolat");
  },
};
</script>
```

5. 尽量不要和Vue2.x的配置混合使用
   - vue2配置中可以访问到setup中的属性，方法。
   - 但是在setup中不能访问到vue2配置的属性，方法。
   - 如果混用，有出现重名，setup 优先。
6. setup不能是一个async函数，使用了async,返回值不再是return的对象，而是promise，因此模板中完全用不了setup里的内容。

### ref函数

定义一个响应式的数据, 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference对象)</strong>

```js
const xxx = ref(initValue)
```



### vue2中的 ref：

1. 是标签的属性，起到一个  跟ID一样的一个属性，可以给我们的找出使用reff的所有的表情，

### vue3中的 ref：

1. setup直接定义的数据是非响应式数据，想要把非响应式数据高程响应式数据，那必须得调用vue3 的 ref函数
2. setup的数据调用rref函数时 ，数据会变成ref引用对象。
3. JS中操作数据`xxx.value`才能去操作
4.  ter` 和 `setter` 是通过 `Object.defineProperty()` 来实现的
5. `ref函数接收的数据类型` : 
   - 基本数据类型走的是 getter 和 setter `数据劫持的方式`进行响应式处理 
   - 对象类型的数据 走的是 `ES6 的 proxy`，<strong style="color:#DD5145">reactive函数</strong>

###  Reactive函数

定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据(基本类型不要用它， 基本类型使用<strong style="color:#DD5145">Ref函数</strong>），内部是基于<strong style="color:#DD5145">ES6的proxy</strong>

```js
const dailiduixaing = reactive(yuanduixiang)
```

接收一个对象（或者数组），返回一个<strong style="color:#DD5145">代理对象（proxy的实例对象， 简称proxy对象）</strong>

```vue
<template>
  <h1>我是App组件</h1>
  <h3>家乡：{{ home.province }}</h3>
  <h3>籍贯：{{ home.region }}</h3>
 <h3>名字：{{ home.family.father.son }}</h3>
  <button @click="changeINfo">b修改个人信息</button>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "App",
  setup() {
    // 数据
    let home = reactive({
      province: "新疆",
      region: "喀什",
      family: {
            father: {
              son: "adil",
            },
       },
    });
     let hobby =reactive(['打球', '看电影', '打游戏'])   // 创建一个响应式数组
     // 方法
    function changeINfo() {
      home.province = "上海";
      home.region = "徐汇";
      home.family.father.son  = '徐'  // 数据修改成功并且能够在页面刷新相应的更新过后的数据。
      hobby[1]="看动作电影"  // vue3中可以通过下标修改值，vue3能监听到，页面也够得到相应的数据， vue2 是不行的
    }
    // 返回一个对象
    return {
      home,
      changeINfo,
    };
  },
};
// Reactive定义的响应式数据是深层次的，不管有 多少层数据，有变化，vue3就能监听的到。    
</script>
```

## Vue3 响应式原理

### Vue2响应式原理

实现原理：

1. 对象类型：通过`Object.definePropperty()`对属性的读取，修改进行拦截
2. 数组类型：通过重写更新数组的一系列方法是来实现拦截
3. Vue2 $set 对象里面新增属性  $delete 删除对象属性

存在问题：

1. 对象新增属性，删除属性，界面不会更新除非使用特殊的API
2. 直接通过下表修改数组 ，界面不会更新。也需要使用特殊的API才能解决

### Vue3响应式原理

使用<strong style="color:#DD5145">ES6 的proxy</strong>：

```javascript
let person ={
    name:'张三',
    age:18
}

// proxy 代理
// Reflect 反射
const p = new proxy(person, {
    // 读 读取某个属性时调用
    get(target,propName) {
        return  Reflect.get(targer, propName)
    },
    // 改或追加某个属性时调用
    set(target,propName,value) {
        Reflect.set(targer, propName)
    },
     // 删除某个属性时调用
    deleteProperty(target,propName) {
    	return  Reflect.deleteProperty(targer, propName)
    }
})
```

1. 通过`Proxy（代理）`:拦截对象中任意的属性的变化，包括属性点的增删改查。
2. 通过`Reflect(反射)`： 对被代理的属性进行操作。

## reactive和ref函数的对比

1. 从定义角度对比：
   - ref用来定义<strong style="color:#DD5145">基本数据类型</strong>的响应式数据
   - reactive用来定义<strong style="color:#DD5145">对象或数组类型</strong>的响应式数据类型
   - ref 可以定义对象类型的数据，但vue3在内部自动通过`reactive`转化为代理对象
2. 原理角度：
   - ref通过`Object.defineProperty()`的get与set来实现数据响应式（数据劫持的方式）
   - Reactive 通过`Proxy（代理）`:拦截对象中任意的属性的变化， 通过`Reflect(反射)`： 对被代理的属性进行操作
3. 使用角度
   - ref定义的响应式数据，当操作数据是需要添加`.value`,模版中读取数据时不需要.value
   - reactive定义的响应式数据，操作和读取都不需要`.value`