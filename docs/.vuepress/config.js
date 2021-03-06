module.exports = {
  title: 'Taxpolat',
  description: 'Tomorrow is another day. and you can be just the one you wanna be.',
  base: '/taxpolat_vuepress/',
  port: '4220',
  head: [
    ["link", {
      rel: "stylesheet",
      href: "/css/style.css"
    }],
    ['link', {
      rel: 'icon',
      href: '/images/favicon.ico'
    }]
  ],
  markdown: {
    lineNumbers: true
  },
  theme: 'reco',
  themeConfig: {
    huawei: true,
    locales: {
      '/': {
        recoLocales: {
          pagation: {
            prev: '上一页',
            next: '下一页',
            go: '前,',
            jump: '跳转至'
          }
        }
      }
    },
    author: 'Taxpolat',
    noFoundPageByTencent: true,
    type: 'blog',
    logo: '/images/114.jpg',
    authorAvatar: '/images/114.jpg',
    blogConfig: {
      tag: {
        location: 2, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认文案 “标签”
      }
    },
    nav: require('./nav.js'),
    sidebar: require('./sidebar.js'),
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
          position: "left", // 显示位置：left/right(default: 'right')
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
    }],
    [
      'cursor-effects',
      {
        size: 2, // size of the particle, default: 2
        shape: 'star', // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
  ]
}