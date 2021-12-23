export default function createStore(reducer, initState = {},rewriteCreateStoreFunc) {
    if(rewriteCreateStoreFunc){
        const newCreateStore = rewriteCreateStoreFunc(createStore);
        return newCreateStore(reducer,initState)
    }
    const listeners = [];
    let state = initState;
    let currentReducer = reducer;
    function getState() {
        return state;
    }

    function subscribe(fn) {
        listeners.push(fn);
        return function(){
            let index = listeners.indexOf(fn);
            if(index !== -1){
                listeners.splice(index,1)
            }
        }
    }


    function dispatch(action){
        console.log('dispatch',action)
        state = currentReducer(state,action);
        for (let listener of listeners) {
            listener(state);
        }
    }

    function replaceReducer(newReducer){
        if(typeof newReducer !== 'function'){
            throw new Error('reducer必须为函数')
        }
        currentReducer = newReducer;
        dispatch({type: Symbol()})
    }


    //初始化
    dispatch({type: Symbol()})
    return {
        getState,
        subscribe,
        dispatch,
        replaceReducer,
    }
}