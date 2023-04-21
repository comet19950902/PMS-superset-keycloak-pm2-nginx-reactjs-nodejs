import React from 'react'
import ReactDOM from 'react-dom'
 import reportWebVitals from './reportWebVitals'
import App from './App'
import {store} from "./Redux/store";
import './index.css'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

 reportWebVitals()
