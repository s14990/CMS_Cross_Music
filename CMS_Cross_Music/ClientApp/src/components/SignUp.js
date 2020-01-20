import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validator from 'validator';
import { actionCreators } from '../store/user_Auth';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userPassword: '',
            userEmail: ' ',
            userRank: '',
            errors: '',
            userStatus: "online",
            userConfirmed: true,
            email_err: 'print a email',
            password_err: 'print a password',
            loading: false,
            disabled: true,
        };


        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        fetch("api/Usrs/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: this.state.userName,
                userPassword: this.state.userPassword,
                userEmail: this.state.userEmail,
                userRank: 3,
                userStatus: this.state.userStatus,
                userConfirmed: this.state.userConfirmed
            })
        }).then(setTimeout(this.refresh, 300));
    }


    refresh() {
        this.props.history.push("/login");
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
            case 'email':
                this.setState({ userEmail: value })
                if (validator.isEmail(value)) {
                    this.setState({ useremail_err: '' })
                }
                else
                    this.setState({ useremail_err: 'Wrong email' })
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
                <Form>
                    <h1>Register</h1>
                    <FormGroup>
                        <Label htmlFor="username" class="control-label">UserName</Label>
                        <Input type="text" className="form-control" name="username" value={this.state.userName} onChange={this.onChange} />
                        {this.state.errors.username_err > 0 && <p>this.state.username_err</p>}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email" class="control-label">UserEmail</Label>
                        <Input type="text" className="form-control" name="email" value={this.state.userEmail} onChange={this.onChange} />
                        {this.state.errors.useremail_err > 0 && <p>this.state.useremail_err</p>}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password" class="control-label">Password</Label>
                        <Input type="password" className="form-control" name="password" value={this.state.userPassword} onChange={this.onChange} />
                        {this.state.password_err.length > 0 && <p>this.state.password_err</p>}
                    </FormGroup>
                    <FormGroup>
                        <Button className="btn btn-primary btn-lg" disabled={this.state.disabled} onClick={this.onSubmit}>SignUp</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default connect(
    state => state.user,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(SignUp);
