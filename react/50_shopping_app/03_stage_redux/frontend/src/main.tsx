import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom';
import {Store,applyMiddleware,combineReducers,createStore} from 'redux';
import loginReducer from './reducers/loginReducer';
import shoppingReducer from './reducers/shoppingReducer';
import {AppState,ShoppingAction,RootReducer} from './types/states';
import {Provider} from 'react-redux';
import {thunk} from 'redux-thunk'

const rootReducer = combineReducers<RootReducer>({
	login:loginReducer,
	shopping:shoppingReducer
})

const store:Store<AppState,ShoppingAction> = createStore(rootReducer,applyMiddleware(thunk))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
  </React.StrictMode>,
)
