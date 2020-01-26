import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

class Edit_User extends Component {
    displayName = Edit_User.name

    constructor(props) {
        super(props);
        this.state = {
            wydzialy: [], loading: true, err: '', disabled: true, mode: 'create',
            id: '', name: '', email: '', status: 'offline', rank: 1, confirmed: true, password: ""
        };

        this.refresh = this.refresh.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.validateData = this.validateData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentDidMount() {
        const user_id = this.props.match.params.id;
        if (user_id == 0) {
            this.setState({ loading: false });
        }
        if (user_id != 0) {
            fetch('api/Usrs/' + user_id)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        id: data.idUser, name: data.userName, email: data.userEmail, rank: data.userRank,
                        status: data.userStatus, mode: 'edit', confirmed: data.userConfirmed, loading: false
                    });
                });
        }
    }

    handleCreate() {
        fetch("api/Usrs", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: this.state.name,
                userEmail: this.state.email,
                UserPassword: this.state.password
            })
        }).then(setTimeout(this.refresh, 300));

    }

    handleUpdate() {
        fetch("api/Usrs/" + this.state.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUser: this.state.id,
                userName: this.state.name,
                userEmail: this.state.email,
                userRank: this.state.rank,
                userStatus: this.state.status,
                userConfirmed: this.state.userConfirmed
            })
        }).then(setTimeout(this.refresh, 300));
    }

    handleDelete() {
        let id = this.state.id;
        if (window.confirm("Do you want to delete User" + id) === true)
            fetch('api/Usrs/' + id, {
                method: 'DELETE'
            }).then(setTimeout(this.refresh, 300));
    }

    handleReturn() {
        setTimeout(this.refresh, 300);
    }



    refresh() {
        this.props.history.push("/users");
    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'name':
                this.setState({ name: value });
                break;
            case 'email':
                this.setState({ email: value });
                break;
            case 'password':
                this.setState({ password: value })
                break;
            case 'rank':
                this.setState({ rank: value })
                break;
            case 'status':
                this.setState({ status: value })
                break;
            case 'confirmed':
                this.setState({ confirmed: value })
                break;
            default:
                console.log("Unknown");
                break;
        }
        this.validateData();
    }

    validateData() {
        this.setState({ err: "", disabled: false });
        if (this.state.name.length <= 1)
            this.setState({ err: "Imie nie moż być krótrsza od 5 znaków", disabled: true });
        if (this.state.email < 5)
            this.setState({ err: "email nie moż być krótrszy od 5 znaków", disabled: true });
        if (this.state.mode === "create") {
            if (this.state.password < 5)
                this.setState({ err: "haslo nie moż być krótrsze od 5 znaków", disabled: true });
        }
        if (this.state.rank == null)
            this.setState({ err: "Wybierz Rank", disabled: true });

    }

    handleprofile() {
        this.props.history.push('/profile/' + this.state.id);
    }


    renderUserForm() {
        return (
            <Row>
                <Col xs="6">
                    <Form>
                        <FormGroup>
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handleInputChange} />
                        </FormGroup>
                        {this.state.mode === "create" &&
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleInputChange} />
                            </FormGroup>
                        }
                        <FormGroup>
                            <Label htmlFor="rank">Rank</Label>
                            <select className="form-control" name="rank" value={this.state.rank} onChange={this.handleInputChange}>
                                <option value="" disabled></option>
                                <option key={1} value={1} >Guest</option>
                                <option key={2} value={2} >Member</option>
                                <option key={3} value={3} >Admin</option>
                            </select>
                        </FormGroup>
                        {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                        <FormGroup>
                            {this.state.mode === "edit" &&

                                <div>
                                    <Button className="btn btn-primary" type="button" onClick={this.handleUpdate} disabled={this.state.disabled}>Save User</Button>
                                    {this.state.rank !== 3 &&
                                        <Button className="btn btn-primary" type="button" onClick={this.handleDelete}>Delete User</Button>
                                    }
                                </div>
                            }
                            {this.state.mode === "create" &&
                                <Button className="btn btn-primary" type="button" onClick={this.handleCreate} disabled={this.state.disabled}>Create User</Button>
                            }
                            <Button className="btn btn-primary" type="button" onClick={this.handleReturn}>Return</Button>
                            <Button color="primary" onClick={this.handleprofile.bind(this)}>Profile</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderUserForm();

        return (
            <div>
                <h1>Edit User</h1>
                {contents}
            </div>
        );
    }
}


export default connect()(Edit_User);