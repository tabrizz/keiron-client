import React, { useEffect } from 'react';
import { Row, Button, Table, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectTicketsList } from '../../../redux/ticket/selector';
import { listTickets } from '../../../redux/ticket/actions';

const TicketList = ({ getTickets, ticketsList, history, match }) => {
  console.log('ticketsList', ticketsList);
  useEffect(() => {
    const fetchData = async () => {
      await getTickets();
    };
    fetchData();
  }, [getTickets]);

  return (
    <div>
      <Row className="d-flex justify-content-md-end p-4">
        <Button onClick={() => history.push(`${match.path}/create`)}>
          Crear Ticket
        </Button>
      </Row>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Descripción</th>
            <th>Usuario Asignado</th>
            <th>Pedido</th>
          </tr>
        </thead>
        <tbody>
          {ticketsList.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.description}</td>
              <td>{ticket.userId ? ticket.user.name : 'Ninguno'}</td>
              <td>
                {ticket.taken ? (
                  <Badge variant="success">SI</Badge>
                ) : (
                  <Badge variant="danger">NO</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getTickets() {
    dispatch(listTickets());
  },
});

const mapStateToProps = createStructuredSelector({
  ticketsList: selectTicketsList,
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
