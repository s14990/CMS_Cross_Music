import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import './NavMenu.css';

class NavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }



    render() {
        return (
                <section className='sidebar'>
                <Navbar className="navbar d-none d-md-block navbar-dark bg-primary" >
                    <Container>
                        <NavbarBrand tag={Link} to="/">CMS_Grupa_3</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse  isOpen={this.state.isOpen} navbar>
                            <Nav className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link}  to="/">Home</NavLink>
                                </NavItem>
                                {!this.props.auth.isAuthenticated &&
                                    <NavItem>
                                        <NavLink tag={Link}  to="/login">Login</NavLink>
                                    </NavItem>
                                }
                                {this.props.auth.isAuthenticated &&
                                    <NavItem>
                                        <NavLink tag={Link}  to="/mediafiles">MediaFiles</NavLink>
                                    </NavItem>
                                }
                                {this.props.auth.isAuthenticated &&
                                    <NavItem>
                                        <NavLink tag={Link}  to="/upload">Upload File</NavLink>
                                    </NavItem>
                                }
                                {this.props.auth.isAuthenticated &&
                                    <NavItem>
                                        <NavLink tag={Link}  to="/add_post">Add Post</NavLink>
                                    </NavItem>
                                }
                                {this.props.auth.isAuthenticated &&
                                    <NavItem>
                                        <NavLink tag={Link}  to="/all_posts">Posts</NavLink>
                                    </NavItem>
                                }
                                {this.props.auth.isAuthenticated &&
                                    <NavItem>
                                        <NavLink tag={Link}  to="/users">Users</NavLink>
                                    </NavItem>
                                }
                                {this.props.auth.isAuthenticated &&
                                        <NavItem>
                                            <NavLink tag={Link}  to="/logout">Logout</NavLink>
                                        </NavItem>
                                }
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(NavMenu);
