export default (state = [], action) => {
    if(action.type === 'GET_FORM')
        return [...state,...action.payload.ordered];

    if(action.type === 'ADD_ITEM'){
        if(action.payload.normal.filter(res => console.log(res.title+'(Order)' === action.payload.title))){
            return [...state,action.payload]
        }
    }
    return state;
}