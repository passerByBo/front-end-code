export default function combineReducers(reducers) {
    let reducerKeys = Object.keys(reducers);
    return function combination(state, action) {
        let nextState = {};
        for (let key of reducerKeys) {
            let reducer = reducers[key]
            let preStateForKey = state[key];
            let nextStateForKey = reducer(preStateForKey,action);
            nextState[key] = nextStateForKey;
        }

        return nextState;
    }
}