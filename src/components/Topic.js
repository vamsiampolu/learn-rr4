import React from 'react';

export default function Topic (props) {
  const { match } = props;
  return (<div><h3>{match.params.topicId}</h3></div>);
}
