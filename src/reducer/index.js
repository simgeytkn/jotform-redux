import { combineReducers } from 'redux';
import form from './form'
import order from './order'
import normal from './normal'

export default combineReducers({
    forms: form,
    ordered: order,
    normal: normal
});