import qs from 'qs'
import React, {Component} from 'react'
import {history} from '../index'

// object.pick (the implementation is borrowed from jonschlinkert/object.pick )

function isObject (val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}

function pick (obj, keys) {
  if (!isObject(obj) && typeof obj !== 'function') {
    return {}
  }

  var res = {}
  if (typeof keys === 'string') {
    if (keys in obj) {
      res[keys] = obj[keys]
    }
    return res
  }

  var len = keys.length
  var idx = -1

  while (++idx < len) {
    var key = keys[idx]
    if (key in obj) {
      res[key] = obj[key]
    }
  }
  return res
}

function addLocationQuery (history) {
  console.log(history.location.search)
  history.location = Object.assign(history.location, {
    query: parseQuery(history.location.search.slice(1))
  })
}

function parseQuery (queryParamsStr, queryKeys) {
  if (queryParamsStr != null) {
    let queryParams = qs.parse(queryParamsStr)
    // only retrieve accepted query keys from the query
    if (Array.isArray(queryKeys) && queryKeys.length) {
      queryParams = pick(queryParams, queryKeys)
    }
    return queryParams
  }
}

const withQs = queryKeys => BaseComponent => {
  return class WithQs extends Component {
    state = {search: {}}
    componentDidMount () {
      if (
        global != null &&
        global.location != null &&
        global.location.search != null
      ) {
        history.listen(() => {
          addLocationQuery(history)
        })

        // functional setState
        this.setState(state => {
          const {search: prev} = state
          if (history.location.query) {
            const currStr = qs.stringify(history.location.query)
            const prevStr = qs.stringify(prev)
            if (currStr !== prevStr) {
              return {search: history.location.query}
            }
          }
          return state
        })
      }
    }

    render () {
      return <BaseComponent {...this.state} {...this.props} />
    }
  }
}

export default withQs
