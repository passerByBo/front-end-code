const add = {
    init() {
        document.querySelector('#add').addEventListener('click', () => {
            alert('add')
        })
        console.log('add inited')
    }
}

export default add;