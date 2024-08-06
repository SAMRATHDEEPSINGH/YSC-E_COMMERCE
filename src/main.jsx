import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './app/Store.js'
import { AlertProvider } from './common/AlertContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <AlertProvider>
    <App />
    </AlertProvider>
    </Provider>
  </React.StrictMode>,
)
