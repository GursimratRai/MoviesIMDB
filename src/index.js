import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './Components/App';
import rootReducer from './Reducers';

//Curry Function
//curried form of function logger(obj,next,action)
//logger(obj)(next)(action) internally by redux.
//Method 1 :
// const logger = function({dispatch,getState}){
//   return function(next){
//     return function(action){
//       //middleware
//       console.log('MIDDLEWARE ACTION TYPE=',action.type);
//       next(action);
//     }
//   }
// }

//Method 2: using arrow function
const logger = ({dispatch,getState}) => (next) => (action) => {
  if(typeof action !== 'function'){
    console.log("MIDDLEWARE ACTION TYPE=",action.type);
  }
  next(action);
}

//handle search 
// const thunk = ({dispatch,getState}) => (next) => (action) => {
//   if(typeof action === 'function')
//   {
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer,applyMiddleware(logger,thunk));
// store.dispatch({
//   type:'ADD_MOVIES',
//   movies: [{name:'Superman'}]
// });
// console.log('after',store);

//Context is used to share state/store between varies components at varies level of depth.
//Without Context we have to pass state/store as props from root to that particular component which is a very tedious task to do.
export const StoreContext = createContext();
console.log('Store context',StoreContext);

class Provider extends React.Component{
  render(){
    const {store} = this.props;
    return <StoreContext.Provider value={store} >
      {this.props.children}
    </StoreContext.Provider>
  }
}

//Implemented connect function
// const connectedAppComponent = connect(callback)(App);
export function connect(callback){
  return function(Component){
      class ConnectedComponent extends React.Component{
      constructor(props){
        super(props);
        this.unsubsribe = this.props.store.subscribe(() => this.forceUpdate());
      }
      componentWillUnmount(){
        this.unsubsribe();
      }
      render(){
          const {store} = this.props;
          const state = store.getState();
          const dataToBePassAsProps = callback(state);
          return (
             <Component {...dataToBePassAsProps} dispatch={store.dispatch}/>
          );
      }
    }
  
  class connectedComponentWrapper extends React.Component{
    render(){
      return (
        <StoreContext.Consumer>
          {(store) => <ConnectedComponent store={store}/> }
        </StoreContext.Consumer>
      );
    }
  }
  return connectedComponentWrapper;
  };
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
