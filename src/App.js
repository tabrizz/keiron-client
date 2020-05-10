import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/admin/tickets/Index';
import User from './pages/user/Index';

import Header from './components/shared/Header';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Container className="my-4">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/user" component={User} />
          <Route path="/login" component={Login} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
