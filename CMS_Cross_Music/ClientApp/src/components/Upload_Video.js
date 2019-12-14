import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';


class Upload_Video extends Component {


    constructor(props) {
        super(props);
        this.state = { video_file: '',video_url: '',selected_file: '',file_state: '',loading: false}
    }


    fileChangedHandler = event => {
        event.preventDefault();
        this.setState({ file_state: "loading", loading: true });
        let file = event.target.files[0];

        this.setState({
                selectedFile: file,
                file_state: "ready"
            });
        };

    uploadHandler = async() => {
        let f = new FormData();
        f.append('File', this.state.selectedFile);
        f.append('Desctiption', "TestTestTest");
        var resp = await axios.post('api/MediaFiles', f, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(resp);
        window.alert("File upload completed");
    }


    render() {
        return (
            <div>
                <h1>Choose File {this.state.file_state}</h1>
                <p>
                    <input type="file" onChange={this.fileChangedHandler} />
                    <button onClick={this.uploadHandler}>Upload</button>
                    <ClipLoader
                        loading={this.state.loading}
                    />
                </p>
            </div>
        );
    }
}



export default connect()(Upload_Video);
