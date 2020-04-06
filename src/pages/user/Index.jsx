import React, { useEffect } from "react";
import { Card, Button, Badge, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/selector";
import { listTicketsByUser, updateTicket } from "../../redux/ticket/actions";
import { selectTicketsListByUser } from "../../redux/ticket/selector";

const Index = ({ getTickets, ticketsList, takeTicket, currentUser }) => {
  console.log("new ticketslist", ticketsList);
  useEffect(() => {
    const fetchData = async () => {
      await getTickets(currentUser.id);
    };
    fetchData();
  }, [getTickets, currentUser.id]);

  if (currentUser.user_types_id !== 2) {
    return <Redirect to="/" />;
  }
  return (
    <Row className="p-4">
      {ticketsList.map((ticket) => (
        <Card
          key={ticket.id}
          border="primary"
          className="m-4"
          style={{ width: "18rem" }}
        >
          <Card.Header>Ticket {ticket.id}</Card.Header>
          <Card.Body>
            <Card.Title>{ticket.description}</Card.Title>
            <Card.Text>
              Ticket pedido:{" "}
              {ticket.taken ? (
                <Badge variant="success">SI</Badge>
              ) : (
                <Badge variant="danger">NO</Badge>
              )}
            </Card.Text>
            <Button
              onClick={async () => {
                await takeTicket(ticket);
                await getTickets(currentUser.id);
              }}
              variant="primary"
            >
              Pedir Ticket
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Row>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getTickets(id) {
    dispatch(listTicketsByUser(id));
  },
  takeTicket(ticket) {
    dispatch(updateTicket(ticket));
  },
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  ticketsList: selectTicketsListByUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
