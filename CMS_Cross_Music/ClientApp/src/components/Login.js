import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validator from 'validator';
import { actionCreators } from '../store/user_Auth';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userPassword: '',
            errors: '',
            email_err: 'print a email',
            password_err: 'print a password',
            loading: false,
            disabled: true,
        };


        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.loginUser(this.state);
        this.props.history.push('/');
    }


    onChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        switch (name) {
            case 'username':
                this.setState({ userName: value })
                if (validator.isAlphanumeric(value) && value.length > 3) {
                    this.setState({ username_err: '' })
                }
                else
                    this.setState({ email_err: 'Wrong username' })
                break;
            case 'password':
                this.setState({ userPassword: value })
                if (validator.isAlphanumeric(value) && value.length > 3) {
                    this.setState({ password_err: '' })
                }
                else
                    this.setState({ password_err: 'Wrong password' })
                break;
            default:
                console.log("Unknown");
                break;
        }

        if (this.state.email_err.length > 0 && this.state.password_err.length > 0)
            this.setState({ disabled: true })
        else
            this.setState({ disabled: false })
    }

    render() {
        return (
            <div>
                <form>
                    <h1>Login</h1>
                    <formGroup>
                        <label htmlFor="username" class="control-label">UserName</label>
                        <input type="text" className="form-control" name="username" value={this.state.userName} onChange={this.onChange} />
                        {this.state.errors.username_err > 0 && <p>this.state.username_err</p>}
                    </formGroup>
                    <formGroup>
                        <label htmlFor="password" class="control-label">Password</label>
                        <input type="password" className="form-control" name="password" value={this.state.userPassword} onChange={this.onChange} />
                        {this.state.password_err.length > 0 && <p>this.state.password_err</p>}
                    </formGroup>
                    <formGroup>
                        <button className="btn btn-primary btn-lg" disabled={this.state.disabled} onClick={this.onSubmit}>Login</button>
                    </formGroup>
                </form>
            </div>
        );
    }
}

export default connect(
    state => state.user,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Login);
