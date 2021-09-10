---
title: 【Vue】uniApp 自定义导航栏
date: 2021-09-03
sidebar: 'auto'
author: 'Taxpolat'
categories:
 - 小程序
tags:
 - 小程序
 - 开发技巧
---

## 自定义导航栏
:::tip
小程序开发时难免会遇到自定义原生导航栏的任务或需求，下面以[uinApp](https://uniapp.dcloud.io/)框架开发的小程序为例，记上一个自己开发的自定义导航栏组件。    
ps: 当然很多组件也有自己的自定义导航栏，我就自己开发， 哎~ 就是玩儿！
:::
### 组件代码

```js
// customizeNavigation.vue
<template>
  <view>
    <view :style="{ background: background }" class="custom-header-container">
      <view
        :style="{ height: getStausBarHeight * 2 + 'rpx' }"
        class="custom-header-status-bar"
      >
      </view>
      <view
        :class="{ 'ios-center': isIos }"
        class="custom-header-top-container"
      >
        <u-icon
          v-if="showBack"
          :style="{ color: color }"
          :class="{ isIos: isIos }"
          name="arrow-left"
          class="custom-back-btn iconfont"
          @tap="backTap"
        />
        <view
          :style="{ color: color }"
          :class="{ 'ios-center': isIos }"
          class="custom-header-title"
        >
          {{ title }}
        </view>
      </view>
    </view>
    <view
      :style="{ height: (navHeight - 2) * 2 + 'rpx' }"
      class="custom-header-height"
    ></view>
  </view>
</template>
<script>
export default {
  name: "customizeNavigation",
  props: {
    title: {
      type: String,
      default: "",
    },
    background: {
      type: String,
      default: "#2C6CEC",
    },
    color: {
      type: String,
      default: "#ffffff",
    },
    // 是否有箭头
    showBack: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      navHeight: "",
    };
  },
  created() {
    uni.getSystemInfo({
      success: (res) => {
        //导航高度
        this.navHeight = res.statusBarHeight + 46;
      },
      fail(err) {
        console.log(err);
      },
    });
  },
  computed: {
    getStausBarHeight() {
      try {
        const res = uni.getSystemInfoSync();
        return res.statusBarHeight;
      } catch (e) {
        console.log(e);
      }
    },
    isIos() {
      return uni.getSystemInfoSync().system.indexOf("iOS") > -1;
    },
  },
  methods: {
    backTap() {
      uni.navigateBack({
        delta: 1,
        fail: () => {
          // uni.switchTab({
          //   url: "/pages/home",
          // });
        },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.custom-header-top-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  &.ios-center {
    justify-content: center;
  }
}
.custom-header-container {
  z-index: 9;
  width: 750upx;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  background-size: 100% 100% !important;
}
.custom-back-btn {
  height: 96rpx;
  line-height: 96rpx;
  width: 80rpx;
  margin: 0;
  padding: 0;
  border-radius: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0upx;
  font-size: 36rpx;
  border-radius: 10rpx;
  font-weight: 500;
  color: #ffffff;
  &.isIos {
    line-height: 90rpx;
    height: 90rpx;
  }
}
.custom-header-status-bar {
  width: 100%;
  top: 0;
  position: sticky;
  z-index: 100;
}
.custom-header-title {
  height: 96rpx;
  line-height: 96rpx;
  font-size: 36rpx;
  margin-left: 80rpx;
  color: #ffffff;
  &.ios-center {
    margin-left: 0;
    line-height: 90rpx;
    height: 90rpx;
  }
}
</style>
```

### 使用
以index页面为例子
1. 首先需要自定义的页面在`pages.json`文件里, 把`style`的`navigationStyle`, 属性改成`"navigationStyle": "custom"`。
```js
// pages.json
{
  "path": "pages/index/index",
  "style": {
    "navigationStyle": "custom"
  }
},
```
2. 在需要自定义的页面文件引入该组件,注册，传相关参数并使用
```js
//index.vue
import customizeNavigation from "@/components/customizeNavigation"
export default {
  components: {
    customizeNavigation
  }
}
```
使用：    
```html
<template>
  <view>
    <customizeNavigation
      title="我的页面"
      background="#2C6CEC"
      color="#ffffff"
    />
  </view>
</template>
```
__然后也可以按照自己的需求添加各种各样的参数，写出各种各样的自定义导航栏。__