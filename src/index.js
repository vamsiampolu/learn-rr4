import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import createBrowserHistory from 'history/createBrowserHistory'
import {Router} from 'react-router'

export const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}><App /></Router>,
  document.getElementById('root')
)
