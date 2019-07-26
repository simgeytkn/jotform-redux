import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getForm,orderComplete, orderDetails, changeTitle } from './action/index';
import './style.css';
import { debounce } from './throttle';
import { Link } from 'react-router-dom';
import { Grid, Icon, Menu, Input, Image } from 'semantic-ui-react';

class Home extends Component {
    constructor(props){
        super(props);
        this.error = false
        this.test = this.test.bind(this)
        this.state={
            offset: 0,
            apiKey: '',
            head: ''
        }
        this.convertOrder = this.convertOrder.bind(this)

        window.addEventListener('scroll', debounce(this.callback, 100));
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.debounce)
    }
    
    callback = () => {
    /*    if((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight-1000
         && !(window.pageYOffset < document.body.scrollHeight-1000)){
            if(this.props.form.length > this.state.offset){
                this.setState({
                    offset: this.state.offset + 5
                },this.test)
            }
        }*/
    }
 
    convertOrder = () => (e) => {
        var formTitle = e.title
        console.log("Form Title: ", e.title)
        if(e.title.includes('Order') === false){
            var title = {
                text: formTitle + "(Order)"
            }            
        }else{
            alert("It is ordered")
            var title = {
                text: formTitle
            }
        }

        this.setState({
            head: formTitle
        })
        this.props.orderComplete(this.state.apiKey,e.id)
        this.props.orderDetails(this.state.apiKey,e.id)
        this.props.changeTitle(this.state.apiKey,e.id,title.text)  
    }

    inputKey = (e) => {
        const new_apiKey = e.target.value
        this.setState({
            apiKey: new_apiKey
        })
        
    }
    test = () => {
        this.props.getForm(this.state.apiKey,this.state.offset)
    }

    scroll = (e) => {
        var element = e.target
        console.log(e.target.scrollTop)
        if(element.scrollHeight - element.scrollTop === element.clientHeight){
           if(this.props.form.length > this.state.offset ){
               this.setState({
                   offset: this.state.offset + 10
               },this.test)
           }}
    }
    render(){
        if(!this.error){
            return(
                <div className="search">
                    <Grid centered>
                        <Grid.Column width={4}>
                            <Input icon={{ name: 'search', circular: true, link: true }} placeholder='Enter API Key' id="apiKey" onBlur={this.inputKey} defaultValue="c9200350c71441cc7e2ad48f7f0f7d21"/>
                        </Grid.Column>
                        <Grid.Column width={2}>
                        <Link to='/'> 
                                <button className="enterButton" onClick={this.test}>
                                    Enter
                                </button>
                            </Link> 
                        </Grid.Column>
                    </Grid>

                    {this.props.form.length ?
                    <Grid className="context">
                          <Grid.Column id="borderRight" width={4} >
                            <Image className="podo" src="https://cdn.jotfor.ms/assets/img/memberkit/user_guide_images/f1.png?v=0.2" circular/>
                            <Menu text vertical className="leftMenu">
                                <Menu.Item>
                                    <Link to="order" onClick={this.test} className="links">
                                        <span>ORDERED</span>
                                        <Icon name='angle right' />
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to="normal" onClick={this.test} className="links">
                                        <span>NORMAL</span>
                                        <Icon name='angle right' />
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column width={10}> 
                            <ul onScroll={this.scroll}>   
                                {this.props.form.map((el,index) => 
                                    <li key={index} id={el.id}>
                                        {el.title}
                                        {console.log(el.title)}
                                        <div className="buttons">
                                            {el.title.indexOf('Order') === -1 ? <button title={el.title} id={el.id} onClick={() => this.convertOrder(el)}>Convert To Order Form</button>
                                            : <button title={el.title} id={el.id}>View Order</button>
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
}

const mapStateToProps = (state,ownProps) => {
    console.log("ownProps.form: ",ownProps.match.path)
    console.log(state)
    return {
        form: ownProps.match.path === '/' ? state.forms  : null  ||
                ownProps.match.path === '/order' ? state.ordered : null ||
                ownProps.match.path === '/normal' ? state.normal : null
    }
}

export default connect(
    mapStateToProps,
    { getForm,orderComplete,orderDetails, 
    changeTitle}
)(Home);


