import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav, Row, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeChooser } from 'react-bootstrap-theme-switcher';
import addMusic from '../images/Add_music_0001.png';
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
            <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-primary">
                <NavbarBrand tag={Link} to="/">Cross Music</NavbarBrand>
                <button onClick={this.toggle} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <div className="mr-auto"></div>

                  {this.props.auth.isAuthenticated &&
                    <Nav className="navbar-nav mr-5" tag={Link} to="/upload">
                        <a href="/upload" id="addmusic" className="">
                          <img alt="add music" width='90' height='46' src= {addMusic}/>
                        </a>
                        <UncontrolledTooltip placement="top" target="addmusic">
                          Upload file
                        </UncontrolledTooltip>
                    </Nav>
                  }

                  <div className="btn-light rounded">
                    <ThemeChooser />
                  </div>
                  <div className="navbar-nav my-2 my-sm-0">
                    {!this.props.auth.isAuthenticated &&
                      <a className="nav-link"  href="/login">Login</a>
                    }
                    {!this.props.auth.isAuthenticated &&
                       <a className="nav-link" href="/signup">Sign Up</a>
                    }
                    {this.props.auth.isAuthenticated &&
                      <a className="nav-link"  href="/logout">Logout</a>
                    } 
                  </div>  
                </div>
            </nav>    
        );
      }
  }

  function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(NavHeader);