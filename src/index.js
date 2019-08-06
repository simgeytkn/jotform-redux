import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);


/*
window.JF.login(
  function success(){
    ReactDOM.render(
      <Provider store={store}><App /></Provider>,
      document.getElementById('root')
    );
    
  },
  function error(){
    alert("Nope")
  }
)
ReactDOM.render(
  <Provider store={store}><App JF={window.JF} /></Provider>,
  document.getElementById('root')
);

window.JF.login(
  function success(){
    ReactDOM.render(
      <Provider store={store}><App /></Provider>,
      document.getElementById('root')
    );
    
  },
  function error(){
    alert("Nope")
  }
)
*/
