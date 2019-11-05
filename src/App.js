import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CaroComponent from './Component/CaroComponent'
import LoginComponent from './Component/LoginComponent';
import RegisterComponent from './Component/RegisterComponent';
import InfoComponent from './Component/InfoComponent';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>My Caro React</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to={'/'} className="nav-link"> HomePage </Link>
              <Link to={'/my-info'} className="nav-link"> MyInfo </Link>
              <Link to={'/login'} className="nav-link"> Login </Link>
              <Link to={'/Register'} className="nav-link"> Register </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path='/Login' component={LoginComponent} />

          <Route path='/Register' component={RegisterComponent} />

          <Route path='/my-info' component={InfoComponent} />

          <Route path='/' component={CaroComponent} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
