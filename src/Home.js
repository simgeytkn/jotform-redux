import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewOrder from './ViewOrder'
import { getForm,orderComplete, changeTitle, swap, offset, submission } from './action/index';
import './style.css';
import { debounce } from './throttle';
import { Link } from 'react-router-dom';
import { Grid, Icon, Menu, Input, Image,Button, Modal } from 'semantic-ui-react';
import Script from "react-load-script";

class Home extends Component {
    constructor(props){
        super(props);
        console.log("Props: ",props)
        this.error = false
        this.state={
            apiKey: window.JF.getAPIKey(),
            open: false,
            counter: 0,
            activeItem: 'all'
        }
        this.convertOrder = this.convertOrder.bind(this)
    }

    handleConfirm = () => this.setState({ open: false })
    handleCancel = () => this.setState({ open: false })

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentWillUnmount() {
        window.removeEventListener('scroll', this.debounce)
    }

    convertOrder = (el)  => {
        var formTitle = el.title
        if(el.title.includes('Order') === false){
            var title = {
                text: formTitle + "(Order)"
            }            
        }else{
            var title = {
                text: formTitle
            }
        }

        this.setState({
            head: formTitle
        })
        
        this.props.orderComplete(this.state.apiKey,el.id)
        this.props.changeTitle(this.state.apiKey,el.id,title.text) 
        this.props.swap(el.id,title.text)
    }

    viewOrder = (el) => {
        this.props.submission(el.id,this.state.apiKey)
    }

    inputKey = (e) => {
        const new_apiKey = e.target.value
        this.setState({
            apiKey: new_apiKey
        })
        
    }

    componentDidMount(){
        this.props.getForm(this.state.apiKey,this.props.offset)
    }

    scroll = (e) => {
        var element = e.target
        if(element.scrollHeight - element.scrollTop === element.clientHeight){
            this.props.getForm(this.state.apiKey,this.props.offset)
        }
        
    }

    render(){
        const { activeItem } = this.state.activeItem
        return( 
            <div className="search">              
                {this.props.form.length ?
                <Grid className="context">
                <Grid.Column className="left" width={3}>
                    <Image className="podo" src="https://cdn.jotfor.ms/assets/img/memberkit/user_guide_images/f1.png?v=0.2" circular/>
                    <Menu id="leftMenu"  fluid vertical tabular>
                        <Menu.Item name='order'>
                            <Link to="order" onClick={this.getForm} className="links">
                                <span>ORDERED</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item name='normal'>
                            <Link to="normal" onClick={this.getForm} className="links">
                                <span>NORMAL</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item
                        name='all'>
                            <Link to="/" onClick={this.getForm} className="links">
                                <span>ALL</span>
                            </Link>
                        </Menu.Item>
                  </Menu>
                </Grid.Column>
        
                <Grid.Column className="content" stretched width={13}>
                <ul onScroll={this.scroll}>   
                    {this.props.form.map((el,index) => 
                    <li key={index} id={el.id}>
                        {el.title}
                        <div className="buttons">
                            {el.title.indexOf('Order') === -1 ? 
                                <Button title={el.title} id={el.id} onClick={() => this.convertOrder(el)}>
                                    Convert To Order Form  
                                </Button>
                                : <div>
                                <Modal trigger={<Button className='mr40' onClick={() => this.viewOrder(el)}>View Order</Button>} size='fullscreen' dimmer='blurring'>
                                    <ViewOrder
                                        submission={this.props.view}
                                        apiKey={this.state.apiKey}
                                        viewPropID={this.props.view.map(el => el.id)}
                                        viewPropAnswer={this.props.view.map(el => el.answers)}
                                    />                                            
                                </Modal>
                                </div>
                            }
                        </div>
                    </li>
                    )} 
                </ul>
                </Grid.Column>
              </Grid> : null } 
            </div>
        )
        
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        form: ownProps.match.path === '/' ? state.forms  : null  ||
                ownProps.match.path === '/order' ? state.ordered : null ||
                ownProps.match.path === '/normal' ? state.normal : null,
        offset : state.offset,
        view : state.view
    }
}

export default connect(
    mapStateToProps,
    { getForm,orderComplete, 
    changeTitle,swap,offset,submission}
)(Home);


