import React from "react";
import { Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";

import { selectCurrentUser } from "../redux/user/selector";

const Home = ({ currentUser }) => {
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Alert variant="success">
        <Alert.Heading>Bienvenido!</Alert.Heading>
        Usuario: {currentUser.name}
      </Alert>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Home);
