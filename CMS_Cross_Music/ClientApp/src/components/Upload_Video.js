import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Container, Button, Progress, Card, CardBody, CardFooter } from 'reactstrap';
import './dropzone.css';

class Upload_Video extends Component {

    constructor(props) {
        super(props);
        this.onDrop = (files) => {
            this.setState({ files })
        };
        this.state = {
            files: [],
            uploading_files: false,
            uploading_message: '',
            uploading_progress: 20
        };
    }


    uploadHandler = async () => {
        let len = this.state.files.length;
        if (len === 0) {
            window.alert("No files");
        }
        else {
            this.setState({ uploading_files: true, uploading_progress: 20 })
            let progress_per_file = (80 / len) / 2;
            let author = this.props.auth.user.idUser;
            for (const file of this.state.files) {
                let f = new FormData();
                f.append('File', file);
                f.append('Author', author);
                this.setState({ uploading_progress: this.state.uploading_progress + progress_per_file })
                console.log(this.state.uploading_progress);
                var resp = await axios.post('api/MediaFiles', f, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                console.log(resp);
                this.setState({ uploading_progress: this.state.uploading_progress + progress_per_file })
                console.log(this.state.uploading_progress);
            };
            this.setState({ uploading_files: false, uploading_progress: 20 })
            window.alert("Upload Finished");
        }
        this.setState({ files: [] });
    }



    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));

        const dropzoneStyle = {
            width: "1000px",
            height: "200px",
            border: "1px solid black"
        };

        return (
            <div>
                <Dropzone onDrop={this.onDrop} accept="video/mp4,audio/mp3" dropzoneStyle={dropzoneStyle}>
                    {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                        <Container fluid>
                            <Card color='light'>
                                <CardBody style={{ height: 200 + 'px' }}>
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <input color="info"  {...getInputProps()} />
                                        <p>
                                            {!isDragActive && 'Upload File'}
                                            {isDragActive && !isDragReject && "Drop it"}
                                            {isDragReject && "Wrong File"}
                                        </p>
                                    </div>
                                </CardBody>
                                {this.state.files.length > 0 &&
                                    <CardFooter>
                                        <h4>Files</h4>
                                        <ul>{files}</ul>
                                    </CardFooter>
                                }
                            </Card>
                            {this.state.files.length > 0 &&
                                <Button color="info" onClick={this.uploadHandler.bind(this)}>Upload</Button>
                            }
                        </Container>
                    )}
                </Dropzone>
                {this.state.uploading_files &&
                    <Progress animated value={this.state.uploading_progress} />
                }
            </div>
        );
    }
}



export default connect(state => state)(Upload_Video);
