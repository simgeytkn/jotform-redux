import React, { Component } from 'react'
import { Grid, Button, Checkbox, Header, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {editAnswers, getNewSubmission, submission} from './action/index';
import { isNull } from 'util';

class EditSubmission extends Component {
    constructor(props){
        super(props)
        this.state = {
            edit_text: Object.values(this.props.submissionDetails.answers).map(el => el.name==='orderTextarea' ? el.answer : null).filter(el => el!==null)
        }
        console.log(this.props.submissionDetails.answers)
    }

    componentWillUnmount(){
        console.log("kapandı")
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
        const getKeyText = submissionAnswers.map((el,index) => el.name==='orderTextarea' ? index+1 : null);
        const keyText = getKeyText.filter(el => el !== null)

        /* For Radio */
        const getKeyRadio = submissionAnswers.map((el,index) => el.name==='app_order_complited' ? index+1 : null);
        const keyRadio = getKeyRadio.filter(el => el !== null)

        if(this.refs.check_me.state.checked===false){
            this.props.editAnswers(this.props.apiKey, this.props.submissionID,this.state.edit_text, keyText, keyRadio, " ");
        }

        else this.props.editAnswers(this.props.apiKey, this.props.submissionID,this.state.edit_text, keyText,keyRadio, "Completed");
        alert("Changed")
    }

    render(){
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
                                    {el.answer==='Completed' ? <Checkbox ref="check_me" label='Completed' defaultChecked /> : <Checkbox ref="check_me"  label='Completed' /> }
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