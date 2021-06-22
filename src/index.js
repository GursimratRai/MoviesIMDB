import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import './index.css';
import App from './Components/App';
import movies from './Reducers';

const store = createStore(movies);
// console.log('before',store.getState());
// store.dispatch({
//   type:'ADD_MOVIES',
//   movies: [{name:'Superman'}]
// });
// console.log('after',store);

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);
