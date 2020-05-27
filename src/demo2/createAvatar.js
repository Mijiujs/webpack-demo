// let avatar = require('../assets/avatar.jpg')
import avatar from './avatar.jpg'
// 如果需要样式也要import style,add(style.avatar)
import style from './index.scss'

function createAvatar() {
    let img = new Image()
    img.src = avatar
    img.classList.add(style.avatar)
    let dom = document.getElementById('root')
    dom.append(img)
}
export default createAvatar