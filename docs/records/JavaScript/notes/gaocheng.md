<!-- ---
title: 【JavaScript】基础
date: 2021-09-8
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - JavaScript
 - 面试
--- -->


# JavaScript高程学习
- - -
## 1.数据类型
  
分为两大类型：基本类型和引用类型  
  
JavaScript`基本数据类型`可分为7大类型：  
* undefined
* Null
* String
* Number
* Boolean
* Symbol
* biginit  
其中symbol和biginit为ES6新增的数据类型；  

`Symbol` 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。  
`BigInt` 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围  

JavaScript`引用数据类型`:  
引用数据类型指的是有多个值构成的对象，如:
* 数组，
* 对象
* 函数

#### Undefined 类型
`undefined`类型只有一个特殊值，就是特殊值undefined。  
使用`var`和`let`声明变量但没有初始化时，相当于给变量赋值了undefined。
默认情况下， 任何没有被初始化的变量都会取得undefined值 

***undefined是个假值***

####  null 类型
`Null`类型同样只有一个值，即特殊值 null。逻辑上讲，null 值表示一个空对象指针，这也是给`typeof` 传一个 null 会返回"object"的原因。
任何时候，只要变量要保存对象，而当时又没有那个
对象可保存，就要用 null 来填充该变量  

***null是个假值***
#### null和undefined区别
首先`null`和`undefined`都是基本数据类型，都分别只有一个值，就是undefined和null  

undefined代表的含义是未定义，null代表的含义是空对象。  
一般变量声明了还未初始化的的时候就会返回`undefined`。  
null主要用于赋值给一些可能返回的对象的变量，作为初始化值。

#### Boolean 类型
`Boolean（布尔值）`类型jJavaScript中使用最频繁的类型之一，只有两个字面值：`true （1）`和 `false（0）`
##### 其他变量转成Boolean
| 数据类型  |       转为true值       |         转为false值          |
| :-------: | :--------------------: | :--------------------------: |
|  Boolean  |          true          |            false             |
|  String   |       非空字符串       |        ""（空字符串）        |
|  Number   | 非零数值（包括无穷值） | 0、NaN（参见后面的相关内容） |
|  Object   |        任意对象        |             null             |
| Undefined |     N/A（不存在）      |          undefined           |

### Number类型
表示数值的数据类型， 表示整数和浮点值  
**0.1 加 0.2 得到的不是 0.3，而是 0.300 000 000 000 000 04，两个数值分别是 0.05和 0.25，或者 0.15 和 0.15，那没问题**  

由于内存的限制，ECMAScript 并不支持表示这个世界上的所有数值  

CMAScript 可以表示的最小数值保存在` Number.MIN_VALUE` 中，这个值在多数浏览器中是` 5e-324`；可以表示的最大数值保存在`Number.MAX_VALUE` 中，这个值在多数浏览器中是 `1.797 693 134 862 315 7e+308`。如果某个计算得到的数值结果超出了 JavaScript 可以表示的范围，那么这个数值会被自动转换为一个特殊的 `Infinity`（无穷）值。任何无法表示的负数以`-Infinity（负无穷大）`表示，任何无法表示的正数以 `Infinity（正无穷大）`表示。
#### NaN
是一个特殊值，表述`不是数值（not a number）`用于表示本来要返回数值的操作失败了（而不是抛出错误）  
```
console.log(0/0); // NaN
console.log(-0/+0); // NaN
```
**NaN 不等于包括 NaN 在内的任何值**  

提供了isNaN()函数，用于判断这个参数是否`是不是数值`, 该函数会尝试把它转换为数值
```
console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false，10 是数值
console.log(isNaN("10")); // false，可以转换为数值 10
console.log(isNaN("blue")); // true，不可以转换为数值
console.log(isNaN(true)); // false，可以转换为数值 1
```
其他的值到数字值的转换：
* `Boolean`类型转换数字： `true转换为1` `false转换为0`
* `undefined`转换成数字会转换为`NaN`
* `null`转换为数字会转换成`0`
* `string`类型转换如同使用`Number()`函数进行转换，如果包含非数字则转换成`NaN`，空字符串转换成`0`
* `Symbol`不能转换成数字，会报错
* 对象，调用` valueOf()`方法，并按照上述规则转换返回的值  

##### 数字转换方法（函数）
* Number()

```
let num1 = Number("Hello world!"); // NaN
let num2 = Number(""); // 0
let num3 = Number("000011"); // 11
let num4 = Number(true); // 1
```
* parseInt()
```
let num1 = parseInt("1234blue"); // 1234
let num2 = parseInt(""); // NaN
let num3 = parseInt("0xA"); // 10，解释为十六进制整数
let num4 = parseInt(22.5); // 22
let num5 = parseInt("70"); // 70，解释为十进制值
let num6 = parseInt("0xf"); // 15，解释为十六进制整数
```
* parseFloat() (最推荐使用的)
```
let num1 = parseFloat("1234blue"); // 1234，按整数解析
let num2 = parseFloat("0xA"); // 0
let num3 = parseFloat("22.5"); // 22.5
let num4 = parseFloat("22.34.5"); // 22.34
let num5 = parseFloat("0908.5"); // 908.5
let num6 = parseFloat("3.125e7"); // 31250000
```
### String 类型
**中的字符串是不可变的（immutable）** 意思是一旦创建，它们的值就不能变了。要修改
某个变量中的字符串值，必须先销毁原始的字符串 。  
调用`toString()`方法， 返回当前值的字符串等价物  
**除了null 和 undefined以外的数据类型都有`toString()`方法**  

如果你不确定一个值是不是 null 或 undefined，可以使用 `String()` 转型函数
* 如果值有 toString()方法，则调用该方法（不传参数）并返回结果。
* 如果值是 null，返回"null"。
* 如果值是 undefined，返回"undefined"。

### Symbol 类型
`Symbol`（符号）是 ES6 新增的数据类型。符号是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险  

需要使用 Symbol()函数初始化

### object类型
`一组数据和功能的集合`
**对象通过 new 操作符后跟对象类型的名称来创建,开发者可以通过创建 Object 类型的实例来创建自己的对象，然后再给对象添加属性和方法**  

Object 实例都有如下属性和方法:
* `constructor`:用于创建当前对象的函数。这个属性的值就是 Object()函数
* `hasOwnProperty(propertyName)`: 用于判断当前对象实例（不是原型）上是否存在给定的属性(propertyName)
* `isPrototypeOf(object)`: 用于判断当前对象是否为另一个对象的原型
* `propertyIsEnumerable(propertyName)`:用于判断给定的属性(propertyName)是否可以使用for-in 语句枚举。与 hasOwnProperty()一样，属性名必须是字符串  
* `toLocaleString()`:返回对象的字符串表示，该字符串反映对象所在的本地化执行环境  
* `toString()`: 返回对象的字符串表示。
* `valueOf()`：返回对象对应的字符串、数值或布尔值表示。通常与 `toString()`的返回值相同。


## 2. 操作符
### 一元操作符
只操作一个值的操作符叫一元操作符  
#### 递增/递减操作符
前缀递增操作符会给数值加 1  

```
let age = 29;
++age;
// 相当于
let age = 29;
age = age + 1;
```  
前缀递减操作符也类似，只不过是从一个数值减 1  
**使用前缀递增还是前缀递减操作符，变量的值都会在语句被求值之前改变**、
#### 一元加和减
  - [x] 一元加由一个加号（+）表示，放在变量前头，**对数值没有任何影响**  

**如果将一元加应用到非数值，则会执行与使用 Number()转型函数一样的类型转换**
```
let s1 = "01";
let s2 = "1.1";
let s3 = "z";
let b = false;
let f = 1.1;
let o = {
valueOf() {
return -1;
}
};
s1 = +s1; // 值变成数值 1
s2 = +s2; // 值变成数值 1.1
s3 = +s3; // 值变成 NaN
b = +b; // 值变成数值 0
f = +f; // 不变，还是 1.1
o = +o; // 值变成数值-1
```
一元减由一个减号（-）表示，放在变量前头，主要用于把数值变成负值，如把 1 转换为-1  
```
let num = 25;
num = -num;
console.log(num); // -25
```
**对数值使用一元减会将其变成相应的负值**（如上面的例子所示）。在应用到非数时，一元减会遵循与一元加同样的规则，先对它们进行转换，然后再取负值:
```
let s1 = "01";
let s2 = "1.1";
let s3 = "z";
let b = false;
let f = 1.1;
let o = {
valueOf() {
return -1;
}
};
s1 = -s1; // 值变成数值-1
s2 = -s2; // 值变成数值-1.1
s3 = -s3; // 值变成 NaN
b = -b; // 值变成数值 0
f = -f; // 变成-1.1
o = -o; // 值变成数值 1
```
### 布尔操作符
布尔操作符一共有 3 个： <kbd>逻辑非</kbd>、<kbd>逻辑与</kbd> <kbd>逻辑或</kbd>  
##### 逻辑非
逻辑非操作符由一个叹号（!）表示。  
无论用到什么类型的值，逻辑非操作符始终会返回布尔值，然后再对返回的布尔值取反。  
逻辑非操作符规则:
* 如果操作数是对象，则返回 false
* 如果操作数是空字符串，则返回 true
* 如果操作数是非空字符串，则返回 false
* 如果操作数是数值 0，则返回 true
* 如果操作数是非 0 数值（包括 Infinity），则返回 false。
* 如果操作数是 null，则返回 true
* 如果操作数是 NaN，则返回 true
* 如果操作数是 undefined，则返回 true  
* 
- [x] 逻辑非操作符也可以用于把任意值转换为布尔值。同时使用两个叹号（!!），相当于调用了转型函数 Boolean()

##### 逻辑与
逻辑与操作符由两个和号（&&）表示，应用到两个值， 规则如下:
| 第一个操作数 | 第二个操作数 | 结 果 |
| :----------: | :----------: | :---: |
|     true     |     true     | true  |
|     true     |    false     | false |
|    false     |     true     | false |
|    false     |    false     | false |

##### 逻辑或











2.数据类型检测方式有哪些：
（1）typeof
作用： 确定任意变量的数据类型
是一个操作符，不是函数，所以不需要参数，但是也可以接受参数  
```
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string
console.log(typeof []);              // object    
console.log(typeof function(){});    // function
console.log(typeof {});              // object
console.log(typeof undefined);       // undefined
console.log(typeof null);            // object 
```


其中数组，对象，null的数据类型都会被判断为 object，其他判断都为正确，因此不能所有的数据类型都能用此方式。

（2）instanceof（实例）
原理是 判断在数据类型的原型链中能否找到该类型的原型
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false 
 
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true

可以看到instanceof 只能正确的判断引用数据类型，不能判断基本数据类型。
instanceof运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的prototype。

（3）constructor（构造函数）
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('str').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true
constructor有两个左右，一是判断数据的类型，二是对象的实例通过constructor对象访问它的构造函数。如果创建一个对象来改变的它的原型，constructor就不能用来判断数据类型了；

（4）Object.prototype.toString.call ()
Object.prototype.toString.call() 使用Object对象的原型方法toString来判断数据类型：
var a = Object.prototype.toString;
 
console.log(a.call(2));
console.log(a.call(true));
console.log(a.call('str'));
console.log(a.call([]));
console.log(a.call(function(){}));
console.log(a.call({}));
console.log(a.call(undefined));
console.log(a.call(null));

3.数组检测方式有哪些
  (1)Object.prototype.toString来判断
Object.prototype.toString.call(obj) // [object Array]
Object.prototype.toString.call(obj).slice(8,-1) === 'Array';
 
(2) 通过原型链判断
console.log(obj.__proto__ === Array.prototype) // true为数组  else 不是 数组

（3）通过ES6的Array.isArray()做判断：
Array.isArrray(obj);

（4）instanceof 
console.log([] instanceof Array);                    // true

（5）通过Array.prototype.isPrototypeOf
Array.prototype.isPrototypeOf(obj)  // true

4.NaN 类型
NaN是个特殊类型，是指“不是一个数字”（not a number）是一个警戒值，用于指出数字类型中的错误情况，它和自身不相等，是唯一一个非自反的值（自反，reflexive，即 x === x 不成立）。
而 NaN !== NaN 为 true。
typeof NaN; // "number"
isNaN和 Number.isNaN函数的区别：
let num = 1
let str = 'hello';
let chu = 1 / str

console.log(isNaN(num))  // false
console.log(isNaN(str))  // true
console.log(isNaN(chu))  // true

console.log(Number.isNaN(num))  // false
console.log(Number.isNaN(str))  // false
console.log(Number.isNaN(chu))  // true
（1）函数isNaN接受参数后，会尝试将参数转换成数值，任何不能转换为数值的值都会返回NaN，因此传入的参数不是数值也会返回true，会影响判断的结果
（2）Number.isNaN会首先判断参数是不是数字，如果是数再继续判断是否为NaN，不会进行数据类型的转换，这种方法更为准确。

5.其他值到字符串的转换规则：
（1）null ==> 'null'
（2）undefined ==> ‘undefined'
（3）Boolean类型： true==> ‘true'    false  ==> ‘false '
（4）Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。
（5）对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()。（Object.prototype.toString()）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。

6.其他的值到数字值的转换：
（1）undefined转换成数字会转换为NaN
（2）null转换为数字会转换成0
（3）Boolean类型转换数字： true转换为1 false转换为0
（4）string类型转换如同使用Number()函数进行转换，如果包含非数字则转换成NaN，空字符串转换成0
（5）Symbol不能转换成数字，会报错

7.其他值到布尔值

JavaScript假值有：
undefined 
null 
false
+0
-0
NaN
 ""（空字符串）
假值的布尔强制类型为转换结果为false。逻辑上 假值列表意外的都是真值，布尔强制类型转换结果为true

8.Object.is() 与比较操作符’==‘， ’===‘的区别
（1）使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
（2）使用三等号（===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
（3）使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的。

9.隐式类型转换
JavaScript 中的隐式类型转换主要发生在+、-、*、/以及==、>、<这些运算符之间
（1）+操作符
+操作符两边至少有一个Sting类型变量时，两边的变量都会被隐式转换为字符串，操作便成为两个字符相加操作。
其他的情况都会隐式转换为数字进行数字相加运算。
1 + '23' // '123'
 1 + false // 1 
 1 + Symbol() // Uncaught TypeError: Cannot convert a Symbol value to a number
 '1' + false // '1false'
 false + true // 1

（2）-、*、\操作符
1 * '23' // 23
 1 * false // 0
 1 / 'aa' // NaN

（3）==操作符
==操作符两边的值都尽可能的转成number
3 == true // false, 3 转为number为3，true转为number为1
'0' == false //true, '0'转为number为0，false转为number为0
'0' == 0 // '0'转为number为0

（4）>、< 操作符
如果操作符的两边都是字符串，则比较字母表顺序：
'ca' < 'bd' // false
'a' < 'b' // true
其他情况下都会转换成数字再比较
'12' < 13 // true
false > -1 // true

1.  let， const, var 的区别
let 声明的范围是块作用域，而 var 声明的范围是函数作用域
if (true) {
var name = 'Matt';
console.log(name); // Matt
}
console.log(name); // Matt

if (true) {
let age = 26;
console.log(age); // 26
}
console.log(age); // ReferenceError: age 没有定义
（1）块级作用域不一样：
块级作用域有{ }包括，let和const 是有块级作用域，var不存在块级作用域
（2）变量提升：（函数及变量的声明都将被提升到函数的最顶部）
var 存在变量提升，let和const不存在变量提升，即变量只能在声明之后使用，否则会报错
（3）重复声明：var声明变量时可以重复声明，后声明的同名变量会覆盖之前声明的变量。
let和const不能重复声明
（4）暂时性死区：在使用let和const命令声明之前该变量都是不可用的，这称为暂时性死区。使用var声明不存在暂时性死区。
（5）初始值设置：用let和var声明变量时可以不设置初始值，使用const声明变量时必须设置初始值，不然会报错
（6）指针指向：let创建的变量是可以更改指针的指向的（可以重新赋值）。但const声明的变量是不允许改变指针的指向

区别是否有块级作用域是否存在变量提升是否添加全局属性能否重复声明变量是否存在暂时性死区是否必须设置初始值能否改变指针指向var×✔️✔️✔️××✔️let✔️×××✔️×✔️const✔️×××✔️✔️×

11.能不能修改用const声明的对象的属性？
可以改！
const保证的并不是变量的值不能改动，而是变量指向的那个内存地址不能改动
对于基本类型的数据（数值，字符串，布尔值），其值就保存在变量指向的内存地址，等同于常量

但对于引用类型的数据（主要是对象和数组）来说，变量指向数据的内存地址保存的只是一个指针，const只能保证这个指针固定不变，至于它指向的数据结构是不是可变的，就完全不受const的控制了

12.箭头函数和普通函数的区别
（1）箭头函数比普通函数更加简洁
（2）箭头函数没有自己的this，箭头函数不会创建自己的this，只会在自己的作用域的上一层继承this，因此箭头函数的中this在它定义的时候就已经确定了，之后不会改变，即箭头函数继承来的this指向永远不会改变。
（3）call(),apply(),bind()等方法不能改变箭头函数的 this指向
（4）箭头函数不能作为构造函数使用
（5）箭头函数没有自己的arguments对象

13. 箭头函数的this指向哪里？
箭头函数不会创建自己的this，只会在自己的作用域的上一层继承this，因此箭头函数的中this在它定义的时候就已经确定了，之后不会改变，即箭头函数继承来的this指向永远不会改变。
它所谓的this是捕获其所在上下⽂的 this 值，作为⾃⼰的 this 值，并且由于没有属于⾃⼰的this，所以是不会被new调⽤的，这个所谓的this也不会被改变。

14.如果new一个箭头函数会怎么样？
箭头函数是ES6中提出来的，它没有prototype，也没有自己的this，更不可以使用arguments参数，所以不能new一个箭头函数

15. new操作的实现步骤：
1.创建一个对象
2.将构造函数的作用域赋给新对象（也就是将对象的__proto__属性指向构造函数的prototype属性）
3.指向构造函数中的代码，构造函数中的this指向该对象（也就是为这个对象添加属性和方法）
4.返回新对象

16.js防抖
在事件被触发n秒后再执行回调函数，如果在这n秒内又被触发，则重新计时。
function debounce(fun, delay) {
    return function (args) {
        let that = this
        let _args = args
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun.call(that, _args)
        }, delay)
    }
}
17.节流
规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效
function throttle(fun, delay) {
        let last, deferTimer
        return function (args) {
            let that = this
            let _args = arguments
            let now = +new Date()
            if (last && now < last + delay) {
                clearTimeout(deferTimer)
                deferTimer = setTimeout(function () {
                    last = now
                    fun.apply(that, _args)
                }, delay)
            }else {
                last = now
                fun.apply(that,_args)
            }
        }
    }
Vue问题
1.对vue的理解
用于动态创建用户界面的渐进式JavaScript框架。
vue特点：MVVM模式；代码简洁，运行效率高，适合移动端开发，易入门
2.MVVM模式
全程 model-view-viewModel，Model表示数据层，view表示视图层，viewModel 是view和model层的桥梁

3.vue生命周期
（1）beforeCreate
组件刚被创建，组件属性计算之前，data computed watch methods上的方法和数据均不能访问
（2）created
组件实例创建完成，属性已绑定，能拿到data，挂载阶段还未开始，DOM还未生成，data computed watch methods上的方法和数据均能访问，可进行一些接口的请求
（3）beforeMount
模板编译，挂载之前，相关render函数首次被调用。
（4）mounted
模板编译，挂载
（5）beforeUpdate
组件更新之前
（6）updated
组件更新之后
（7）beforeDestroy
组件实力销毁之前被调用
（8）destroyed
vm.$detroy()被调用，组件生命周期结束。

4.请求初始化是要放在created或者mounted？
created，个人习惯，已经可以拿到data，可以进行一个页面数据的初始化了，看个人习惯。

5.vue中data为什么是函数？
data为函数（有自己独立的作用域），通过return 返回对象的拷贝，致使每个实例都有自己独立的对象，实例之间可以互不影响的改变data属性值。

6.vue和react的区别
vue是双向数据流，vue是双向绑定， react是单向
vue 是响应式，数据变动界面也会自动更新，react需要手动调用setstate的方法
vue 有虚拟dom react 没有虚拟dom
vue 模板+js+css  react 函数式变成 使用jsx， all in js
vuex是使用可变的数据，可以直接修改数据， react用的是不可变的数据，修改时智能用新的state替换旧的state
