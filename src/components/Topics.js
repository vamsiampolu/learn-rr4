import React from 'react';
import { Link, Route } from 'react-router-dom';
import Topic from './Topic';

const SelectTopic = () => {
  return (<h3>Please select a topic</h3>);
}

export default function Topics (props) {
  const { match } = props;
  return (<div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={SelectTopic} />
  </div>)
}
