import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'reactstrap';
import FCPopUp from './FCPopUp';

class Add_Post extends Component {


    constructor(props) {
        super(props);
        this.state = { text: '', open: false,file: '' };
        this.handleChange = this.handleChange.bind(this);
        this.choose_file = this.choose_file.bind(this);
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
                postDate: new Date().toJSON(),
                mediaFileIdFile: this.state.file.idFile,  
                userIdUser: this.props.auth.user.idUser,
                postDescription: "TestTest",
                postTitle: "Title",
            }) 
        }).then(setTimeout(this.refresh, 300));

    }

    refresh() {
        this.props.history.push("/");
    }

    showModal() {
        this.setState({ open: true });
    }

    closeModal() {
        this.setState({ open: false });
    }

    choose_file(file) {
        this.setState({file: file, open: false})
    }

    render() {
        return (
            <div>
                <h1>Add Post</h1>
                {this.state.file && 
                    <p>Chosen file: {this.state.file.flName}</p>
                }
            <ReactQuill value={this.state.text}
                    onChange={this.handleChange} />
                <Button onClick={this.uploadHandler}>Upload</Button>
                <Button onClick={this.showModal.bind(this)} > Choose Video</Button>
                <FCPopUp isopen={this.state.open} hide={this.closeModal.bind(this)} accept={this.choose_file} />
            </div>
        );
    }
}

export default connect(state => state)(Add_Post);
