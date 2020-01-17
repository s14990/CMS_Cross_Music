import React, { Component } from 'react';
import {
    Button, Container, Row, Col, Badge, Card, CardText, CardBody,CardTitle
} from 'reactstrap';
import { connect } from 'react-redux';

class Profile extends Component {
    displayName = Profile.name

    constructor(props) {
        super(props);
        this.state = {
            user: '', loading: true
        };

        this.refresh = this.refresh.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
    }

    componentDidMount() {
        let user_id = this.props.match.params.id ? this.props.match.params.id : this.props.auth.user.idUser;
        let req_url = 'api/usrs?$expand=mediafile,mediapost,comment,friendlist($expand=ufl)&$filter=IdUser eq ' + user_id;
        fetch(req_url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    user: data[0], loading: false
                });
            });
    }

    handleReturn() {
        setTimeout(this.refresh, 300);
    }



    refresh() {
        this.props.history.push("/");
    }

    handleRedirect_files() {
        this.props.history.push("/mediafiles/" + this.state.user.IdUser);
    }

    handleRedirect_posts() {
        this.props.history.push({
            pathname: '/all_posts',
            search_by_username: this.state.user.UserName,
        })
    }

    renderUserForm() {
        return (
            <Container >
                <Row><h2>Profile: <Badge color="primary">{this.state.user.UserName}</Badge></h2></Row>
                <Row>
                    <Col sm="4"><h4>Rank: <Badge color="secondary">{this.state.user.UserRank === 3 ? "Admin" : "Member"}</Badge></h4></Col>

                    <Col sm="4"><h4>Status: <Badge color="secondary">{this.state.user.UserStatus}</Badge></h4></Col>
                </Row>
                <Row>
                    <Col sm="4">
                        <div className="my-2 rounded">
                            <Card>
                                <CardBody onClick={this.handleRedirect_files.bind(this)}>
                                    <CardTitle>Files </CardTitle>
                                    <CardText>
                                        {this.state.user.Mediafile.length}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col sm="4">
                        <div className="my-2 rounded">
                            <Card>
                                <CardBody onClick={this.handleRedirect_posts.bind(this)}>
                                    <CardTitle>Posts </CardTitle>
                                    <CardText>
                                        {this.state.user.Mediapost.length}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col sm="4">
                        <div className="my-2 rounded">
                            <Card>
                                <CardBody>
                                    <CardTitle>Comments </CardTitle>
                                    <CardText>
                                        {this.state.user.Comment.length}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Button className="btn btn-primary" type="button" onClick={this.handleReturn}>Return</Button>
            </Container>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderUserForm();

        return (
            <div>
                {contents}
            </div>
        );
    }
}


export default connect(
    state => state
)(Profile);