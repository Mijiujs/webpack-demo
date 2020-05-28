// import './style.css'
// let btn = document.createElement('button')
// btn.innerHTML = '新增'
// document.body.appendChild(btn)

// btn.onclick = function () {
//     let div = document.createElement('div')
//     div.innerHTML = 'item'
//     document.body.appendChild(div)
// }

import conunter from './counter.js'
import number from './number.js'

conunter()
number()

// 如果项目开启hot module replacement plugin
if (module.hot) {
    module.hot.accept('./number.js',()=>{
        document.body.removeChild(document.getElementById('number'))
        number()
    })
}