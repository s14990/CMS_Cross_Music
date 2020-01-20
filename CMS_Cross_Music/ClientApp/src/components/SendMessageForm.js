import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Input, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class SendMessageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newMessagetext: ''
        }
        this.sendClick = this.sendClick.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    sendClick(event) {
        event.preventDefault();
        let cur_date = new Date();
        let msg_text = this.state.newMessagetext;
        let author_id = this.props.idUser;
        let target_id = this.props.idFriend;
        console.log("newMessage: " + author_id + '->' + target_id + ': ' + msg_text + '; '+ cur_date.toJSON());
        this.setState({ newMessagetext: '' });

        if(msg_text !== ''){
            fetch("api/Msgs", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: msg_text,
                    msgDate: cur_date.toJSON(),
                    userIdAuthor: author_id,
                    userIdTarger: target_id
                })
            }).then(setTimeout(this.refresh, 300));
        }
        
        
    }

    refresh() {
        this.textInput = "";
        this.props.refresh();
    }

    render() {
        return (
            <div className='border rounded pb-5 pt-4 mt-4'>
                <Form inline>
                    <FormGroup className="flex-fill mr-2" >
                        <Container>
                            <Row>
                                <Col >
                                    <Input
                                        type="textarea" className="text rounded" id="newMessageText" placeholder="New Message" style={{ width: '100%' }}
                                        value={this.state.newMessagetext}
                                        onChange={e => this.setState({ newMessagetext: e.target.value })}
                                    />
                                </Col>
                                <Col xs='2'>
                                    <Button onClick={this.sendClick} className="rounded">Send</Button>
                                </Col>
                            </Row>
                        </Container>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}
export default compose(
    withRouter,
    connect()
)(SendMessageForm);