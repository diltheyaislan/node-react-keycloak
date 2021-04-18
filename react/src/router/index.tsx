import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Posts from '../pages/Posts';
import CreatePost from '../pages/Posts/Create';
import ShowPost from '../pages/Posts/Show';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/posts/create" component={CreatePost} isPrivate />
    <Route path="/posts/:id" component={ShowPost} isPrivate />
    <Route path="/posts" component={Posts} isPrivate />
    <Route path="/" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
