const timmerMiddleware = (store) => (next) => (action) => {
    console.log('timmerMiddleware start', +new Date())
    next(action);
    console.log('timmerMiddleware end', +new Date())
}


export default timmerMiddleware;