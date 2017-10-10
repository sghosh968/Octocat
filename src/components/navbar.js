import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import '../App.css';

class Navbar extends Component {

  render() {
      return(
        <Row>
          <Col xs={1} id="appLogoHolder">
            <img src='./github_21600.png' className="App-logo" alt="logo"></img>
          </Col>
          <Col xs={11} id="navHolder">
            <ul id="nav">
              <li className="navLink"><a href="/">Home</a></li>
              <li className="navLink"><a href="/repos">Repositories</a></li>
              <li className="navLink"><a href="/users">Users</a></li>
            </ul>
          </Col>
        </Row>
      );
  }
}

export default Navbar;
