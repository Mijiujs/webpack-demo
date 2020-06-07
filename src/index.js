function getComponent() {
    return import(/*webpackChunkName:'lodash'*/'lodash').then(() => {
        let element = document.createElement('div')
        element.innerHTML = _.join(['l', 'pr'], '-')
        return element
    })
}
document.addEventListener('click', () => {
    getComponent().then(element => {
        document.body.appendChild(element)
    })
})
