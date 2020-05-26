// webpack是模块打包工具

let Header = require('./header.js') // CommonJS引入方式
import Content from './content.js' // ES Moudule 模块引入方式

// let avatar = require('../assets/avatar.jpg')
import avatar from '../assets/avatar.jpg'
import './index.scss'
let img = new Image()
img.src = avatar
img.classList.add('avatar')
let dom = document.getElementById('root')
dom.append(img)

console.log(avatar)

new Header()
new Content()
