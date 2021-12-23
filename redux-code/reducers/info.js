const initState = {
    name: '',
    description: ''
}
export default function (state, action) {
    switch (action.type) {
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.description
            }
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return {
                ...state
            }
    }
}



