const initState = {
    count: 0
}
export default function couterReducer(state, action) {
    if(!state){
        state = initState;
    }
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count+1
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count-1
            }
        default:
            return {
                ...state
            }
    }
}