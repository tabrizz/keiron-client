import React, { useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Formik, Field } from "formik";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as yup from "yup";

import { setUserList } from "../../../redux/user/actions";
import { createTicket } from "../../../redux/ticket/actions";
import { selectUserList } from "../../../redux/user/selector";

const ticketSchema = yup.object({
  description: yup.string().required(),
});

const Create = ({ getUsers, userList, createNewTicket, history }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getUsers();
    };
    fetchData();
  }, [getUsers]);

  return (
    <Row className="justify-content-md-center">
      <Col md={6} className="p-4">
        <Formik
          initialValues={{
            description: "",
            selectedUser: userList.length > 0 ? userList[0].id : "",
          }}
          validationSchema={ticketSchema}
          onSubmit={async (data) => {
            // create ticket
            await createNewTicket(data);
            history.push("/admin");
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Descripción</Form.Label>
                <Field
                  name="description"
                  placeholder="Ingrese la descripción"
                  type="input"
                  as={Form.Control}
                />
                <Form.Text className="text-danger">
                  {touched.description && errors.description}
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  name="selectedUser"
                  value={values.selectedUser}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  as="select"
                  custom
                >
                  {/* <option>1</option> */}
                  {userList.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Crear
              </Button>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getUsers() {
    dispatch(setUserList());
  },
  createNewTicket(ticket) {
    dispatch(createTicket(ticket));
  },
});

const mapStateToProps = createStructuredSelector({
  userList: selectUserList,
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
