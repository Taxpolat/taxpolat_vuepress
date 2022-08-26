---
title: 【React】React基础
date: 2022-06-14
sidebar: 'auto'
author: 'Taxpolat'
categories:
 - React
tags:
 - React
---

## 1. React 与传统MVC的关系

`React`不是一个完整的MVC框架，最多可以认为是MVC中的V（view层），甚至React并不非常认可`MVC开发模式`。   
`React`构建页面UI的库。可以简单的理解为，`React`将界面分成了各个独立的小块，每一个块就是一个组件，这些组件之间可以组合，嵌套，就成了我们见到的页面   

## 2. React特性
1. 声明式设计
2. 高效: `React`通过对DOM的模拟（`虚拟DOM`）,最大限度的减少与DOM的交互
3. 灵活：`React`可以与已知的库或者框架很好的配合
4. JSX：JSX是`JavaScript`的语法扩展
5. 组件化： 通过`React组件`，代码可以更加容易得到复用，
6. 单向数据流：`React`实现了单向响应的数据流，从而减少了重复代码，比传统数据绑定简单。
   
## 3. 虚拟DOM

`React`把真实DOM树转换成`JavaScript`对象树，也就是`Virtual DOM`。

### DOM简介

- __浏览器在解析HTML文档时，会将每个标签元素抽象成`DOM（DocumentObjectModel，文档对象模型）` 的节点，按照标签元素层次分明的结构，将HTML文档构建成一棵DOM树__
- __浏览器按从上到下，从左到右的顺序，读取DOM树的文档节点，顺序存放到文档流。如果读取的节点是另一节点的子节点，将其按顺序存放在父节点的内部，且嵌套层级没有数量限制。__
- __DOM定义了所有HTML元素的对象和属性，以及访问方法。通过DOM提供的方法，所有HTML元素（DOM树节点）均可被修改、创建或删除__
### 虚拟DOM概念

`虚拟DOM（Virtual DOM）`是在真实DOM树的基础上建立了一个抽象层，通过一个JavaScript对象表示真实DOM树结构，包括DOM树节点的标签名、属性、事件监听及子元素等。因此，<font color="#dd0000">__虚拟DOM本质上是一个JS对象__</font>

#### 1. React创建虚拟DOM

__React.createElement(tag,attrs,...children)__ 第一参数是标签名，第二参数是属性对象，后面的参数是0到多个子节点。该方法负责根据源代码提供的组件属性信息生成虚拟DOM，然后通过 __ReactDOM.render()__ 方法将创建的虚拟DOM转化为真实DOM。

#### 2.JSX语法创建虚拟DOM

__`React`使用`JSX语法`编写虚拟DOM对象__ ，经过babel编译后会解析生成目标代码，其中包括组件的type（标签名）、key（主键）、ref以及props等属性，其中props包含className、style和children等信息，然后通过
<font color="#dd0000"> __ReactDOM.render()__ </font> 方法将虚拟DOM映射到真实DOM上。   

### 虚拟DOM的意义

1. __React引入轻量级的虚拟DOM而不是直接对真实DOM进行操作， 目的是为了实现对DOM树节点数据和状态所做的任何改动，都会被自动且高效的同步到虚拟DOM，通过与变更前的DOM树进行比较，统计出所有的差异，统一更新一次真实DOM树。__
2. __React虚拟DOM在组件状态发生变化时，构造新的虚拟DOM树并依赖算法计算出与上一个虚拟DOM树的差异，只针对变化的部分执行原生DOM操作。相较于原生DOM每次数据发生改变就去创建一个真实DOM，经过比较去修改真实DOM的操作，React虚拟DOM将多次操作合并为一次操作，提高了渲染效率。为了计算出虚拟DOM差异，React Diff算法被提出。__

## 4. JSX
__JSX__ 一种特殊的 js 语法糖, 是一个 JavaScript 的语法扩展，将HTML语法直接加入到JavaScript代码中，在通过翻译器 __（Babel JSX编译器）__ 转换到纯JavaScript后由浏览器执行。   
### 1.不加任何引号
以前在 js 中使用 html 标签都是加上引号当成字符串使用，而在 jsx 语法中不用加引号，直接当对象使用。   

``` js
var html = <h1>React</h1>;
```
### 2. 标签一定要有对应的结束标标签或结束标识
有时候我们在写 html 结构的时候，都没有把对应的结束标识加上，但浏览器能正常解析，但在 jsx 语法当中，则要强制写标准的html结构。
```js
<input type="text" value="React"> // 这一段html标签在浏览器是能正常解析
var html = <input type="text" value="React">; // 这一段在 jsx 语法当中则会报错
// jsx 正确写法应该是这样的
var html = <input type="text" value="React" />;
var div = <div>React</div>;
```
### 3. 只能有一个根节点
在 jsx 语法当中，最顶层的结构一定只有一个节点，不能出现兄弟节点。
```js
var html = 
    <div>
        <h1>Tom</h1>
        <h1>Lucy</h2>
    </div>
```
### 4. jsx 语法允许 html 标签和 javascript 代码混写
在 jsx 语法当中，要在 html 标签中用到 js 代码，则用花括号（{expression}）括起来，注意只有一个大括号{react}。相对于 Vue，Vue 是用两个大括号{{vue}}来渲染数据的，
<font color="#dd0000" size="4"> __React 是单向数据绑定的，Vue 是双向数据绑定的__ </font>
```js
var name = "React";
var style = {fontSize: '12px', color: 'red'};
var html = <span style={style}>{name}</span>;
```
<font color="#dd0000" size="4"> __粗暴的理解：__ </font>   
:::tip   
__JSX = JS + HTML__   
:::   

## 5. React组件
:::tip
__组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。__
- 组件使你可以将 UI 划分为一个一个独立，可复用的小部件，并可以对每个部件进行单独的设计。
- 在单页面应用(SPA)中扮演着重要角色，有以下优点分治，方便管理，减少耦合，复用，提高效率和性能
:::
<font color="#dd0000" size="4"> __React组件可分为：__ </font>   
- 函数组件
- class组件   

### 组件简单实现 —— 函数式组件
一个函数就是一个组件，return一份DOM解构。   
创建一个函数组件：

```js
const Hello = (props) => {
    return <div>{props.name}</div>
}
// 或者这样写
const Hello = props => <div>{props.name}</div>
// 常用自写法
function Hello(props){
    return <div>{props.name}</div>
}

// 组合组件
function App() {
  return (
    <div>
      <Hello name="Sara" />
      <Hello name="Cahal" />
      <Hello name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

函数式组件特点：
1. 没有生命周期，也会被更新并挂载，但是没有生命周期函数 （通过Effect Hook解决）
2. 没有this(组件实例）
3. 没有内部状态（state） （通过State Hook解决）   
   

优点 ：
__轻量，如果你的组件没有涉及到内部状态，只是用来渲染数据，那么就用函数式组件，性能较好。__

###  类组件
通常情况下，我们会使用ES6的class关键字来创建React组件。
类组件分为 __普通类组件（React.Component）__ 以及 __纯类组件（React.PureComponent）__ 

<font color="#000" size="3"> __1. 普通类组件（React.Component）__ </font>   

```js
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

<font color="#000" size="3"> __2. 纯类组件（React.PureComponent）__  </font>   

```js
class Welcome extends React.PureComponent {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```
<font color="#000" size="3"> __3.React.Component和React.PureComponent区别__ </font>

先了解下React生命周期函数<font color="#dd0000">shouldComponentUpdate</font>，这个函数返回一个布尔值，如果返回true，
那么当props或state改变的时候进行更新；如果返回false，当props或state改变的时候不更新，默认返回true。
这里的更新不更新，其实说的是执不执行render函数，如果不执行render函数，那该组件和其子组件都不会重新渲染。

- 继承PureComponent时，不能再重写<font color="#dd0000">shouldComponentUpdate</font>
- React.PureComponent基于shouldComponentUpdate做了一些优化，通过prop和state的浅比较来实现shouldComponentUpdate，也就是说，如果是引用类型的数据，只会比较是不是同一个地址，而不会比较具体这个地址存的数据是否完全一致。

###  函数组件与类组件的区别
1. 语法上   
两者最明显的不同就是在语法上：
- 函数组件是一个纯函数，它接收一个 `props` 对象返回一个 `react` 元素；
- 类组件需要去继承 `React.Component` 并且创建` render `函数返回 `react` 元素，虽然实现的效果相同，但需要更多的代码。
2. 状态管理   
因为函数组件是一个纯函数，所以不能在组件中使用 `setState()`，这也是为什么把函数组件称作为`无状态组件`。 如果要在组件中使用 `state`，可以选择创建一个`类组件`或者将 `state` 提升到你的父组件中，然后通过 `props` 对象传递到子组件。

3. 生命周期钩子   
  __函数组件中不能使用生命周期钩子__，原因和不能使用 `state` 一样，所有的生命周期钩子都来自于继承的 `React.Component` 中。因此，如果要使用生命周期钩子，就需要使用 `useState` 钩子去管理 `state`，使用 `useEffect` 钩子去使用生命周期函数。
4. 调用方式
  - 如果 `SayHi` 是一个函数，`React` 需要调用它：

```js
// 你的代码 
function SayHi() { 
    return <p>Hello, React</p> 
} 
// React 内部 
const result = SayHi(props) // » <p>Hello, React</p>
```

- 如果 `SayHi` 是一个类，`React` 需要先用 `new` 操作符将其实例化，然后调用刚才生成实例的 `render` 方法：
```js
// 你的代码 
class SayHi extends React.Component { 
    render() { 
        return <p>Hello, React</p> 
    } 
} 
// React 内部 
const instance = new SayHi(props) // » SayHi {} 
const result = instance.render() // » <p>Hello, React</p>
```
__函数组件重新渲染将重新调用组件方法返回新的 `react` 元素，类组件重新渲染将 `new` 一个新的组件实例，然后调用 `render` 类方法返回 `react` 元素，这也说明为什么类组件中 `this` 是可变的。__