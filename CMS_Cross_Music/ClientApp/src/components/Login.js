import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validator from 'validator';
import { actionCreators } from '../store/user_Auth';
import { Container, Form, Input, Label, FormGroup, Row, Button } from 'reactstrap';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userPassword: '',
            errors: '',
            username_err: 'print a email',
            password_err: 'print a password',
            loading: false,
            disabled: true,
        };


        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        fetch("api/Sesns", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: this.state.userName,
                userPassword: this.state.userPassword
            })
        }).then(resp => resp.json()).
            then(data => {
                if (data.idSesn) {
                    console.log("Else");
                    console.log(data);
                    this.props.loginUser(data);
                    this.props.history.push('/');
                }
                else {
                    console.log("Else");
                    if (data.errors)
                        this.setState({ errors: data.errors });
                    else
                        this.setState({ errors: "Unknows Error" });
                }
            });
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
                    this.setState({ username_err: 'Wrong username' })
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

        if (this.state.username_err.length > 0 && this.state.password_err.length > 0)
            this.setState({ disabled: true })
        else
            this.setState({ disabled: false })
    }

    render() {
        return (
            <Container>
                <Form>
                    <h1>Login</h1>
                    <Row>
                        <FormGroup>
                            <Label htmlFor="username" className="control-label">UserName</Label>
                            <Input type="text" className="form-control" name="username" value={this.state.userName} onChange={this.onChange} />
                            {this.state.username_err > 0 && <p>{this.state.username_err}</p>}
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Label htmlFor="password" className="control-label">Password</Label>
                            <Input type="password" className="form-control" name="password" value={this.state.userPassword} onChange={this.onChange} />
                            {this.state.password_err.length > 0 && <p>{this.state.password_err}</p>}
                        </FormGroup>
                        <Row>
                            {this.state.errors && <h5>{this.state.errors}</h5>}
                        </Row>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Button className="btn btn-primary btn-lg" disabled={this.state.disabled} onClick={this.onSubmit}>Login</Button>
                        </FormGroup>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default connect(
    state => state.auth,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Login);
