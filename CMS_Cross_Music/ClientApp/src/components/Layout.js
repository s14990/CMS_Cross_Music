import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import SideMenu from './SideMenu';
import { Col, Row } from 'reactstrap';
import ThemeSwitcher from "react-theme-switcher";
import ThemeSwitch from 'react-theme-switch';

export default props => (
    <div>

        <Container fluid>
            <Row>
                <Col md={2}>
                    <NavMenu />
                    <SideMenu />
                </Col>
                <Col >
                    {props.children}
                </Col>
            </Row>
        </Container>
    </div>
);
