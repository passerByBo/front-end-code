import compose from './compose.js'
export default function applyMiddlewares(...middlewares = []) {
    return (oldCreateStore) => {
        return (reducer, initState) => {
            const store = oldCreateStore(reducer, initState);
            const simpleStore = {
                getState:store.getState
            }
            const chain = middlewares.map((middleware) => middleware(simpleStore));
            const dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}