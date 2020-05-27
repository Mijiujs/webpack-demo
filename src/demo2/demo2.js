// demo2 图片,css相关
import createAvatar from './createAvatar.js'
import avatar from './avatar.jpg'
import style from './index.scss'
createAvatar()
let img = new Image()
img.src = avatar
img.classList.add(style.avatar) // css模块化引入
let dom = document.getElementById('root')
dom.append(img)