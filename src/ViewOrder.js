import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Header, Modal, Table, Segment, Loader,
     Dimmer, Icon, Button, Image } from 'semantic-ui-react'
import { submission } from './action';
import EditSubmission from './EditSubmission'

const notAllowdItems = ['control_head', 'control_button', 'control_text'];

class ViewOrder extends Component{
    constructor(props){
        super(props)
        this.state = {
            answer: [],
            counter: 0,
            id: 0
        }
    }

    generateColNames = (submission) => {
        let colNames = Object.keys(submission).map( (submissionKey) => {
            let currentSubmission = submission[submissionKey]
            if (notAllowdItems.indexOf(currentSubmission.type) < 0)
                return { text: currentSubmission.text, dataKey: submissionKey}
            return undefined
        })
        colNames = colNames.filter( (el) => el !== undefined)
       return colNames
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.viewPropAnswer !== this.props.viewPropAnswer){
            this.setState({
                answer: nextProps.viewPropAnswer
            })
            if(!nextProps.viewPropAnswer.length){
                this.setState({
                    counter: 1
                })
            }
        }
    }

    render() {
        return(
            <div>
                <Header icon='tasks' className='tableColor' content='Submissions of Form' />
                <Modal.Content className='p15'>  
                    {this.state.answer.length ? 
                    <Table>
                        <Table.Header>
                        <Table.Row>
                            { this.generateColNames(this.state.answer[0]).map((el,key) => 
                            <Table.HeaderCell key={key}>
                                { el.text }
                            </Table.HeaderCell> 
                        )}

                            <Table.HeaderCell>
                                Edit Order Details
                            </Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.state.answer.map((el,index) => el !== undefined ?
                            <Table.Row key={index}> 
                            {this.generateColNames(this.state.answer[0]).map( (sub) => {
                                let element = el[sub.dataKey]
                                return <Table.Cell> { element && element.answer ?  element.answer
                                                : null} </Table.Cell> 
                            })}
                                <Table.Cell>
                                    <Modal className="modalEdit" trigger={<Button key={index} className='mr40'><Icon name='edit' /></Button>} dimmer='blurring'>
                                        <EditSubmission 
                                            apiKey={this.props.apiKey} 
                                            keyProp={index} 
                                            submissionDetails={this.props.submission[index]} 
                                            submissionID={this.props.viewPropID[index]}
                                            />
                                    </Modal>
                                </Table.Cell>
                            </Table.Row>
                                : null)}
                        </Table.Body>
                    </Table>    
                    : !this.state.counter ? <Segment>

                                <Dimmer active inverted>
                                <Loader size='medium'>Loading</Loader>
                                </Dimmer>
                                <Image  />
                                <Image />
                </Segment> : <div>
                                <h2 className="noSubmission">
                                <div><Icon name="inbox" /></div> NO SUBMISSON</h2>
                            </div>
                
                }
                </Modal.Content>
            </div>
        )
    }
}
export default ViewOrder;