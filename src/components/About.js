import React from 'react';
import PropTypes from 'prop-types';
import withQs from '../containers/queryParams'

const { string, arrayOf, object } = PropTypes;

function About (props) {
  const { match, search } = props;
  console.log(match);
  return (<div>
    <h2>About</h2>
    <pre>{`${JSON.stringify(search).trim()}`}
    </pre>
  </div>);
}

About.propTypes = {
  match: object,
  queryKeys: arrayOf(string)
};

const queryKeys = ['some', 'many', 'any', 'few' ,'little' ];
const AboutContainer = withQs(queryKeys)(About);
export default AboutContainer;
