import qs from 'qs';
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

const withQs = compose(
  withState('search', 'setSearch', {}),
  lifecycle({
    componentDidMount: function () {
      // works on the client side; server side implementation is specific to server
      const { setSearch, queryKeys } = this.props;
      if(global != null && global.location != null && global.location.search != null) {
        const queryParamsStr = global.location.search.slice(1);
        if (queryParamsStr != null) {
          let queryParams = qs.parse(queryParamsStr);
          // only retrieve accepted query keys from the query
          if(Array.isArray(queryKeys) && queryKeys.length) {
            queryParams = pick(queryParams, queryKeys);
          }
          // dispatch to redux instead of using setState here
          setSearch(prev => {
            const prevStr = qs.stringify(prev);
            if(queryParamsStr !== prevStr) {
              return queryParams;
            }
            return prev;
          });
        }
      }
    }
  }),
);

export default withQs

