import React, { Component } from 'react';
import Home from './Home';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="logo">
          <img src='https://www.jotform.com/resources/assets/logo/jotform-logo-dark-800x400.png'  />
          </div>
            <Router>
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/order' component={Home} />
                <Route path='/normal' component={Home} />
              </Switch>
            </ Router>
      </div>
    );
  }
}

export default App;
