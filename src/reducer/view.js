export default (state = [], action) => {
    if(action.type === 'VIEW_ORDER'){
        state = []
        return [...state,...action.payload]
    }
    return state;
}