---
title: 【JavaScript】事件循环
date: 2021-09-6
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - JavaScript
 - 面试
---
## 事件循环（Event Loop）
::: tip
__javaScript的代码是基于一种事件循环的机制__   
:::
有两类事件循环：
- 针对浏览上下文（browsing context）
- 种针对worker（web worker）
::: tip
一个事件循环有一个或者多个`任务队列（task queues）`   
`任务队列`是`task的有序列表`    
每一个任务队列里的任务是严格按照先进先出的顺序执行的，但是不同任务队列的任务的执行顺序是不确定的
:::
每一个任务都来自一个特定的`任务源（task source）`。所有来自一个特定任务源并且属于特定事件循环的任务，通常必须被加入到同一个任务队列中，但是来自不同任务源的任务可能会放在不同的任务队列中。
### Event Loop 过程
完整的 Event Loop 过程:
1. 初始状态：micro 队列空，macro 队列里有且只有一个 script 脚本（整体代码为宏任务）；
2. 执行script代码，创建的宏任务推到宏任务调用栈中，创建的微任务推到微任务调用栈中；【宏任务阶段】
3. 执行微任务，调出当前微任务栈的所有微任务，一次执行，其中如果有宏任务推到宏任务栈中【微任务阶段】
4. 执行宏任务，调出当前宏任务栈中的第一个宏任务，其中创建的微任务推到微任务栈中【宏任务阶段】
5. 如果代码未结束，循环执行3,4步骤。
### 总结部分
::: danger
从上我们可以总结两个规律
1. __宏任务和微任务阶段是轮番交替进行的__
2. __每个宏任务阶段只执行当前宏任务栈中的第一个任务，执行完就切换到微任务阶段，而微任务阶段却是要执行当前微任务栈的所有微任务，微任务阶段才结束__
:::
### 异步队列
js事件循环中的异步队列有两种：
- macro（宏任务）队列
- micro（微任务）队列
macro（宏任务）队列:
- setTimeout
- setInterval
- setImmediate
- script（整体代码）
-  I/O 操作
-  UI 渲染
micro（微任务）队列:
- process.nextTick
- Promise
- MutationObserver   
`以上这些只是一些常用的例子`

### 问题1：判断时间循序
面试的时候，面试事件循环相关的问题必问一下的一道题：
以下代码的输出循序是：

``` js
setTimeout(function () {
  console.log("1");
}, 0);
async function async1() {
  console.log("2");
  const data = await async2();
  console.log("3");
  return data;
}
async function async2() {
  return new Promise((resolve) => {
    console.log("4");
    resolve("async2的结果");
  }).then((data) => {
    console.log("5");
    return data;
  });
}
async1().then((data) => {
  console.log("6");
  console.log(data);
});
new Promise(function (resolve) {
  console.log("7");
  resolve()
}).then(function () {
  console.log("8");
});
```

::: tip
答案：2 4 7 5 8 3 6 async2的结果 1
:::
解释：
1. setTimeout
- setTimeout()方法设置的是一次性定时器，是仅在指定的延迟时间之后触发一次。   
- setTimeout(fn, delay) 是在 delay 后将 fn 推入任务队列，等主进程执行完执行栈中的代码以后再执行执行任务队列里的回调   
上述代码中，遇到的第一个`setTimeout`作用是0ms后将回调函数放入task队列中, 也就是说这个函数将在下一个事件循环中执行, 因此`"1"`最后一个打印出来。
2. 因为遇到`setTimeout`，因此`setTimeout`里面的函数第一次事件循环中不去调用，因此输出`async1`函数里面`"2"`
3. 在`async1()`调用了`async2()`, `"4"`不在`resolve()`,因此直接输出`"4"`,当前输出结果为：`2 4`。
4. 根据[总结部分](#总结部分),当遇到`setTimeout`时，宏任务已经结束，切换到微任务阶段，而微任务要执行当前任务栈所有的微任务，微任务才算结束。又是异步，因此调用了`Promise`，输出`7`,当前输出结果为 `2 4 7`
5. `async1` 里调用了`async2` ,`async1` 在调用的时候遇到 `await async2` 就把`async2`推到任务栈， 然后往下才遇到`new Promise`才把这个推进去,因此可以说`async2`里的promise调用的比`new Promise`早，所以，当前输出结果为 `2 4 7 5 8 3`
6. `async1`调用 `await async2`,`async2`已经调用then()方法,因此当前的输出结果为`2 4 7 5 8 3`
7. 调用`async1().then`的回调函数里有调用`console.log("6");console.log(data);`一起调用，`async1`调用`async2`返回一个promise，`resolve()`结果为`"async2的结果"`，因此`6`和`async2的结果`前后输出，是在一起的。 因此输出结果为`2 4 7 5 8 3 6 async2的结果`
8. 再次事件循环中执行， 输出结果为`2 4 7 5 8 3 6 async2的结果 1`

### 问题2:  运行结果
```js
console.log('script start');
setTimeout(() => {
  console.log('北歌');
}, 1 * 2000);

Promise.resolve()
.then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
async function foo() {
  await bar()
  console.log('async1 end')
}
foo()
async function errorFunc () {
  try {
    await Promise.reject('error!!!')
  } catch(e) {
    console.log(e)
  }
  console.log('async1');
  return Promise.resolve('async1 success')
}
errorFunc().then(res => console.log(res))
function bar() {
  console.log('async2 end') 
}
console.log('script end');
```

解释代码：
``` js
// => 代码一执行就开始执行了一个宏任务-宏0
console.log('script start'); 

setTimeout(() => { // 宏 1
  console.log('北歌');
}, 1 * 2000);

Promise.resolve()
    .then(function() { // 微1-1
      console.log('promise1');
    })
    .then(function() { 
      // 微1-4 => 这个then中的会等待上一个then执行完成之后得到其状态才会向Queue注册状态对应的回调，
      // 假设上一个then中主动抛错且没有捕获，那就注册的是这个then中的第二个回调了。
      console.log('promise2'); 
    });


async function foo() {
  await bar() // => await(promise的语法糖)，会异步等待获取其返回值
  // => 后面的代码可以理解为放到异步队列微任务中。 这里可以保留疑问后面会详细说
  console.log('async1 end') // 微1-2
}
foo()

function bar() {
  console.log('async2 end') 
}

async function errorFunc () {
  try {
    await Promise.reject('error!!!')
  } catch(e) {
      // => 从这后面开始所有的代码可以理解为放到异步队列微任务中
    console.log(e)  // 微1-3
  }
  console.log('async1');
  return Promise.resolve('async1 success')
}
errorFunc().then(res => console.log(res)) // 微1-5

console.log('script end');
```

输出结果：
1. `script start`，第一个输出，毫无疑问。
2. `foo()`,先调用`bar()`因此 `script start, async2 end, script end`,第一次轮询结束。
3. 第二次轮询，开始执行异步任务中的微任务因此调用`Promise`,输出结果为：`script start, async2 end, script end, promise1, async1 end, error!!!, async1, promise2,`
4. `errorFunc().then`中`Promise.resolve`刚刚注册成了`'async1 success'`,因此， 输出结果为：`script start, async2 end, script end, promise1, async1 end, error!!!, async1, promise2, async1 success`
5. 最后： `script start, async2 end, script end, promise1, async1 end, error!!!, async1, promise2, async1 success, 北歌 `

::: tip
输出结果为： `script start, async2 end, script end, promise1, async1 end, error!!!, async1, promise2, async1 success, 北歌 `
:::

