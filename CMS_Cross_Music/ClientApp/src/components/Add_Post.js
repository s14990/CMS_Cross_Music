import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'reactstrap';
import FCPopUp from './FCPopUp';
import ReactPlayer from 'react-player';

class Add_Post extends Component {


    constructor(props) {
        super(props);
        this.state = { title: '', open: false,file: '', Description: ''};
        this.handleChange = this.handleChange.bind(this);
        this.choose_file = this.choose_file.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    handleChange(value) {
        this.setState({ text: value });
    }

    handleFieldChange(e) {
        let name = e.target.name;
        let title = e.target.value;

        switch (name) {
            case 'title':
                this.setState({ title })
                break;
            case 'description':
                this.setState({ Description: title })
            }
        //let description = e.target.value;
        //this.setState({ title });
    }
    handleChange(value) {
        this.setState({ Description: value });
    }

    handleDescriptionChange(e) {
        let description = e.target.value;
        //let description = e.target.value;
        this.setState({ description });
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
                postDescription: this.state.Description,
                postTitle: this.state.title,
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
                <div className="row">
                    <div className="col-8 pt-3 bg-white">
                        <div className="form-group">
                            <h3>Title</h3>
                            <textarea
                                name="title"
                                value={this.state.title}
                                onChange={this.handleFieldChange.bind(this)}
                                className="form-control"
                                placeholder="Title"
                                rows="1"
                            />
                        </div>

                        <div>
                            <h3>Description</h3>
                            <ReactQuill name="description" value={this.state.Description}
                            onChange={this.handleChange} rows="5"/>
                        </div>
                    </div>
                    <div className="col-4  pt-3 border-left mb-1" >
                        {this.state.file &&
                        <p>Chosen file: {this.state.file.flName}</p> 
                        }
                        {this.state.file &&
                        <ReactPlayer height='15em' width='25em' url={this.state.file.flLink} />
                        }
                        {!this.state.file &&
                        <img className="rounded mb-0" alt="100x100" src="https://placehold.it/350x250" />
                        }

                        <div>
                            <Button onClick={this.uploadHandler}>Upload</Button>
                            <Button onClick={this.showModal.bind(this)} > Choose Video</Button>
                            <FCPopUp isopen={this.state.open} hide={this.closeModal.bind(this)} accept={this.choose_file} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => state)(Add_Post);
