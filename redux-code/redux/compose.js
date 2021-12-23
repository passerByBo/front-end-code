const compose = (...funcs) => {
    if(!funcs || funcs.length === 0){
        return arg => arg
    }
    return funcs.reduce((pre,curr) => (...args) => {
        return pre(curr(...args))
    })
}

export default compose;                          