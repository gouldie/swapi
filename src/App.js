import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Planets from './Planets';
import Planet from './Planet';

export default props => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Planets} />
        <Route exact path="/planet/:planet" component={Planet} />
      </Switch>
    </div>
  );
};