export default (state = [], action) => {
    if(action.type === 'GET_FORM')
        return [...state,...action.payload.normal]
    
    if(action.type === 'REMOVE_ITEM'){
        return [...state.filter(remove => remove.id !== action.payload.id)]
    }
    return state;
}
