import React, { Component } from 'react'
import { Grid, Button, Checkbox, Header, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {editAnswers, getNewSubmission, submission} from './action/index';
import { isNull } from 'util';

class EditSubmission extends Component {
    constructor(props){
        super(props)
        this.state = {
            edit_text: Object.values(this.props.submissionDetails.answers).map(el => el.name==='orderDetails' ? el.answer : null).filter(el => el!==null)[0]
        }
        console.log(this.props.submissionDetails.answers)
    }

    componentWillUnmount(){
        console.log("API: ",this.props.apiKey,"SubmissionID: ",this.props.submissionID)
        this.props.getNewSubmission(this.props.apiKey, this.props.submissionID);
        this.props.submission(this.props.submissionDetails.form_id,this.props.apiKey);
    }

    textareaChange = (e) => {
        this.setState({
            edit_text: e.target.value
        })
    }

    edit = () => {
        const submissionAnswers = Object.values(this.props.submissionDetails.answers)

       
        
        /* For Text */
        const getKeyText = submissionAnswers.map((el,index) => el.name==='orderDetails' ? Object.keys(this.props.submissionDetails.answers)[index] : null);
        const keyText = getKeyText.filter(el => el !== null)

        /* For Radio */
        const getKeyRadio = submissionAnswers.map((el,index) => el.name==='app_order_complited' ? Object.keys(this.props.submissionDetails.answers)[index] : null);
        const keyRadio = getKeyRadio.filter(el => el !== null)

        console.log("Key: ", keyText)

        if(this.refs.check_me.state.checked===false){
            this.props.editAnswers(this.props.apiKey, this.props.submissionID,this.state.edit_text, keyText, keyRadio, " ");
        }

        else this.props.editAnswers(this.props.apiKey, this.props.submissionID,this.state.edit_text, keyText,keyRadio, "Completed");  
        alert("Changed") 
    }

    render(){
        console.log("Edit Texr: ",this.state.edit_text)
        return(
            <div>
                <Grid className="modalEdit">
                    <Grid.Column className="contentEdit" textAlign='center'>
                        <div>
                            <Header className="editHeader">EDIT ORDER</Header>
                        </div>
                            {
                                Object.values(this.props.submissionDetails.answers).map((el) => el.name === 'app_order_complited' ?
                                <div className="editTexts">
                                    {el.answer===" " ? <Checkbox ref="check_me" label='Completed'/> : <Checkbox ref="check_me"  label='Completed' defaultChecked /> }
                                </div> : null
                            )}
                            <TextArea className="p15" value={this.state.edit_text} onChange={this.textareaChange} />
                            <div className="editTexts"><Button inverted color="orange" onClick={this.edit}>EDIT</Button></div>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        edit: state.edit
    }
}

export default connect(
    mapStateToProps,
    {editAnswers,getNewSubmission, submission}
)(EditSubmission);
