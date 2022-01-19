---
title: 【小程序】uniApp 数据可视化—uchart
date: 2022-01-19
sidebar: 'auto'
author: 'Taxpolat'
categories:
 - 小程序
tags:
 - 小程序
 - 开发技巧
---

## ucharts
::: tip
高性能跨平台图标库，支持H5，APP,小程序（微信小程序，支付宝小程序，钉钉小程序，百度小程序，头条小程序，QQ小程序），Vue,Taro等多个平台及框架,能够解决数据可视化组件 __Echart__
:::

### 优点

- 极简单的调用方式，默认配置下只需要传入图表类型及图表数据即可全端显示。
- 全端全平台支持(可选择uCharts引擎全端渲染，也可指定PC端或APP端单独使用ECharts引擎渲染图表)
- 时也支持datacom组件读取uniClinetDB, 大大缩短开发时间
- 提供强大的[在线配置生成工具](https://demo.ucharts.cn/#/)，可视化中的可视化，鼠标点一点就可以生成图表，可视化从此不再难配
- 小程序端不必担心包体积过大问题

### 快速上手
- `纯uniap`p项目：组件导入方法：进入[DCloud插件市场秋云图表组件页面](https://ext.dcloud.net.cn/plugin?id=271#)点击右侧绿色按钮【使用HBuilderX导入插件】，或者蓝色按钮【使用HBuilderX导入示例项目】查看完整示例工程。
- `依赖uniapp的vue-cli项目`：请将`uni_modules`目录复制到src目录，即`src/uni_modules`。（请升级uniapp依赖为最新版本）
- 页面中直接按下面用法直接调用即可，无需在页面中注册组件`qiun-data-charts`
- 注意父元素class='charts-box'这个样式需要有宽高

#### 示例文件地址
-`/pages/ucharts/ucharts.vue`（展示用uCharts全端运行的例子）   
-`/pages/echarts/echarts.vue`（展示H5和App用ECharts，小程序端用uCharts的例子）   
-`/pages/unicloud/unicloud.vue`（展示读取uniCloud数据库后直接渲染图表的例子）   
-`/pages/updata/updata.vue`（展示动态更新图表数据的例子）   
-`/pages/other/other.vue`（展示图表交互的例子：渲染完成事件，获取点击索引，自定义tooltip，图表保存为图片，强制展示错误信息等）   
-`/pages/format-u/format-u.vue`（展示uCharts的formatter用法的例子）   
-`/pages/format-e/format-e.vue`（展示ECharts的formatter用法的例子）   
-`/pages/tab/tab.vue`（展示再tab选项卡中用法的例子，即父容器采用v-show或v-if时需要注意的问题）   
-`/pages/layout/layout.vue`（展示特殊布局用法的例子：swiper、scroll-view、绝对定位等布局）   
-`/pages/canvas/canvas.vue`（展示uCharts v2.0版本原生js用法的例子）   
### 基本用法
```html
<!-- 举例子 type="area" -->
  <view class="charts-box">
    <qiun-data-charts
      type="area"
      :chartData="chartData"
      :loadingType="0"
      :errorShow="false"
      :echartsH5="true"
      :echartsApp="true"
      :errorReload="false"
      background="#2C6CEC"
      :tooltipShow="false"
      :tapLegend="false"
      :inScrollView="true"
      :opts="areaCoverageOptions"
    />
  </view>
<!-- opts:修改的自定义图表的样式等内容，类似Echart自定义配置 -->
  <script>
    export default {
      data() {
        return {
          chartData:{}
          areaCoverageOptions: {
            type: "area",
            canvasId: "",
            canvas2d: false,
            background: "#2C6CEC",
            animation: true,
            timing: "easeOut",
            duration: 1000,
            color: ["#FFF692", "#fefefe", "#f6f6f6"],
            padding: [15, 15, 0, 15],
            rotate: false,
            errorReload: false,
            fontSize: 13,
            fontColor: "#fff",
            enableScroll: false,
            touchMoveLimit: 60,
            enableMarkLine: false,
            dataLabel: false,
            dataPointShape: true,
            dataPointShapeType: "solid",
            tapLegend: false,
            xAxis: {
              disabled: false,
              axisLine: false,
              axisLineColor: "#fff",
              calibration: false,
              fontColor: "#fff",
              fontSize: 13,
              rotateLabel: false,
              itemCount: 5,
              boundaryGap: "justify",
              disableGrid: true,
              gridColor: "",
              gridType: "solid",
              dashLength: 4,
              gridEval: 1,
              scrollShow: false,
              scrollAlign: "left",
              scrollColor: "#A6A6A6",
              scrollBackgroundColor: "#EFEBEF",
              format: "",
            },
            yAxis: {
              disabled: false,
              disableGrid: false,
              splitNumber: 5,
              gridType: "dash",
              dashLength: 2,
              gridColor: "#fff",
              padding: 10,
              showTitle: false,
              data: [{
                unit: "%",
                min: 0,
                max: 100
              }],
            },
            legend: {
              show: false,
              position: "top",
              float: "center",
              padding: 5,
              margin: 5,
              backgroundColor: "#2C6CEC",
              borderColor: "#2C6CEC",
              borderWidth: 0,
              fontSize: 13,
              fontColor: "#fff",
              lineHeight: 11,
              hiddenColor: "#CECECE",
              itemGap: 10,
            },
            extra: {
              area: {
                type: "curve",
                opacity: 0.9,
                addLine: true,
                width: 2,
                gradient: true,
              },
              tooltip: {
                showBox: true,
                showArrow: true,
                showCategory: false,
                borderWidth: 0,
                borderRadius: 0,
                borderColor: "#000000",
                borderOpacity: 0.7,
                bgColor: "#000000",
                bgOpacity: 0.7,
                gridType: "solid",
                dashLength: 4,
                gridColor: "#CCCCCC",
                fontColor: "#FFFFFF",
                splitLine: true,
                horizentalLine: false,
                xAxisLabel: false,
                yAxisLabel: false,
                labelBgColor: "#FFFFFF",
                labelBgOpacity: 0.7,
                labelFontColor: "#666666",
              },
              markLine: {
                type: "solid",
                dashLength: 4,
                data: [],
              },
            },
          }
        }
      }
    }
  </script>
```
###  组件基本API参数
| 属性名|	类型|	默认值|	必填|	说明|
|:------:|:--:|:--:|:--:|:--:|
|type|	String|	null|	是|	图表类型，如全端用uCharts，可选值为pie、ring、rose、word、funnel、map、arcbar、line、column、bar、area、radar、gauge、candle、mix、tline、tarea、scatter、bubble（您也可以根据需求自定义新图表类型，需要在config-ucharts.js或config-echarts.js内添加，可参考config-ucharts.js内的"demotype"类型）|
|chartData|	Object|	见说明|	是|	图表数据，常用的标准数据格式为{categories: [],series: []}，请按不同图表类型传入对应的标准数据。|
| localdata	|Array|[]	|是|	图表数据，如果您觉得拼接上面chartData比较繁琐，可以通过使用localdata渲染，组件会根据传入的type类型，自动拼接categories或series数据（使用localdata就不必再传入chartData，详见 /pages/other/other.vue 中使用localdata渲染图表的例子）。【localdata和collection（uniCloud数据库）同时存在，优先使用localdata；如果localdata和chartData同时存在，优先使用chartData。即chartData>localdata>collection的优先级渲染图表】。|
|opts|	Object|	{}|否	|uCharts图表配置参数(option)，请参考【[在线生成工具](https://demo.ucharts.cn/#/)】传入opts。注：传入的opts会覆盖默认config-ucharts.js中的配置，只需传入与config-ucharts.js中属性不一致的opts即可实现【同类型的图表显示不同的样式】。|
|eopts	|Object|	{}|	否	|ECharts图表配置参数(option)，请参考【[ECharts配置手册](https://echarts.apache.org/zh/option.html#title)】传入eopts。注：1、传入的eopts会覆盖默认config-echarts.js中的配置，以实现同类型的图表显示不同的样式。2、eopts不能传递function，如果option配置参数需要function，请将option写在config-echarts.js中即可实现。|
|loadingType	|Number|	2|	否|	加载动画样式，0为不显示加载动画，1-5为不同的样式，见下面示例|
|errorShow	|Boolean	|true	|否	|是否启用组件错误提示功能（仅功能启用），true为显示错误提示图片，false时会显示空白区域|
|errorReload	|Boolean	|true|	否	|是否启用点击错误提示图表重新加载，true为允许点击重新加载，false为禁用点击重新加载事件|
|errorMessage|	String|	null|	否|	自定义错误信息，强制显示错误图片及错误信息，当上面errorShow为true时可用。（组件会监听该属性的变化，只要有变化，就会强制显示错误信息！）。说明：1、一般用于页面网络不好或其他情况导致图表loading动画一直显示，可以传任意(不为null或者"null"或者空"")字符串强制显示错误图片及说明。2、如果组件使用了data-come属性读取uniCloud数据，组件会自动判断错误状态并展示错误图标，不必使用此功能。3、当状态从非null改变为null或者空时，会强制调用reload重新加载并渲染图表数据。|
|echartsH5	|Boolean|	false|	否|	是否在H5端使用ECharts引擎渲染图表|
|directory|	String|	'/'|	否|	二级目录名称，如果开启上面echartsH5即H5端用ECharts引擎渲染图表，并且项目未发布在website根目录，需要填写此项配置。例如二级目录是h5，则需要填写"/h5/"，左右两侧需要带"/"，发布到三级或更多层目录示例"/web/v2/h5/"|
|echartsApp|	Boolean|	false|	否	|是否在APP端使用ECharts引擎渲染图表|
|canvasId|	String|	见说明|	否|	默认生成32位随机字符串。如果指定canvasId，可方便后面调用指定图表实例，否则需要通过渲染完成事件获取自动生成随机的canvasId|
|canvas2d|	Boolean|	false|	否	|是否开启canvas2d模式，用于解决微信小程序层级过高问题，仅微信小程序端可用，其他端会强制关闭canvas2d模式注：开启canvas2d模式，必须要传入上面的canvasId（随机字符串，不能是动态绑定的值，不能是数字），否则微信小程序可能会获取不到dom导致无法渲染图表！|
|background|	String|	none|	否|	背景颜色，默认透明none，可选css的16进制color值，如#FFFFFF|
|animation	|Boolean|	true|	否|	是否开启图表动画效果|
|inScrollView|	Boolea|n	false|	否|	图表组件是否在scroll-view中，如果在请传true，否则会出现点击事件坐标不准确的现象|
|pageScrollTop|	Number|	0|	否	|如果图表组件是在scroll-view中，并且整个页面还存在滚动条，这个值应绑定为页面滚动条滚动的距离，否则会出现点击事件坐标不准确的现象|
|reshow	|Boolean|	false	|否|	强制重新渲染属性，如果图表组件父级用v-show包裹，初始化的时候会获取不到元素的宽高值，导致渲染失败，此时需要把父元素的v-show方法复制到reshow中，组件检测到reshow值变化并且为true的时候会强制重新渲染|
|reload	|Boolean|	false|	否|	强制重新加载属性，与上面的reshow区别在于：1、reload会重新显示loading动画；2、如果组件绑定了uniCloud数据查询，通过reload会重新执行SQL语句查询，重新请求网络。而reshow则不会显示loading动画，只是应用现有的chartData数据进行重新渲染|
|disableScroll|	Boolean|	false	|否|	当在canvas中移动时，且有绑定手势事件时，禁止屏幕滚动以及下拉刷新（赋值为true时，在图表区域内无法拖动页面滚动）|
|||	Boolean|	true	|否	|点击或者鼠标经过图表时，是否显示tooltip提示窗，默认显示|
|tooltipFormat|	String|	undefined|	否|	自定义格式化tooltip显示内容，详见下面【tooltipFormat格式化】|
|tooltipCustom	|Object	|undefined	|否|	（仅uCharts）如果以上系统自带的tooltip格式化方案仍然不满足您，您可以用此属性实现更多需求，详见下面【tooltipCustom自定义】|
|startDate	|Object|	undefined	|否|	需为标准时间格式，例如"2021-02-14"。用于配合uniClinetDB自动生成categories使用|
|endDate|	Object	|undefined|	否|	需为标准时间格式，例如"2021-03-31"。用于配合uniClinetDB自动生成categories使用|
|groupEnum|	Array	|[]	|否	|当使用到uniCloud数据库时，group字段属性如果遇到统计枚举属性的字段，需要通过将DB Schema中的enum的描述定义指派给该属性，具体格式为[{value: 1,text: "男"},{value: 2,text: "女"}]|
|textEnum	|Array	|[]	|否|	当使用到uniCloud数据库时，text字段属性如果遇到统计枚举属性的字段，需要通过将DB Schema中的enum的描述定义指派给该属性，具体格式为[{value: 1,text: "男"},{value: 2,text: "女"}]|
|ontap|	Boolean|	true|	否	|是否监听@tap@cilck事件，禁用后不会触发组件点击事件|
|ontouch	|Boolean	|false	|否	|（仅uCharts）是否监听@touchstart@touchmove@touchend事件（赋值为true时，非PC端在图表区域内无法拖动页面滚动）|
|onmouse	|Boolean	|true	|否|	是否监听@mousedown@mousemove@mouseup事件，禁用后鼠标经过图表上方不会显示tooltip|
|onmovetip	|Boolean	|false	|否	|（仅uCharts）是否开启跟手显示tooltip功能（前提条件，1、需要开启touch功能，即:ontouch="true"；2、并且opts.enableScroll=false即关闭图表的滚动条功能）（建议微信小程序开启canvas2d功能，否则原生canvas组件会很卡）|
|tapLegend	|Boolean|	true|	否	|（仅uCharts）（仅uCharts）是否开启图例点击交互事件|

### 配置图标说明
:::danger
- 注意!!，`config-echarts.js`和`config-ucharts.js`内只需要配置符合您项目整体UI的整体默认配置，根据需求，先用【[在线生成工具](https://demo.ucharts.cn/#/)】调试好默认配置，并粘贴到配置文件中。
- 如果需要与configjs中不同的配置，只需要在组件上绑定:opts或者:eopts传入与默认配置不同的某个属性及值即可覆盖默认配置，极大降低了代码量。
- 自定义配置同第二点 ， 将【[在线生成工具](https://demo.ucharts.cn/#/)】调试好的`配置代码config-ucharts.js`复制到`组件上绑定:opts`传给组件。
:::

### 通过接口数据更新图标

#### 需要将组件`chartData`对象的变量整体重新赋值，   
如：   
```vue
<view class="charts-box">
  <qiun-data-charts type="column" :chartData="chartData" />
</view>
<script>
    export default {
      data() {
        return {
          chartData:{
            categories:['2016','2017','2018','2019','2020','2021'],
            series:[{
              name:'目标值',
              data:[35, 36, 31, 33, 13, 34]
            },{
              name:'完成量',
              data:[18, 27, 21, 24, 6, 28]
            }]
          }
        }
      }
    }
</script>
```
- 如果获取后台数据以后直接修改`chartData`的下面的数据，是不会生效的！。
  如：
```js
fetchData() {
  // response为后台接口获取的数据
  let data  = response.data
  this.chartData.series[0].data = data
}
```
__这样写是不会生效的！！！不会重新渲染！！！__   
__正确写法：__
```js
fetchData() {
  // response为后台接口获取的数据
  let data  = response.data
  const chart = {
    categories:['2016','2017','2018','2019','2020','2021'],
    series:[{
      name:'目标值',
      data:data
    },{
      name:'完成量',
      data:data
    }]
  }
  this.chartData = chart
}
```