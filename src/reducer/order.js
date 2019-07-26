export default (state = [], action) => {
    if(action.type === 'GET_FORM')
        return [...state,...action.payload.ordered]
    return state;
}
