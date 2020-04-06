import React from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { Formik, Field } from "formik";
import { connect } from "react-redux";
import * as yup from "yup";

import { setCurrentUser } from "../redux/user/actions";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/selector";

const loginSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const Login = ({ login, currentUser, history }) => {
  return (
    <Row className="justify-content-md-center">
      <Col md={6} className="p-4">
        <Card body>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(data) => {
              login(data, history);
              // setTimeout(() => {
              //   history.push("/");
              // }, 1700);
            }}
          >
            {({ handleSubmit, touched, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Correo</Form.Label>
                  <Field
                    name="email"
                    placeholder="Ingrese su correo"
                    type="input"
                    as={Form.Control}
                  />
                  <Form.Text className="text-danger">
                    {touched.email && errors.email}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Field
                    name="password"
                    placeholder="Ingrese su constraseña"
                    type="password"
                    as={Form.Control}
                  />
                  <Form.Text className="text-danger">
                    {touched.password && errors.password}
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Ingresar
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Col>
    </Row>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login(user, history) {
    dispatch(setCurrentUser(user, history));
  },
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
