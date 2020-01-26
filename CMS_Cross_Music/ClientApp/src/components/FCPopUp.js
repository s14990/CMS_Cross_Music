import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';

class FCPopUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
            file: ''
        };
        this.toggle = this.toggle.bind(this);
        this.choose_video = this.choose_video.bind(this);
    }


    componentDidMount() {        
        fetch(`api/Mediafiles?$filter=userIdUser eq ` + this.props.auth.user.idUser)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    files: data
                });
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.isopen !== prevProps.isopen) {
            this.setState({ open: this.props.isopen });
        }
    }

    toggle() {
        this.props.hide();
    }

    choose_video(e, file) {
        this.setState({ file: file });
    }

    accept() {
        this.props.accept(this.state.file);

    }

    render() {

        return (
            <div>
                <Modal size="lg" isOpen={this.state.open} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}> </ModalHeader>
                    {this.state.file &&
                        <div className='sticky-top' >
                            <div className="media-body p-2 shadow-sm rounded bg-light border">
                                <h4> <span class="badge badge-secondary">Selected File: {this.state.file.flName}</span></h4>
                                <div className="d-flex justify-content-center">
                                    <ReactPlayer height='18em' width='30em' url={this.state.file.flLink} />
                                </div>
                                <Button onClick={this.accept.bind(this)} >Choose this file</Button>
                            </div>


                        </div>
                    }
                    <ModalBody>
                        <div className='d-flex flex-wrap' >
                            {this.state.files.map(file =>
                                <div key={file.idFile} className='badge badge-light rounded mb-0 p-2 border border flex-even col-4 m-1' onClick={(e) => { this.choose_video(e, file) }} >
                                    <div className="d-flex justify-content-center">
                                        <ReactPlayer height='10em' width='12em' url={file.flLink} />
                                    </div>
                                    <div>
                                        <h8>{file.flName}</h8>
                                    </div>
                                </div>
                            )}
                            </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );

    }
}

export default connect(state => state)(FCPopUp);