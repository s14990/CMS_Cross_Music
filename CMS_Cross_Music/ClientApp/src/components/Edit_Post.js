import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'reactstrap';
import FCPopUp from './FCPopUp';
import ReactPlayer from 'react-player';
import Select from 'react-select';

class Add_Post extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: '', open: false, file: '', Description: '', all_tags: [], selected_tags: [],
            searchList: [], selectedOption: [], createTagField: '', IdPost: '', PostDate: '',
            MediaFileIdFile: '', UserIdUser: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.choose_file = this.choose_file.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.refresh = this.refresh.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
    }


    componentDidMount() {
        const post_id = this.props.match.params.id;
        fetch('api/Mediaposts?$expand=mediaFileIdFileNavigation&$filter=idPost eq ' + post_id)
            .then(response => response.json())
            .then(data=>data[0] )
                .then(data => {
                    this.setState({
                        IdPost: data.IdPost, Description: data.PostDescription, PostDate: data.PostDate, MediaFileIdFile: data.MediaFileIdFile,
                        UserIdUser: data.UserIdUser, title: data.PostTitle, file: data.MediaFileIdFileNavigation
                    });
                });
        
    }

    handleChange(value) {
        this.setState({ Description: value });
    }

    handleChange2 = selectedOption => {
        this.setState({ selectedOption })
        console.log(selectedOption)
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
    }
    handleChange(value) {
        this.setState({ Description: value });
    }

    handleDescriptionChange(e) {
        let description = e.target.value;
        //let description = e.target.value;
        this.setState({ description });
    }

    publishHandler = () => {
        if (!this.state.file || !this.state.title) {
            window.alert("Choose File first");
        }
        else {
            fetch("api/MediaPosts/ " + this.state.IdPost, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    IdPost: this.state.IdPost,
                    postDate: this.state.PostDate,
                    mediaFileIdFile: this.state.file.IdFile,
                    userIdUser: this.props.auth.user.idUser,
                    postDescription: this.state.Description,
                    postTitle: this.state.title
                })
            }).then(setTimeout(this.handleReturn, 300));
        }
    }

    handleReturn() {
        this.props.history.push("/show_post/" + this.state.IdPost);
    }

    handleDelete() {
        if (window.confirm("Do you want to delete Post" + this.state.IdPost) === true)
            fetch('api/Mediaposts/' + this.state.IdPost, {
                method: 'DELETE'
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
        this.setState({ file: file, open: false })
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
                                onChange={this.handleChange} rows="5" />
                        </div>
                    </div>
                    <div className="col-4  pt-3 border-left mb-1" >
                        {this.state.file &&
                            <p>Chosen file: {this.state.file.FlName}</p>
                        }
                        {this.state.file &&
                            <ReactPlayer height='15em' width='25em' url={this.state.file.FlLink} />
                        }
                        {!this.state.file &&
                            <img className="rounded mb-0" alt="100x100" src="https://placehold.it/350x250" />
                        }
                    </div>
                </div>


                <div>
                    <Button className='mr-2' color="primary" onClick={this.publishHandler}>Save</Button>
                    <Button className='mr-2' color="secondary" onClick={this.handleReturn}>Return</Button>
                    <Button className='mr-2' color="warning" onClick={this.handleDelete.bind(this)}>Delete</Button>
                </div>

            </div>
        );
    }
}

export default connect(state => state)(Add_Post);
