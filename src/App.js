import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'
import {Route, Link, Switch} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Topics from './components/Topics'
import NotFound from './components/NotFound'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li>
              <Link to='/about?some=thing&any=thoughts&many=ideas&no=good&little=rats&never=change'>
                About
              </Link>
            </li>
            <li><Link to='/topics'>Topics</Link></li>
          </ul>
          <hr />

          <Switch>
            <Route
              path='/about'
              render={props => {
                const {match} = props
                return <About match={match} />
              }}
            />
            <Route path='/topics' component={Topics} />
            <Route exact path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
