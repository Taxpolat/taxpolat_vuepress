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

1. 是标签的属性，起到一个  跟ID一样的一个属性，可以给我们的找出使用ref的所有的表情，

### vue3中的 ref：

1. setup直接定义的数据是非响应式数据，想要把非响应式数据高程响应式数据，那必须得调用vue3 的 ref函数
2. setup的数据调用ref函数时 ，数据会变成ref引用对象。
3. JS中操作数据`xxx.value`才能去操作
4.  getter` 和 `setter` 是通过 `Object.defineProperty()` 来实现的
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


## 什么是组合式API
:::tip
__composition API(Vue3)__ —— 特点是特定功能相关的所有东西都放到一起维护，比如功能A相关的响应式数据，
操作数据的方法等放到一起，这样不管应用多大，都可以快读定位到某个功能的所有相关代码，
维护方便设置，如果功能复杂，代码量大，我们还可以进行逻辑拆分处理。
:::
### setup
1. 新的 `setup` 选项在组件创建之前执行，一旦 `props` 被解析，就将作为`组合式 API` 的入口
2.  `setUp函数`，是所有`Composition API的一个舞台`。
3. 组件中所用到的数据，方法，生命周期，计算属性，监视属性等等，均配置在`setup`函数中。
4. setup函数的两种返回值：
  - <strong style="color:#DD5145">返回一个对象，则返回的数据，方法等属性均可以在模版中直接使用 </strong>
  ```vue
  <template>
    <h1>
      一个人的信息：
      <li>名字：{{ name }}</li>
      <li>年龄：{{ age }}</li>
      <button @click="sayHello">点击</button>
    </h1>
  </template>
  <script>
    export default {
      name: "App",
      setup() {
        let name = "Taxpolat";
        let age = 25;
        function sayHello() {
          alert(`你好！，我是${name},今年${age}岁了`);
        }
        return {
          name,
          age,
          sayHello,
        };
      },
    };
  </script>
  ```
  - 返回一个渲染函数:<strong style="color:#DD5145">只会渲染setup返回的渲染函数里面的内容，不会渲染模板里写的内容。</strong>
  ```vue
  <template>
    <h1>
      一个人的信息：
      <li>名字：{{ name }}</li>
      <li>年龄：{{ age }}</li>
      <button @click="sayHello">点击</button>
    </h1>
  </template>
  <script>
    import { h } from "vue";
    export default {
      name: "App",
      setup() {
        return () => h("h1", "hello vue3");
      },
    };
  </script>
  ```
5. 注意点：
   1. 尽量不要和Vue2.x的配置混用
    
      1. <strong style="color:#DD5145">Vue2的配置中可以访问到Vue3中的setup中的属性，方法等内容</strong>
      2. <strong style="color:#DD5145">但是在Vue3的setup中访问不到Vue2的配置内容。</strong>
      3. <strong style="color:#DD5145">如果Vue2和Vue3混合使用时变量有重名，Vue3 setup 优先</strong>
:::warning
在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。`setup` 的调用发生在 `data property`、`computed property` 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取。
:::

<!-- `setup` 选项是个接受props和context的函数 -->
## 响应式变量

### ref
__ref 创建一个包含响应式数据的引用对象， 函数使任何响应式变量在任何地方起作用,__
```js
import { ref } from 'vue'

const counter = ref(0)
```
1. setup直接定义的数据是非响应式数据，想要把非响应式数据改成响应式数据，那必须得调用vue3 的 ref函数
2. setup的数据调用ref函数时 ，数据会变成ref引用对象。
3. JS中操作数据`xxx.value`才能去操作
4.  getter` 和 `setter` 是通过 `Object.defineProperty()` 来实现的
5. `ref函数接收的数据类型` : 
   - 基本数据类型走的是 getter 和 setter `数据劫持的方式`进行响应式处理 
   - 对象类型的数据 走的是 `ES6 的 proxy`，<strong style="color:#DD5145">reactive函数</strong>
#### ref的响应式数据使用
```vue
<template>
  <h1>
    一个人的信息：
    <li>名字：{{ name }}</li>
    <li>年龄：{{ age }}</li>
    <button @click="changeInfo">修改</button>
  </h1>
</template>
<script>
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    let name = ref("Taxpolat");
    let age = ref(25);
    function changeInfo() {
      name.value = "vue3";
      age.value = 26;
    }
    return {
      name,
      age,
      changeInfo,
    };
  },
};
</script>
   
```

###  Reactive函数
```js
import { reactive } from "vue";

const dailiduixaing = reactive(yuanduixiang)
```
1. 定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据(基本类型不要用它， 基本类型使用<strong style="color:#DD5145">Ref函数</strong>）
2. 内部是基于<strong style="color:#DD5145">ES6的proxy</strong>，接收一个对象（或者数组），返回一个<strong style="color:#DD5145">代理对象（proxy的实例对象， 简称proxy对象）</strong>
3. 处理对象类型的数据时是<strong style="color:#DD5145">深层次的</strong>
4. <strong style="color:#DD5145">能处理数组类型的数据</strong>

```vue
<template>
  <h1>
    一个人的信息：
    <li>名字：{{ name }}</li>
    <li>年龄：{{ age }}</li>
    <li>工作：{{ job.type }}</li>
    <li>使用语言：{{ job.lang }}</li>
    <button @click="changeInfo">修改</button>
  </h1>
</template>
<script >
import { ref, reactive } from "vue";
export default {
  name: "App",
  setup() {
    let name = ref("Taxpolat");
    let age = ref(25);
    let job = reactive({
      type: "开发者",
      lang: "Javascript",
    });
    function changeInfo() {
      name.value = "vue3";
      age.value = 26;
      job.type = "前端开发";
      job.lang = "vue";
    }
    return {
      name,
      age,
      job,
      changeInfo,
    };
  },
};
</script>
   
```

### reactive和ref函数的对比

|          |                                                                        ref                                                                         |                                                reactive                                                 |
| :------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| 定义角度 | 1. 用来定义<strong style="color:#DD5145">基本数据类型</strong>的响应式数据。2.可以定义对象类型的数据，但vue3在内部自动通过`reactive`转化为代理对象 | 1.定义<strong style="color:#DD5145">对象或数组类型</strong>的响应式数据类型。2.不可以定义基本类型的数据 |
| 原理角度 |                                       `Object.defineProperty()`的get与set来实现数据响应式（数据劫持的方式）                                        |      通过`Proxy（代理）`:拦截对象中任意的属性的变化， 通过`Reflect(反射)`： 对被代理的属性进行操作      |
| 使用角度 |                                             当操作数据是需要添加`.value`,模版中读取数据时不需要.value                                              |                                       操作和读取都不需要`.value`                                        |

### setup关键点
1. setup执行时机
    - 在生命周期`beforeCreated`之前执行一次，this是undefined。
    :::warning
    beforeCreated:第一个声明周期，无法通过vm访问到data中的数据,methods中的方法   
    __意思就是`setup`的执行时机比`beforeCreated`都要早！！！__
    :::
    
2. setup的参数
    - 能够接受两个参数 <strong style="color:#DD5145">props，context</strong>
    - props:父组件传给 子组件的数据，外面传了要注册接受，外面可以不传里面已经注册的参数。已经注册的参数取值为undefined。
    - context：上下文对象， 内容中主要关注：`attrs`，`slots`, `emit` 这三个内容。
      - attrs：相当于vue2中的`$attrs`， props传进来的参数，如果组件中没有注册这个`props` ，那就会存`context.attrs`
      - emit：组件内触发自定义事件，同vue2的`$emit`，但是Vue3中需要用`emits`属性去注册要触发的事件,可以用但是会有Vue警告。

### Computed计算属性
- 跟Vue2里的Computed计算属性一样
```vue
<template>
  <h1>一个人的信息</h1>
  姓： <input type="text" v-model="person.fileName" />
  <br />
  <br />

  名：<input type="text" v-model="person.lastName" />
  <div>
    {{ person.fullName }}
  </div>
</template>

<script>
import { reactive, computed } from "vue";
export default {
  name: "Computed",
  setup() {
    let person = reactive({
      fileName: "张",
      lastName: "三",
    });
    // 简写： 计算属性没有被修改的情况
    // person.fullName = computed(() => person.fileName + "-" + person.lastName);
    // 完整写法
    person.fullName = computed({
      get() {
        return person.fileName + "-" + person.lastName;
      },
      set(value) {
        const name = value.split("-");
        person.fileName = name[0];
        person.lastName = name[1];
      },
    });
    return {
      person,
    };
  },
};
</script>

```

###  Watch监视函数
- 与Vue2的`watch`一致
- 坑点：
  1. 监视reactive定义的响应式数据时：oldValue无法正确获取，强制开启了深度监视（deep配置无效）。
  2. 监视reactive定义的响应式数中某一个属性时：deep有效
  3. 监视ref函数定义的<strong style="color:#DD5145">基本类型的响应式数据</strong>时不用`.value`
  4. 监视ref函数定义的 <strong style="color:#DD5145">对象类型的响应式数据</strong>时需要`.value`，也需要`deep:true(深度监视)`

`watch`写法分一下几种：
```vue
<template>
  <h2>信息：{{ computedInformationFull }}</h2>
</template>
<script>
import { reactive,computed } from "vue";
export default {
  setup() {
    // 情况一 监视ref所定义的一个响应式数据
    // immediate 属性是有效的
    let sum1 = ref(0);
    watch(
      sum1,
      (newValue, oldValue) => {
        console.log(newValue, oldValue);
      },
      { immediate: true }
    );
    //情况二  监视ref所定义的多个响应式数据
    // 监视ref定义的响应式数据，不需要设置deep 不奏效
    let sum = ref(0);
    let msg = ref("hello");
    watch(
      [sum, msg],
      (newValue, oldValue) => {
        console.log(newValue, oldValue);
      },
      { immediate: true }
    );
    // 数据
    let person = reactive({
      name: "Taxpolat",
      age: 24,
      job: {
        j1: {
          salary: 15,
        },
      },
    });
    // 情况三  监视reactive所定义的一个响应式数据的全部属性
    // 1. 次情况无法正确获取oldValue
    // 2.次情况强制开启了深度监视（deep配置无效）
    watch(person, (newValue, oldValue) => {
      console.log("person变化了", newValue, oldValue);
    });
    // 情况四  监视reactive所定义的一个响应式数据的某一个属性
    watch(
      () => person.age,
      (newValue, oldValue) => {
        console.log("person.age", newValue, oldValue);
      }
    );
    // 情况五： 监视reactive所定义的一个响应式数据的多个属性
    watch([() => person.age, () => person.name], (newValue, oldValue) => {
      console.log("person.age", newValue, oldValue);
    });
    // 特殊情况：
    watch(
      () => person.job,
      (newValue, oldValue) => {
        console.log("person.job", newValue, oldValue);
      },
      {
        deep: true,
      }
    );
    // 返回一个对象
    return {
      sum1,
      sum,
      msg,
      person,
    };
  },
};
</script>
```
### watchEffect函数
- 立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数,即`看回调函数里面用到了哪个数据`，并依赖改数据重新运行函数。
- <strong style="color:#DD5145">不用指明监视的属性，监视的回调中用到哪个属性，那就监视哪个属性</strong>
- watchEffect默认打开了`immediate`选项
- 可以追踪多层次的对象
- 当 `watchEffect` 在组件的 `setup() `函数或生命周期钩子被调用时，侦听器会被链接到该组件的`生命周期`，并在组件`卸载`时自动停止。
- 功能有点类似`computed函数`：
  - `computed函数`比较注重计算出来的值（回调函数的返回值），必须要写返回值。
  - `watchEffect函数`更注重的是过程（回调函数的实体），不用写返回值。

```vue
<template>
  {{ count }}
</template>

<script >
import { ref, watchEffect } from "vue";
export default {
  setup() {
    const count = ref(10);
    watchEffect(() => console.log(count.value, "----watchEffect-"));
    setTimeout(() => {
      count.value++;
    }, 1000);
    return {
      count,
    };
  },
};
</script>
```

### 生命周期
- Vue3中可以继续使用Vue2中的生命周期钩子函数，但有两个被更名：
  - `beforeDestroy`更名为：`beforeUnmount`
  - `destroyed`更名为: `unmounted`
- Vue3提供了Composition API形式的生命周期钩子函数，即可以直接写到`setup`中：  
  
|    选项式 API     | Hook inside `setup` |
| :---------------: | :-----------------: |
|  `beforeCreate`   |     Not needed*     |
|     `created`     |     Not needed*     |
|   `beforeMount`   |   `onBeforeMount`   |
|     `mounted`     |     `onMounted`     |
|  `beforeUpdate`   |  `onBeforeUpdate`   |
|     `updated`     |     `onUpdated`     |
|  `beforeUnmount`  |  `onBeforeUnmount`  |
|    `unmounted`    |    `onUnmounted`    |
|  `errorCaptured`  |  `onErrorCaptured`  |
|  `renderTracked`  |  `onRenderTracked`  |
| `renderTriggered` | `onRenderTriggered` |
|    `activated`    |    `onActivated`    |
|   `deactivated`   |   `onDeactivated`   |

:::tip
因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，<strong style="color:#DD5145">在这些钩子中编写的任何代码都应该直接在 setup 函数中编写。</strong>
:::

### 自定义hook函数
:::tip
- 本质是个函数，把setup函数中使用的Composition API进行了封装去复用。
- 优势在于：复用代码，让setup中的逻辑更清楚易懂
:::
### unRef
__如果参数是一个 ref，则返回内部值，否则返回参数本身, 这是 `val = isRef(val) ? val.value : val `的语法糖函数。__
```js
const info = ref({name :'名字',info:{age:18,height:1111,}})
const infos = {name :'名字',info:{age:18,height:1111, }}

console.log(unref(info)) // Proxy {name: '名字', info: {…}}
console.log(unref(infos))//       {name: '名字', info: {…}}
```
### toRef
::: tip
- 定义： 将`响应式对象`转换为`普通对象`，其中结果对象的每个 `property` 都是指向原始对象相应 `property` 的 `ref`
- 作用:创建一个`ref对象`， 其value指向另一个对象中的某个属性
- 语法： 
```js
const name  = toRef(person,'name')
```
- 应用：要讲响应式对象中的某一个属性单独提供给外部使用时。
- 扩展：`toRefs`与`toRef`功能一直，但是可以批量创建多个ref对象，语法：`toRefs(person)`
:::
```js
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```
__例子:__
```vue
<template>
  <h1>姓名:{{ name }}</h1>
  <h1>年龄:{{ age }}</h1>
  <h1>薪资:{{ salary }}</h1>
  <button @click="person.name += '!'">修改名字</button>
  <button @click="person.age++">修改年龄</button>
  <button @click="person.job.j1.salary += 10">涨薪</button>
</template>

<script>
import { reactive, toRef } from "vue";
export default {
  setup() {
    let person = reactive({
      name: "张三",
      age: 24,
      job: {
        j1: {
          salary: 30,
        },
      },
    });
    return {
      person,
      name: toRef(person, "name"),
      age: toRef(person, "age"),
      salary: toRef(person.job.j1, "salary"),
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
```

### toRefs
__可以用来为源响应式对象上的某个 `property` 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 `property 的响应式连接`。__
```js
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```
__例子：__

```vue
<template>
  <h1>姓名:{{ name }}</h1>
  <h1>年龄:{{ age }}</h1>
  <h1>薪资:{{ job.j1.salary }}</h1>
  <button @click="name += '!'">修改名字</button>
  <button @click="age++">修改年龄</button>
  <button @click="job.j1.salary += 10">涨薪</button>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    let person = reactive({
      name: "张三",
      age: 24,
      job: {
        j1: {
          salary: 30,
        },
      },
    });
    return {
      ...toRefs(person),
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
```
#### ref, toRef和toRefs的对比
-  `ref` 本质是拷贝，修改响应式数据不会影响原始数据；`toRef`的本质是引用关系，修改响应式数据会影响原始数据
- `toRef`对定义的响应对象的某个属性进行引用
- `toRefs`对定义的响应对象的全部属性进行引用
- `ref`数据发生改变，界面会自动更新,修改通过`toRef`创建的响应式数据，并不会触发UI界面的更新。
- `toRef`传参与`ref`不同；`toRef`接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性
- `toRefs`接收一个对象作为参数,它会遍历对象身上的所有属性，然后挨个调用`toRef`执行


### customRef
__创建一个自定义的 `ref`，并对其依赖项跟踪和更新触发进行显式控制。它需要一个工厂函数，该函数接收 `track` 和 `trigger` 函数作为参数，并且应该返回一个带有 `get` 和 `set` 的对象。__
基本代码：
```js
function useDebouncedRef(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value;
      },
      set(newValue) {
        trigger()
        value = newValue
      }
    }
  });
}
```
- 当读取自定义的 `ref`时，会走`get`方法里面的逻辑内容
- 当修改自定义的 `ref`时，会走`set`方法里面的逻辑内容
- `track`：数据追踪
- `trigger`作用是通知Vue去重新解析模版
使用自定义 ref 通过 v-model 实现 debounce 的示例：
```vue
<template>
  <div>
    <el-input v-model="text" placeholder="Please input" />
    {{ text }}
  </div>
</template>

<script>
import { customRef } from "vue";
function useDebouncedRef(value, delay = 2000) {
  let timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}

export default {
  setup() {
    return {
      text: useDebouncedRef(""),
    };
  },
};
</script>

<style scoped>
</style>
```
### Provide / Inject
- 实现祖孙组件通信
- 用法： 父组件有个`Provide`选项来提供数据，子组件有一个`Inject`选项来接受并使用这些数据
- 如果`Provide`接受提供的数据是响应式的，`Inject`接受的数据也是响应式的
```vue
// 祖组件提供数据
<script>

import { reactive,provide } from "vue";
export default {
  setup() {
    let car = reactive({
      name:'宝马',
      price:'50w'
    })
    provide('car',car)
    return {
      car
    };
  },
};
</script>

//孙组件接受数据
<script>
import { inject } from "vue";
export default {
  setup() {
    let car = inject('car')
    return {
      car
    };
  },
};
</script>
```

### 响应式数据的判断
|     名称     |                           作用                           |
| :----------: | :------------------------------------------------------: |
|   `isRef`    |               检查值是否为一个 `ref` 对象                |
| `isReactive` |      检查对象是否是由 `reactive` 创建的响应式代理。      |
| `isReadonly` |        检查对象是否是由 `readonly` 创建的只读代理        |
|  `isProxy`   | 检查对象是否是由 `reactive` 或 `readonly` 创建的 `proxy` |

