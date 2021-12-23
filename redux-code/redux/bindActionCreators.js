function bindActionCreator(actionCreator,dispatch){
    return (...args) => {
        return dispatch(actionCreator.apply(this,args));
    }
}

export default function bindActionCreators(actionCreators, dispatch){
    let boundActionCreators = Object.create(null)
    let keys = Object.keys(actionCreators);
    for(let key of keys){
        const actionCreator = actionCreators[key];
        if(typeof actionCreator === 'function'){
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
        }
    }

    console.log(boundActionCreators)
    return boundActionCreators;
}