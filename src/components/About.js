import React from 'react';
import PropTypes from 'prop-types';
import withQs from '../containers/queryParams'

const { string, arrayOf, object } = PropTypes;

function About (props) {
  const { match } = props;
  console.log(match);
  return (<div><h2>About</h2></div>);
}

About.propTypes = {
  match: object,
  queryKeys: arrayOf(string)
};

const AboutContainer = withQs(About);
export default AboutContainer;
