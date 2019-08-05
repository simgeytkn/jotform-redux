import jotformapi from '../api/jotformapi';
import limit from '../values'
export const getForm = (apiKey,offset) => async (dispatch, test) => {
    const response = await jotformapi.get('/user/forms?apiKey='+apiKey+'&offset='+offset+'&limit='+limit);
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
        })
        dispatch({
            type: 'OFFSET'
        })
    }
}

export const orderComplete = (apiKey,formId) => async dispatch => {
    const questions =  [
        {
            type: "control_radio",
            text: "Order Complited",
            options: "Complited",
            name: 'app_order_complited'
            //hidden: "Yes"
        },
        {
            type: "control_textarea",
            text: "Order Textarea",
            name: "orderDetails"
            //hidden: "Yes"
        }
    ]
    await jotformapi.put('/form/'+formId+'/questions?apiKey='+apiKey, {questions});
}


export const changeTitle = (apiKey,formId,new_text) => async (dispatch) => {
    const properties = {
        title: new_text
    }
    await jotformapi.put('/form/'+formId+'/properties?apiKey='+apiKey, {properties});
}

export const swap = (id,title) => async dispatch => {
    const response = await jotformapi.get('/user/forms?apiKey='+'c9200350c71441cc7e2ad48f7f0f7d21');
    if(response.data.content.length !== 0){
        var order =  response.data.content.filter(el => 
            el.title.indexOf('Order') !== -1
        )
        var normal_form = response.data.content.filter(el => 
            el.title.indexOf('Order') === -1
        )
    }
    dispatch({
        type: 'ADD_ITEM',
        payload: {
            id: id,
            title: title,
            ordered: order,
            normal: normal_form
        }
    })
    dispatch({
        type: 'REMOVE_ITEM',
        payload: {
            id: id,
            title: title
        }
    })
}

export const submission = (formId,apiKey) => async dispatch => {
    const response = await jotformapi.get('/form/'+formId+'/submissions?apiKey='+apiKey)
    console.log("Response : ", response)
    dispatch({
        type: 'VIEW_ORDER',
        payload: response.data.content
        
    })
}

export const editAnswers = (apiKey, submissionID, orderDetailInput,orderKey,radioKey, radio) => async dispatch => {
    console.log("Key: ", radioKey)

    const submission = {
        [orderKey] : { orderDetails: orderDetailInput },
        [radioKey] : {app_order_complited: radio}
    };

    await jotformapi.post('/submission/'+submissionID+'?apiKey='+apiKey, submission)
    const response = await jotformapi.get('/submission/'+submissionID+'?apiKey='+apiKey)
    console.log("Response: ", response)

}

export const getNewSubmission = (apiKey,submissionID) => async dispatch => {
    const getNew = await jotformapi.get('/submission/4408050758501348473?apiKey=2408efdd6d5f8512c44907b94c5626a6')
    console.log(getNew)
    dispatch({
        type: 'NEW',
        payload: getNew.data.content.answers
    })
}