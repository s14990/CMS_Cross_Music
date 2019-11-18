import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import SideMenu from './SideMenu';
import {Col, Row} from 'reactstrap';

export default props => (
    <div>
    <NavMenu />
    
    <Container fluid>
      <Row>
        <Col md={3} className="justify-content-md-start">
          <SideMenu/>
        </Col>
        
        <Col >
          {props.children}
        </Col>
      </Row>
    </Container>
  </div>
);
