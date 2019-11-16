//<source src={require('./uploadFiles/s.mp4')} />
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div>
                <p>Hello</p>
                {!this.props.user.isAuthenticated && <p>Please Log In</p>}
                {this.props.user.isAuthenticated && <p>Welcome {this.props.user.user.userName} User</p>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(Home);