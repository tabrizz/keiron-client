import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect, Switch, Route } from 'react-router-dom';

import { selectCurrentUser } from '../../../redux/user/selector';
import TicketList from './TicketList';
import Create from './Create';

const Index = ({ currentUser, match }) => {
  if (currentUser?.typeUserId !== 1) {
    return <Redirect to="/" />;
  }
  return (
    <Switch>
      <Route
        exact
        path={`${match.path}`}
        render={(props) => <TicketList {...props} />}
      />
      <Route
        path={`${match.path}/create`}
        render={(props) => <Create {...props} />}
      />
    </Switch>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Index);
