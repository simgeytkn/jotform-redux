export default (state = [], action) => {
    if(action.type === 'NEW'){
        state = []
        return {...state,...action.payload}
    }
    return state
}