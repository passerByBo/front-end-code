const loggerMiddleware = (store) => (next) => (action) => {
    try {
        next(action);
    } catch (error) {
        console.log(error)
    }
}

export default loggerMiddleware;