import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThemeChooser } from 'react-bootstrap-theme-switcher';

class Home extends Component {
    render() {
        
        return (
            <div>
                <p>Hello</p>
                <ThemeChooser/>
                {!this.props.auth.isAuthenticated && <p>Please Log In</p>}
                {this.props.auth.isAuthenticated && <p>Welcome {this.props.auth.user.userName} User</p>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(Home);