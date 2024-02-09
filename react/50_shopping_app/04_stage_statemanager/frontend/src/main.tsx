import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom';
import StateManager from './context/StateManager';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
  <StateManager>
    <App />
  </StateManager>
  </BrowserRouter>
  </React.StrictMode>,
)
