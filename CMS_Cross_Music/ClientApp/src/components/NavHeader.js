import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeChooser } from 'react-bootstrap-theme-switcher';
//import './NavMenu.css';

class NavHeader extends React.Component {
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
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavbarBrand tag={Link} to="/all_posts">CMS_Grupa_3</NavbarBrand>
                <button onClick={this.toggle} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" isOpen={this.state.isOpen} navbar>
                  <div className="mr-auto"></div>
                  <ThemeChooser/>
                  <div className="navbar-nav my-2 my-sm-0">
                    {!this.props.auth.isAuthenticated &&
                      <a className="nav-link"  href="/login">Login</a>
                    }
                    {this.props.auth.isAuthenticated &&
                      <a className="nav-link"  href="/logout">Logout</a>
                    } 
                  </div>  
                </div>
            </nav>    
          </div>
        );
      }
  }

  function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(NavHeader);