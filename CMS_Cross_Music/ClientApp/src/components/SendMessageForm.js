import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Input, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class SendMessageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            newMessage: ''
        }
        this.sendClick = this.sendClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.textInput = React.createRef();
        this.refresh = this.refresh.bind(this);
    }
    handleChange(event) {

    }
    sendClick(event) {
        event.preventDefault();
        let cur_date = new Date();
        let msg_text = this.textInput.current.value;
        let author_id = this.props.idUser;
        let target_id = this.props.idFriend;
        console.log("newMessage: " + author_id + '->' + target_id + ': ' + msg_text);
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

    refresh() {
        this.textInput = "";
        this.props.refresh();
    }

    render() {
        return (
            <div className='border rounded'>
                <p>SendMessageForm</p>
                <Form inline>
                    <FormGroup className="flex-fill mr-2" >
                        <Container>
                            <Row>
                                <Col >
                                    <Input innerRef={this.textInput} type="textarea" className="text" id="newMessageText" placeholder="New Message" style={{ width: '100%' }}
                                    //  onChange={() => this.handleChange()} 
                                    />
                                </Col>
                                <Col xs='2'>
                                    <Button onClick={this.sendClick} >Send</Button>
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