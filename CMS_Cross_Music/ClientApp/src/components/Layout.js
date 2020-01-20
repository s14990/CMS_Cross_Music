import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import NavHeader from './NavHeader';
import SideMenu from './SideMenu';
import { Col, Row } from 'reactstrap';
import ThemeSwitcher from "react-theme-switcher";
import ThemeSwitch from 'react-theme-switch';

export default props => (
    <div>
        
        <NavHeader/>        
        <Container fluid className="container-fluid">
            <Row>
                <Col md={2} className="sidebar bg-light">

                        <NavMenu className=""/>
                        <SideMenu className=""/>

                </Col>
                <Col >
                    {props.children}
                </Col>
            </Row>
        </Container>
    </div>
);
