---
title: 【JavaScript】MD5加密
date: 2021-09-6
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - JavaScript
 - 开发技巧
---


## MD5加密
__MD5是一种哈希算法__
MD5 只是一种哈希算法,哈希算法有很多种，MD5 是其中的一种     

### 加密是什么？ 
:::tip
加密，指的是对数据进行转换以后，数据变成了另一种格式，并且除了拿到解密方法的人，没人能把数据转换回来
:::

因此，加密通常用于网络通信。因为网络上的通信数据，任何人都有可能会拿到，把数据加密后再传送，送达以后由对方解密后再查看，就可以防止网络上的偷窥。例如大家都知道「安全」但很少人知道「为什么安全」的 HTTPS，就是通过加密算法来保障的网络安全性

### 所以，MD5 是加密吗？
加密算法的目的，在于别人无法成功查看加密后的数据，并且在需要的时候还可以对数据进行解密来重新查看数据。而 MD5 算法是一种哈希算法，哈希算法的设计目标本身就决定了，它在大多数时候都是不可逆的，即你经过哈希算法得出的数据，无法再经过任何算法还原回去。所以，既然不能将数据还原，也就不能称之为可以解密；既然不能解密，那么哈希的过程自然也就不能称作是「加密」了。

    
### 前端加密的方法
#### 获取文件
引入MD5算法的加密文件（类似md5.js）
文件获取地址 [md5加密js文件](https://pan.baidu.com/s/1V3Q9HTA27DMSHS4B50pw2Q)    
提取码：0421
#### 使用

HTML:    
```HTML
  <script src="./md5.js"></script>
  <script type="text/javascript">
    var salt = (new Date).getTime();
    var query = 'apple';
    var from = 'en';
    var to = 'zh';
    var str1 = query + salt + key;
    var sign = MD5(str1);
  </script>
```
其他框架或者其他项目
```js
import MD5 from './MD5'
```
```js
  var salt = (new Date).getTime();
  var query = 'apple';
  var from = 'en';
  var to = 'zh';
  var str1 = query + salt + key;
  var sign = MD5(str1);
```

