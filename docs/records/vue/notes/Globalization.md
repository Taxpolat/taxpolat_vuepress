---
title: 【Vue】Vue 国际化
date: 2021-09-27
sidebar: 'auto'
author: 'Taxpolat'
categories:
 - Vue
tags:
 - Vue
 - 开发技巧
---

## Vue admin 国际化
自己练手的项目（`vue` + `element`）当中想要实现，多种语言自定义切换的功能。   

相关工具有：
- [ElementUI国际化](https://element.eleme.cn/#/zh-CN/component/i18n)
- [vue-i18n](https://kazupon.github.io/vue-i18n/zh/introduction.html)
  
###  安装   
```bash
npm install vue-i18n
```
###  创建语言数据及初始化   

在`src`文件夹下创建一个`lang`的文件夹，以便存放自定义语言的数据
```js
//en.js
const enLocale = {
    message: {
        'hello': 'hello, world',
    }
}
export default enLocale
```
```js
//zh.js
const zhLocale = {
    message: {
        'hello': '你好，世界',
    }
}
export default zhLocale
```
###  初始化vue-i18n    
 `lang`文件夹下创建一个`index.js` 文件
```js
  import Vue from 'vue'
  import VueI18n from 'vue-i18n'
  import Cookies from 'js-cookie'
  import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
  import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
  import enLocale from './en'
  import zhLocale from './zh'

  Vue.use(VueI18n)
  const messages = {
    en: {
      ...enLocale,
      ...elementEnLocale
    },
    zh: {
      ...zhLocale,
      ...elementZhLocale
    },
  }

  export function getLanguage() {
    const chooseLanguage = Cookies.get('language')
    if (chooseLanguage) return chooseLanguage

    // if has not choose language
    const language = (navigator.language || navigator.browserLanguage).toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
      if (language.indexOf(locale) > -1) {
        return locale
      }
    }
    return 'zh'
  }
  const i18n = new VueI18n({
    // set locale
    // options: en | zh
    locale: getLanguage(),
    // set locale messages
    messages
  })

  export default i18n
```
### 使用i18n

在`main.js` 引入 `i18n`, 并挂在。
```js
import Vue from 'vue'
import App from './App'
import store from './store'
import i18n from './lang'
Vue.config.productionTip = false

window.app = new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
```
###  在页面中使用
```html
<p>{{$t('message.hello')}}</p> // hello, world
```
###  全局切换
:::tip
全局切换语言，需要将需切换的字段写到`lang`文件夹里面的语言文件里面，并结合`本地数据保存`或者结合`Vuex` 一起使用。   
我是结合`VueX`使用的
:::
```js
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store


//store/getters.js
const getters = {
  language: state => state.app.language,
}
export default getters 


//   store/modules/app.js
import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'

const state = {
  language: getLanguage(),
}

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  }
}

const actions = {
  setLanguage({
    commit
  }, language) {
    commit('SET_LANGUAGE', language)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

// 修改的时候
this.$i18n.locale = lang
this.$store.dispatch('app/setLanguage', lang)
if (lang === 'en') {
  this.$message({
    message: 'Switch Language Success',
    type: 'success'
  })
} else if (lang === 'zh') {
  this.$message({
    message: '切换语言成功',
    type: 'success'
  })
}
```
::: tip
就可以自定义切换系统的语言了，瞬间高级很多！！
:::