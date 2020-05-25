function Content() {
    let dom = document.getElementById('root')
    let content = document.createElement('div')
    content.innerHTML = 'content'
    dom.append(content)
}
// ES6
export default Content