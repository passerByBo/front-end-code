const exceptionMiddleware = (store) => (next) => (action) => {
    console.log('this.state', store.getState())
    console.log('action', action.type)
    next(action)
    console.log('next state', store.getState())
}


export default exceptionMiddleware;