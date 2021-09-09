---
title: 【Vue】Vuex
date: 2021-08-31
sidebar: 'auto'
categories:
 - Vue
tags:
 - Vue
 - Vuex
---


##  Vuex 
<!-- :100: -->

1. Vuex是一个专为Vue服务，用于管理页面数据状态、提供统一数据操作的生态系统
2. 它集中于MVC模式中的Model层，规定所有的数据操作必须通过`action-mutation-state Change`的流程来进行，再结合Vue的数据视图双向绑定特性来实现页面的展示更新
3. Vuex 可以让复杂的组件交互变得简单清晰。

###  介绍
::: tip
组件化应用是Vue的特点之一，因此平时开发中都需要封装自己的自定义组件，以提高开发的效率。而大部分情况下组件并不会孤立的存在，它必然会与父组件和兄弟组件产生数据交互。因此需要组件之间的数据交互的方法
:::
   
__Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式__   
Vuex是数据状态管理框架，主要做到了数据和视图层的解耦。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
   
Vuex状态自管理应用包含以下几个部分：
- state: 驱动应用的数据源
-  view: 以声明方式将 state 映射到视图
-  actions: 响应在 view 上的用户输入导致的状态变化
   
###  安装

根据自己使用的管理器：
NPM    
```
npm install vuex --save
```
 Yarn   
 
```
yarn add vuex
```

模块化的打包系统中， 必须显式地通过 Vue.use() 来安装 Vuex：

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```   
    
#### tips
每一个 Vuex 应用的核心就是 store。  
Vuex 和单纯的全局对象有以下两点不同：
1. VueX的状态存储是响应式的。当组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件间也会相应地得到更高效的更新。
2. 不能直接改变store的状态。改变状态的唯一途径是显式地`提交（commit）mutation` 。以方便跟踪每个状态的变化。

### 最简单的Store

为了在 Vue 组件中访问 this.$store property，你需要为 Vue 实例提供创建好的 store。Vuex 提供了一个从根组件向所有子组件，以 store 选项的方式“注入”该 store 的机制：  

需要在项目的`mian.js` 中
```javascript
import store from './store'

new Vue({
  el: '#app',
  store: store,
})
```
项目 中创建一个Store文件夹。`./store/index.js`:

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  username: ""
}

const mutations = {
  setUser(state, newState) {
    state.username = newState
  }
}

export default new Vuex.Store({
  mutations,
  state
})
```
在页面使用时：
```javascript
methods: {
	handelEvent() {
		this.$state.commit('setUser', '用户名字');
	}
	console.log(this.$store.state.username ) // 会输出：用户名字
}
```
我们没哟直接操作sate，而是通过提交mutations方式去修改state。 

###  State——单一状态树

`state`是一个数据存储的仓库，所有的Vuex数据源都会存放在这里，类似组件中的data。   
`state`中的数据在任意组件都能通过`this.$store.state`访问，不需要导出调用其他方法去监听数据。

####  mapState 辅助函数

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和多余。
`mapState `辅助函数可以帮助我们生成计算属性，以免重复声明多个状态。
在组件中：
```javascript
import { mapState } from 'vuex'
export default {
// 对象展开运算符
computed: {
    ...mapState({
      name: state  => state.name
      // 或者
      // 传字符串参数 'name' 等同于 `state => state.name`
      userName:'name'
    })
  },
} 
// 或者
computed: mapState({
	// 箭头函数可使代码更简练
	userName: state => state.name
	 // 传字符串参数 'name' 等同于 `state => state.name`
	name: 'name'
	// 页面的其他计算属性可以结合使用state和data里的数据
	countPlusLocalState (state) {
      return state.name+ this.localCount
    }
}）

```

###  Getters

`getters`可以认为是store的计算属性。
`getter`的返回值会根据它的依赖被缓存起来，且只有当它依赖值发生了改变才会重新计算。
`Getter` 接受 state 作为其第一个参数:
```javascript
getters: {
    doneTodos: state => {
      return '用户名是：' + state.name
    }
```
Getter 也可以接受其他 getter 作为第二个参数：
```javascript
getters: {
  doneTodosLength: (state, getters) => {
    return getters.doneTodos.length
  }
}
```
####  `getters`通过属性访问
```javascript
let user_name = this.$store.getters.doneTodos;
let user_name_length = this.$store.getters.doneTodosLength
console.log(user_name); // 用户名是：state.name 的值
console.log(user_name_length ); // 返回值为： 4 + state.name 长度的值
```
__getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。__

#### mapGetters 辅助函数
`mapGetters` 辅助函数仅仅是将 `store 中的 getter `映射到局部计算属性:
```javascript
import { mapGetters } from 'vuex'
computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
	...mapGetters ({
		'doneTodos',
		'doneTodosLength'
		// 如果你想将一个 getter 属性另取一个名字，使用对象形式：
		getTOdoList:'doneTodosLength'
	})
}
```
###  Mutation

`更改 Vuex 的 store 中的状态的唯一方法是提交 mutation`
每一个`mutation`都有一个字符串的`事件类型（type）和一个回调函数（handler）`
`回调函数`实际上是我们更改state的地方，并且`回调函数`将接受state为第一个参数：
```javascript
const store = new Vuex.Store({
  state: {
    name: 'userName'
  },
  mutations: {
    changeName(state) {
      // 变更状态
     state.name = 'modifiedUserName'
    }
  }
})
```
__`mutation handler`不能被直接调用__
`需要以相应的 type 调用 store.commit 方法:`
```javascript
this.$store.commit('increment')
```

#### 提交载荷（Payload）

使用store.commit时除了state，可以传入额外的参数，即`mutation的载荷（payload）`,可以作为state更改后的值或者什么条件之类的。
```javascript
mutations: {
  changeName(state, newUserName) {
	  state.name = newUserName
  }
}
// 使用
this.$store.commit('changeName', 'tom')
console.log(this.$store.state.name) // tom
```
也可以这样子使用：
```javascript
mutations: {
  changeName(state, condition) {
	  if(condition > 10) {
		 state.name = 'tom'
	  } else{
		state.name = 'James'
	 }
  }
}
// 使用
this.$store.commit('changeName', 11)
console.log(this.$store.state.name) // tom

this.$store.commit('changeName', 9)
console.log(this.$store.state.name) // James
```
` 提交 mutation 的另一种方式是直接使用包含 type 属性的对象`:
```javascript
this.$store.commit({
  type: 'increment',
  amount: 10
 })
```
#### Mutation 需遵守 Vue 的响应规则
`Vuex`的store中的state是响应式的，当我们改变state时，监视状态的Vue组件也会更新。   
因此，`mutation`的使用需要遵守以下几个点：
1.  提前在你的 store 中初始化好所有所需属性。
2.   当需要在对象上添加新属性时,应该使用`Vue.set` 或者 以新对象替换老对象 
```javascript
 state.obj = { ...state.obj, newProp: 123 }
```
3. 使用常量替代 Mutation 事件类型

	同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然 
```javascript
mutations: {
	SET_USERNAME (state, condition) {
		if(condition > 10) {
			 state.name = 'tom'
		  } else{
			state.name = 'James'
		 }
	}
	// 或者使用箭头函数
	SET_USERNAME = (state, condition) => {
		if(condition > 10) {
			state.name = 'tom'
		 } else{
			state.name = 'James'
		 }
	}
	// 使用
this.$store.commit('SET_USERNAME ', 9)
console.log(this.$store.state.name) // James
```

####  mapMutations 辅助函数
在组件中可以使用 this.$store.commit('xxx') 提交 mutation，或者可以使用`mapMutations ` 辅助函数
```javascript
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    hadnelName() {
      this.changeName(9);
    },
    ...mapMutations({
      changeName: "SET_USERNAME ",
    }),
  }
}
```
###  Action
`Action` 类似于 `mutation`，不同在于：
1.  Action提交的是mutation，而不是直接更改状态， mutation直接更改状态
2.  Action 可以包含任意异步操作
简单的Action：
```javascript
const store = new Vuex.Store({
  state: {
    name: 'tom'
  },
  mutations: {
    changeName (state) {
      state.name = 'James'
    }
  },
  actions: {
    changeName (context) {
      context.commit('changeName ')
    }
  }
})
```
Action 函数接受一个与 store 实例具有相同方法和属性的` context` 对象，因此 可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。
实践中的使用为：
```javascript
actions: {
  changeName ({ commit }) {
    commit ('changeName ')
  }
}
```
#### 分发 Action
`Action` 通过` store.dispatch` 方法触发：

```javascript
this.$store.dispatch('changeName')
```
`Actions 支持同样的载荷方式和对象方式进行分发:`
```javascript
const store = new Vuex.Store({
  state: {
    name: 'tom'
  },
  mutations: {
    changeName (state, newName) {
      state.name = newName
    }
  },
  actions: {
    changeName ({ commit, state }, newName) {
    commit('changeName', newName)
    }
  }
})
// 使用
let name = 'james'
this.$store.dispatch('changeName', name )
```
#### mapActions 辅助函数
在组件中使用 `this.$store.dispatch('xxx')` 分发 action， 或者使用 `mapActions 辅助函数`将组件的 methods 映射为 store.dispatch 调用。
```javascript
import { mapActions } from 'vuex'
export default {
 methods: {
  ...mapActions({
      change: 'changeName ' // 将 `this.add()` 映射为 `this.$store.dispatch('changeName ')`
    })
 }
}
```

#### 组合 Action
__store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise__
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  username: ""
}

const mutations = {
  setUser(state, newState) {
    state.username = newState
  }
}
const getters = {
  name: state => state.username
}
const actions = {
  changeName({commit}, newName) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          commit('setUser', newName)
          resolve(newName)
        } catch (error) {
          reject(error)
        }
      }, 1000)
    })
  }
}
export default new Vuex.Store({
  actions,
  mutations,
  getters,
  state
})
```
分发Action: 
```javascript
this.$store.dispatch("changeName", "James").then((res) => {
	console.log(res); // James
});
```
###  Module 模块

使用单一状态树，应用的所有状态会集中到一个比较大的对象，当应用变得非常复杂时，store 对象就有可能变得相当大，为了解决这个问题，Vuex 允许我们将 store 分割成 `模块（module）`。
每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const user = {
  state: () => ({
    username: ""
  }),
  mutations: {
    setUser(state, newState) {
      state.username = newState
    }
  },
  actions: {},
  getters: {
    userName: state => state.username
  }
}

const layouts = {
  state: () => ({
    isHaveNavBar: false,
  }),
  mutations: {
    setNavBar(state, newState) {
      state.isHaveNavBar = newState
    }
  },
  actions: {},
  getters: {
    isHaveNavBar: state => state.isHaveNavBar
  }
}

export default new Vuex.Store({
  modules: {
    userModule: user,
    layoutsModule: layouts
  }
})
```
```javascript
this.$store.state.userModule // -> userModule 的状态
this.$store.state.layoutsModule// -> layoutsModule 的状态
```
####  模块的局部状态
__对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。__
```javascript
const layouts = {
  state: () => ({
    isHaveNavBar: false,
  }),
  mutations: {
    setNavBar(state, newState) {
    //  state 对象是模块的局部状态
      state.isHaveNavBar = newState
    }
  },
  actions: {},
  getters: {
    //  state 对象是模块的局部状态
    isHaveNavBar: state => state.isHaveNavBar
  }
}

export default new Vuex.Store({
  modules: {
    layoutsModule: layouts
  }
})
```
__同样，对于模块内部的 action，局部状态通过` context.state` 暴露出来，根节点状态则为 `context.rootState`__

#### 命名空间
想要模块具有更高的封装度和复用性，你可以通过添加` namespaced: true` 的方式使其成为带命名空间的模块。
当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
```javascript
 modules: {
   // 继承父模块的命名空间
   myPage: {
     state: () => ({ ... }),
     getters: {
       profile () { ... } // 使用时  this.getters['account/profile']
     }
   },
 }

```
### 总结
 1. 层级的状态应该集中到单个store中。
 2. 提交mutation是更改状态的唯一方法，并且这个过程是同步的。
 3. 异步逻辑都应该封装的到action里面。
 4. 如果store文件太大，只需将action，mutation和getter分割到单独的文件
 5. 也可以按照modules分割文件。在store文件夹里创建一个modules文件夹
 
 __store/index.js __
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

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
```
__modules/user.js__
```javascript
import {login} from '@/api'
const state = {
  token: getToken(),
  userInfo: {
    name: '',
    nickname: '',
    avatar: '',
    introduction: '',
    roles: [],
    email: '',
    gender: ''

  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, user) => {
    state.userInfo = user
  }
}

const actions = {
  login({
    commit
  }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo.username, userInfo.password, userInfo.code, userInfo.uuid).then(response => {
        commit('SET_TOKEN', response.token)
        commit('SET_USERINFO', response.user)
        sessionStorage.setItem('userInfo', JSON.stringify(response.user))
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```
使用：
```javascript 
let params = {
	username:'username' ,
	password: encrypt(password),
	code:code,
};
this.$store
 .dispatch("user/login", params)
 .then(res=> {
	console.log(res)
})
```
### Store严格模式
##### 开启严格模式，仅需在创建 store 的时候传入 strict: true；
在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

::: danger
 不要在发布环境下启用严格模式
:::
```javascript
const store = new Vuex.Store({
	// ...
	strict: process.env.NODE_ENV !== 'production'
})
```