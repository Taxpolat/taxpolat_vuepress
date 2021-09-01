module.exports = {
  base: '/docs/',
  title: 'Taxpolat的个人空间',
  description: 'Tomorrow is another day. and you can be just the one you wanna be.',
  // dest: './dist',
  port: '4220',
  head: [
    ["rel", {
      rel: "stylesheet",
      href: "/css/style.css"
    }],
    ["text/javascript", {
      charset: "utf-8",
      src: "/js/main.js"
    }],
    ['meta', {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no'
    }]
  ],
  markdown: {
    lineNumbers: true
  },
  theme: 'reco',
  themeConfig: {
    author: 'Taxpolat',
    noFoundPageByTencent: true,
    type: 'blog',
    blogConfig: {
      tag: {
        location: 1, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认文案 “标签”
      }
    },
    // nav: require('./nav.js'),
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    searchMaxSuggestoins: 10,
    serviceWorker: {
      updatePopup: {
        message: "有新的内容.",
        buttonText: '更新'
      }
    },
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页 ！',
  },
  plugins: [
    ['vuepress-plugin-code-copy', true],
    ['vuepress-plugin-helper-live2d', {
      live2d: {
        // 是否启用(关闭请设置为false)(default: true)
        enable: true,
        // 模型名称(default: hibiki)>>>取值请参考：
        // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
        model: 'hibiki',
        display: {
          position: "right", // 显示位置：left/right(default: 'right')
          width: 135, // 模型的长度(default: 135)
          height: 300, // 模型的高度(default: 300)
          hOffset: 65, //  水平偏移(default: 65)
          vOffset: 0, //  垂直偏移(default: 0)
        },
        mobile: {
          show: false // 是否在移动设备上显示(default: false)
        },
        react: {
          opacity: 0.8 // 模型透明度(default: 0.8)
        }
      }
    }]
  ]
}