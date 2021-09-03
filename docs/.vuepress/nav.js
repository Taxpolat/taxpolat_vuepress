module.exports = [{
    text: 'Home',
    link: '/',
    icon: 'reco-home'
  }, {
    text: '笔记',
    link: '/records/',
    items: [{
      text: 'vue',
      link: '/records/vue/notes/VueBasic'
    }, ]
  }, {
    text: '工具',
    items: [{
        text: '实用工具',
        items: [{
            text: '制作icon图标',
            link: 'https://www.bitbug.net/'
          },
          {
            text: 'vuepress-theme-reco官网',
            link: 'https://vuepress-theme-reco.recoluan.com/'
          }, {
            text: '文本转换',
            link: 'http://www.esjson.com/'
          },
          {
            text: '前端工具',
            link: 'https://www.codercto.com/tool.html'
          }
        ]
      },
      {
        text: '在线学习',
        items: [{
            text: '牛客网刷题',
            link: 'https://www.nowcoder.com/'
          },
          {
            text: '阮一峰',
            link: 'https://www.ruanyifeng.com/blog/javascript/'
          },
          {
            text: 'MDN教程',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web'
          },
          {
            text: 'TypeScript',
            link: 'https://typescript.bootcss.com/'
          },
          {
            text: 'Vue官网',
            link: 'https://cn.vuejs.org/'
          },
          {
            text: 'React官网',
            link: 'https://zh-hans.reactjs.org/'
          }
        ]
      },
    ],
  },
  {
    text: '时间轴',
    link: '/timeline/',
    // icon: 'reco-date'
  },
  {
    text: '关于我',
    items: [{
      text: 'Github',
      icon: 'reco-github',
      link: 'https://github.com/Taxpolat',
    }]
    // icon: 'reco-date'
  },
]