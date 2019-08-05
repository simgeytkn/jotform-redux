import { combineReducers } from 'redux';
import form from './form'
import order from './order'
import normal from './normal'
import offset from './offset'
import view from './view'
import edit from './edit'

export default combineReducers({
    forms: form,
    ordered: order,
    normal: normal,
    offset: offset,
    view: view,
    edit: edit
});