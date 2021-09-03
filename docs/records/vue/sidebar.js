// const path = require('path')
// const files =require.context('./notes', false, /\.md$/)
// const modules = {}
// files.keys().forEach(key => {
//     const name = path.basename(key, '.md')
//     modules[name] = files(key).default || files(key)
// })
// console.log(modules, '-----modules')
module.exports = [{
    title: 'Vue框架',
    collapsable: false,
    children: [
        '/records/vue/notes/VueBasic',
        '/records/vue/notes/Vuex',
        '/records/vue/notes/VueRouter',
        '/records/vue/notes/Questions'
    ]
}]