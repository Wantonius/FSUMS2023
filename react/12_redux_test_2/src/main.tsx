import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import contactReducer,{AppState,MyAction} from './reducers/contactReducer';
import {Provider} from 'react-redux';
import {createStore,Store} from 'redux';

const store:Store<AppState,MyAction> = createStore(contactReducer);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <Provider store={store}>
    <App /> 
  </Provider>
  </React.StrictMode>,
)
