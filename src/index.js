// webpack是模块打包工具

// demo1
// let Header = require('./demo1/header.js') // CommonJS引入方式
// import Content from './demo1/content.js' // ES Moudule 模块引入方式
// new Header()
// new Content()

// demo2 图片,css相关
// import createAvatar from './demo2/createAvatar.js'
// import avatar from './demo2/avatar.jpg'
// import style from './demo2/index.scss'
// createAvatar()
// let img = new Image()
// img.src = avatar
// img.classList.add(style.avatar) // css模块化引入
// let dom = document.getElementById('root')
// dom.append(img)

// demo3 字体文件
import './demo3/index.css'
let root = document.getElementById('root')
root.innerHTML = '<div class="iconfont iconicon-test3">abc</div>'

