import React, { Component } from 'react';
import Home from './Home';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom'
import Script from 'react-load-script';

class App extends Component {
  state={
    apiKey: false,
  }
  render() {
    if(!this.state.apiKey){
      return (
        <Script url="https://js.jotform.com/JotForm.js" onLoad={(e) =>{
          window.JF.login(()=>this.setState({apiKey: window.JF.getAPIKey()}))
        }} />
      )
    }
    console.log("JF",this.state.apiKey)
    return (
      <div className="App">    
          <div className="logo">
          <img src='https://www.jotform.com/resources/assets/logo/jotform-logo-dark-800x400.png'  />
          </div>
            <Router>
              <Switch>  
                <Route path='/' exact render={(routeProps) => (<Home {...routeProps} apiKey={this.state.apiKey} />)} />
                <Route path='/order' render={(routeProps) => (<Home {...routeProps} apiKey={this.state.apiKey} />)}/>
                <Route path='/normal' render={(routeProps) => (<Home {...routeProps} apiKey={this.state.apiKey} />)} />
              </Switch>
            </ Router>
      </div>
    );
  }
}

export default App;
