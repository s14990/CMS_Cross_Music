import React, { Component } from 'react';
import FriendsList from './FriendsList';
import { connect } from 'react-redux';

class SideMenu extends Component {

  render() {
      return (
          <div className="p-o m-0">
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