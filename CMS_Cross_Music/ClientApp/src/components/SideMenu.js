import React, { Component } from 'react';
import FriendsList from './FriendsList';
import { connect } from 'react-redux';

class SideMenu extends Component {

  render() {
      return (
          <div>
              {this.props.auth.isAuthenticated &&
                <FriendsList/>
              }
          </div>
      );
  }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(SideMenu);