---
title: 【Vue】基于ElementUI的全局Loading
date: 2021-11-16
sidebar: 'auto'
author: 'Taxpolat'
categories:
 - Vue
tags:
 - Vue
 - 开发技巧
---

## 基于ElementUI的全局Loading
ElementUI + axios 实现的全局loading：
```js
//  loading.js
import { Loading } from "element-ui";
import _ from 'lodash';

let loading = null;
let needRequestCount = 0;


//开启loading状态
const startLoading = (headers={}) => {
  loading = Loading.service({
    lock: true,
    text: headers.text||"加载中……",
    background: "rgba(0, 0, 0, 0.7)",
    target:headers.target||"body"
  });
};

//关闭loading状态
const endLoading = _.debounce(() => {
  loading.close();
  loading = null;
},300);


export const showScreenLoading=(headers)=>{
   if(needRequestCount == 0&&!loading){
    startLoading(headers);
   }
   needRequestCount++;
}

export const hideScreenLoading=()=>{
    if(needRequestCount<=0)  return 
    needRequestCount--;
    needRequestCount = Math.max(needRequestCount, 0);
    if(needRequestCount===0){
        endLoading()
    }
}
export default {};
```

``` js
// request.js
import axios from "axios";
import Lockr from "lockr";
import { showScreenLoading, hideScreenLoading } from "./loading";
import { Message } from "element-ui";

class Service {
  construct() {
    this.baseURL = process.env.VUE_APP_URL;
    this.timeout = 3000; //请求时间
  }
  request(config) {
    let instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout
    });
    //请求拦截器
    instance.interceptors.request.use(
      config => {
        config.headers.Authorization = Lockr.get("token");
        if (config.headers.showLoading !== false) {
          showScreenLoading(config.headers);
        }
        return config;
      },
      error => {
        if (config.headers.showLoading !== false) {
          hideScreenLoading(config.headers);
        }
        Message.error("请求超时!");
        return Promise.reject(error);
      }
    );
    //响应拦截器
    instance.interceptors.response.use(
      response => {
        if (response.status == 200) {
          setTimeout(() => {
            if (response.config.headers.showLoading !== false) {
              hideScreenLoading();
            }
          }, 500);
          return response.data;
        }
      },
      error => {
        if (response.config.headers.showLoading !== false) {
          hideScreenLoading();
        }
        return Promise.reject(error);
      }
    );
    return instance(config);
  }
}

export default new Service();
```