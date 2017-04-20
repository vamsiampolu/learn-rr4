import qs from 'qs';
import React, { Component, PropTypes } from 'react';
import { compose, lifecycle, withState } from 'recompose';

// object.pick (the implementation is borrowed from jonschlinkert/object.pick )

function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

function pick(obj, keys) {
  if (!isObject(obj) && typeof obj !== 'function') {
    return {};
  }

  var res = {};
  if (typeof keys === 'string') {
    if (keys in obj) {
      res[keys] = obj[keys];
    }
    return res;
  }

  var len = keys.length;
  var idx = -1;

  while (++idx < len) {
    var key = keys[idx];
    if (key in obj) {
      res[key] = obj[key];
    }
  }
  return res;
};

const withQs = (queryKeys) => (BaseComponent) => {
  return class WithQs extends Component {
    constructor(props) {
      super(props);
      this.state = {
        search: {}
      };
    }

    componentDidMount () {
      const { setSearch } = this.props;
      if(global != null && global.location != null && global.location.search != null) {
        const queryParamsStr = global.location.search.slice(1);
        if (queryParamsStr != null) {
          let queryParams = qs.parse(queryParamsStr);
          // only retrieve accepted query keys from the query
          if(Array.isArray(queryKeys) && queryKeys.length) {
            queryParams = pick(queryParams, queryKeys);
          }
          // functional setState
          this.setState((state) => {
            const { search: prev } = state;
            const prevStr = qs.stringify(prev);
            if(queryParamsStr !== prevStr) {
              return { search: queryParams };
            }
            return state;
          });
        }
      }
    }

    render () {
      return (<BaseComponent
          {...this.state}
          {...this.props}
      />);
    }
  }
}

export default withQs

