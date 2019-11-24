import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Input, Container,Row } from 'reactstrap';
import { connect } from 'react-redux';

class SendMessageForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      value:'',
      newMessage: ''
    }
    this.sendClick = this.sendClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.textInput = React.createRef(); 
}
handleChange(event) {

}
sendClick(event){
  const value = this.textInput.current.value;
  console.log("newMessage: " +this.props.idUser +'->'+this.props.idFriend +': '+  value);
  
  

}

  render() {
    return(
      <div className='border rounded'>
        <p>SendMessageForm</p>
          <Form  inline>
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
export default connect()(SendMessageForm);