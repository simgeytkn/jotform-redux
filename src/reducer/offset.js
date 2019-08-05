import limit from '../values'

export default (state = 0, action) => {
    if(action.type === 'OFFSET'){
        state += limit
        return state
    }
    return state
}