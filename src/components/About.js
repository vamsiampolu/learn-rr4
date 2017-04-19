import React from 'react';
import withQs from '../containers/queryParams'

function About (props) {
  const { match } = props;
  console.log(match);
  return (<div><h2>About</h2></div>);
}

const AboutContainer = withQs(About);
export default AboutContainer;
