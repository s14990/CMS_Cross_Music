import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/user_Auth';

class Logout extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var end_date = new Date('October 15, 1996 05:35:32');
        fetch("api/Sesns/" + this.props.sesn.idSesn, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idSesn: this.props.sesn.idSesn,
                startDate: this.props.sesn.startDate,
                endDate: end_date.toJSON(), 
                userIdUser: this.props.sesn.userIdUser
            })
        });
        this.props.logoutUser();
    }

    render() {
        return (
            <div>
                <Redirect to='/' />
            </div>
        );
    }

}

export default connect(
    state => state.auth,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Logout);
