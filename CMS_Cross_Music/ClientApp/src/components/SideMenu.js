import React, { Component } from 'react';
import FriendsList from './FriendsList';
import { connect } from 'react-redux';

class SideMenu extends Component {

  render() {
      return (
          <div className='border rounded'>
              <p className='text-dark'>SideMenu</p>
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