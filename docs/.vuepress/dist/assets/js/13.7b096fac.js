(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{597:function(t,v,e){"use strict";e.r(v);var a=e(8),_=Object(a.a)({},(function(){var t=this,v=t.$createElement,e=t._self._c||v;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"vue面试题汇总-1-20"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue面试题汇总-1-20"}},[t._v("#")]),t._v(" vue面试题汇总（1-20）")]),t._v(" "),e("h1",{attrs:{id:"_1-vue中-app是如何适配的"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-vue中-app是如何适配的"}},[t._v("#")]),t._v(" 1.vue中，app是如何适配的")]),t._v(" "),e("p",[t._v("(1)rem 布局")]),t._v(" "),e("p",[t._v("对于只需要适配少部分手机设备，且分辨率对页面影响不大的，使用px即可；对于需要适配各种移动设备，使用rem，例如只需要适配iPhone和iPad等分辨率差别比较挺大的设备")]),t._v(" "),e("p",[t._v("若没有在根元素（html字体）指定参照值，那浏览器默认1rem就是16px,若指定值，则1rem就是指定值（html设置为62.5%或者10px时会失效，是因为小于12px或者75%的字体大小不支持换算，这可能与有些浏览器不支持12px以下的大小有关）。所以，使用rem单位，html的字体默认字体大小必须设置为12px或以上。若小于12px则浏览器换算时自动默认字体为12px")]),t._v(" "),e("p",[t._v("(2)lib-flexible 插件实现")]),t._v(" "),e("h1",{attrs:{id:"_2-computed和watch的区别-什么时候用computed-什么时候用watch-比较合适"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-computed和watch的区别-什么时候用computed-什么时候用watch-比较合适"}},[t._v("#")]),t._v(" 2.computed和watch的区别?什么时候用computed 什么时候用watch 比较合适？")]),t._v(" "),e("p",[t._v("​\t"),e("strong",[t._v("computed计算属性，也就是依赖某个值或者props通过计算得来数据；")])]),t._v(" "),e("p",[t._v("​\t\t1）变量不在 data中定义，而是定义在computed中，写法跟写方法一样，有返回值。函数名直接在页面模板中渲染，不加小括号")]),t._v(" "),e("p",[t._v("​\t\t2）根据传入的变量的变化 进行结果的更新。")]),t._v(" "),e("p",[t._v("​\t\t3）计算属性基于响应式依赖进行缓存。如其中的任意一个值未发生变化，它调用的就是上一次计算缓存的数据，因此提高了程序的性能。而methods中每调用一次就会重新计算一次，为了进行不必要的资源消耗，选择用计算属性。")]),t._v(" "),e("p",[t._v("​\t"),e("strong",[t._v("watch监听器，可以监听某一个数据，然后执行相应的操作；")])]),t._v(" "),e("p",[t._v("​\t\t1）计算属性的时候 初始化的时候就可以被监听到并且计算 但是watch是发生改变的时候才会触发。")]),t._v(" "),e("p",[t._v("​\t\t2）当有一些数据需要随着其它数据变动而变动时，或者当需要在数据变化时执行异步或开销较大的操作时，使用 watch。")]),t._v(" "),e("p",[t._v("​\t总结：")]),t._v(" "),e("p",[t._v("​\t\t1）计算属性变量在computed中定义，属性监听在data中定义。")]),t._v(" "),e("p",[t._v("​\t\t2）计算属性是声明式的描述一个值依赖了其他值，依赖的值改变后重新计算结果更新DOM。属性监听的是定义的变量，当定义的值发生变化时，执行相对应的函数。")]),t._v(" "),e("p",[t._v("​\t\t     当多个属性影响一个属性的时候，建议用computed;当一个值发生变化之后，会引起一系列的操作，这种情况就适合用watch；")]),t._v(" "),e("h1",{attrs:{id:"_3-v-for中的key是用来做什么的-不使用的话会造成什么-v-for中的key的理解"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-v-for中的key是用来做什么的-不使用的话会造成什么-v-for中的key的理解"}},[t._v("#")]),t._v(" 3.v-for中的key是用来做什么的，不使用的话会造成什么/v-for中的key的理解？")]),t._v(" "),e("p",[t._v("需要使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点,主要是为了高效的更新虚拟DOM。另外vue中在使用相同标签名元素的过渡切换时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果")]),t._v(" "),e("h1",{attrs:{id:"_4-vue双向绑定的原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-vue双向绑定的原理"}},[t._v("#")]),t._v(" 4.VUE双向绑定的原理")]),t._v(" "),e("p",[t._v("vue 双向数据绑定是通过数据劫持结合发布订阅模式的方式来实现的，也就是说数据和视图同步，数据发生变化，视图跟着变化，视图变化，数据也随之发生改变")]),t._v(" "),e("h1",{attrs:{id:"_5-如何理解mvvm模式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-如何理解mvvm模式"}},[t._v("#")]),t._v(" 5.如何理解MVVM模式")])])}),[],!1,null,null,null);v.default=_.exports}}]);