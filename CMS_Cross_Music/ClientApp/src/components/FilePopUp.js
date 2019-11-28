import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactPlayer from 'react-player';

class FilePopUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.toggle = this.toggle.bind(this);

    }


    componentDidMount() {
        //this.toggleOn();
    }

    componentDidUpdate(prevProps) {
        if (this.props.isopen !== prevProps.isopen ) {
            this.setState({ open: this.props.isopen });
        }
    }

    toggle() {
        this.props.hide();
    }

    render() {
        
        return (
            <div>
                <Modal size="lg" isOpen={this.state.open} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>File Id {this.props.chosen}</ModalHeader>
                    <ModalBody>
                        <ReactPlayer url={this.props.chosen_link} controls />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );

    }
}

export default FilePopUp;