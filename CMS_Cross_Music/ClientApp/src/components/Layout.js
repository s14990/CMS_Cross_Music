import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import NavHeader from './NavHeader';
import SideMenu from './SideMenu';
import { Col, Row } from 'reactstrap';

export default props => (
    <div>
        
        <NavHeader/>        
        <Container fluid className="container-fluid">
            <Row>
                <Col md={2} className="sidebar bg-light p-0 m-0">

                        <NavMenu className="p-0 m-0"/>
                        <SideMenu className="p-0 m-0"/>

                </Col>
                <Col >
                    {props.children}
                </Col>
            </Row>
        </Container>
    </div>
);
