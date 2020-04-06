import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { persistor } from "../../redux/store";
import { withRouter, Link } from "react-router-dom";
import { selectCurrentUser } from "../../redux/user/selector";

const Header = ({ currentUser, history }) => {
  let navItems;
  if (currentUser?.user_types_id === 1) {
    navItems = (
      <Nav.Link to="/admin" as={Link}>
        Administrador
      </Nav.Link>
    );
  } else if (currentUser?.user_types_id === 2) {
    navItems = (
      <Nav.Link to="/user" as={Link}>
        Usuarios
      </Nav.Link>
    );
  } else {
    navItems = <></>;
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand to="/" as={Link}>
        Keiron Test
      </Navbar.Brand>
      <Nav className="mr-auto">{navItems}</Nav>
      <Navbar.Collapse className="justify-content-end">
        <Button
          onClick={() => {
            persistor.purge();
            localStorage.removeItem("token");
            history.push("/login");
          }}
          variant="danger"
        >
          Cerrar Sesión
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(Header));
