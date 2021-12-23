const setName = (name) => {
    return {
        type: 'SET_NAME',
        name
    }
}

const setDescription = (description) => {
    return {
        type: 'SET_DESCRIPTION',
        description
    }
}

export {
    setName,
    setDescription
}