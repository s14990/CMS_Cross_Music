import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Add_Post extends Component {


    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    handleChange(value) {
        this.setState({ text: value });
    }

    uploadHandler = () => {
        fetch("api/MediaPosts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postHtml: this.state.text,
                postDate: new Date().toJSON(),
                mediaFileIdFile: 1,
                userIdUser: 1,
            }) 
        }).then(setTimeout(this.refresh, 300));

    }

    refresh() {
        this.props.history.push("/");
    }



    render() {
        return (
            <div>
            <h1>Add Post</h1>
            <ReactQuill value={this.state.text}
                    onChange={this.handleChange} />
            <button onClick={this.uploadHandler}>Upload</button>
            </div>
        );
    }
}

export default connect()(Add_Post);
