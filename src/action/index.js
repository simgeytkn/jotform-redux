import jotformapi from '../api/jotformapi';

export const getForm = (apiKey,offset,maxOffset) => async dispatch => {
    const response = await jotformapi.get('/user/forms?apiKey='+apiKey+'&offset='+offset+'&limit=10');
    if(response.data.content.length !== 0){
    var order =  response.data.content.filter(el => 
        el.title.indexOf('Order') !== -1
    )
    var normal_form = response.data.content.filter(el => 
        el.title.indexOf('Order') === -1
    )

    dispatch({
        type: 'GET_FORM',
        payload: {
            all: response.data.content,
            ordered: order,
            normal: normal_form
        }
    })}
}

export const orderComplete = (apiKey,formId) => async dispatch => {
    const questions =  [
        {
            type: "control_checkbox",
            text: "Order Complited",
            options: "Completed",
            name: 'app_order_complited'
        }
    ]
    await jotformapi.put('/form/'+formId+'/questions?apiKey='+apiKey, {questions});
}

export const orderDetails = (apiKey,formId) => async dispatch => {
    const questions = [
        {
            type: "control_textarea",
            text: "Order Textarea",
            name: "orderDetails"
        }
    ]
    await jotformapi.put('/form/'+formId+'/questions?apiKey='+apiKey, {questions});
}

export const changeTitle = (apiKey,formId,new_text) => async dispatch => {
    const properties = {
        title: new_text
    }
    await jotformapi.put('/form/'+formId+'/properties?apiKey='+apiKey, {properties});
    console.log("hiiiiiiiiiiiiiii")
}
