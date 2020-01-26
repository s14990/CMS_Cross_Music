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
        searchList: [], selectedOption: [],createTagField: '' };
        this.handleChange = this.handleChange.bind(this);
        this.choose_file = this.choose_file.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.refresh = this.refresh.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.fetch_tags = this.fetch_tags.bind(this);
    }


    componentDidMount() {
        this.fetch_tags();
    }

    async fetch_tags() {
       await fetch('api/tags')
            .then(response => response.json())
            .then(data => {
                let searchList = data.map(
                    tg => {
                        return {
                            value: tg,
                            label: tg.tagName,
                        }
                    }
                );
                this.setState({
                    all_tags: data, searchList, selected_tags: [], selectedOption: '', createTagField: ''
                });
            });
    }

    handleChange(value) {
        this.setState({ Description: value });
    }

    handleChange2= selectedOption => {
        this.setState({ selectedOption })
        console.log(selectedOption)
        
      //  console.log(this.state.selected_tags)
    }

    handleAdd() {

        if (this.state.selectedOption) {
            let list = this.state.selected_tags;
            let sel = this.state.selectedOption
            list.push(sel);
            let list2 = this.state.searchList;
            let arr = list2.filter(item => item !== sel);
            this.setState({
                selected_tags: list, searchList: arr, selectedOption: '', createTagField: ''
            });
        }

        this.fetch_tags();
    }

    handleCreate() {
        console.log("hhh");
        if (this.state.createTagField !== null) {
            console.log("test");
            fetch("api/tags", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tagName: this.state.createTagField
                })
            }).then(setTimeout(this.fetch_tags,300));
        }
    }

    handleClick(tag) {
        let list = this.state.selected_tags;
        let arr = list.filter(item => item !== tag);
        let list2 = this.state.searchList;
        list2.push(tag);
        this.setState({
            selected_tags: arr, searchList: list2
        });
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
            case 'tag':
                this.setState({ createTagField: title })
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

    publishHandler = () => {
        if (!this.state.file || !this.state.title) {
            window.alert("Choose File first");
        }
        else if (!this.state.Description || !this.state.title.length) {
            window.alert("Description and Title should be present");
        }
        else if (this.state.Description.length > 999 || this.state.title.length > 99) {
            window.alert("Description or Title is too long");
        }
        else {
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
            }).then(response => response.json())
                .then(
                    data => {
                        console.log("sel_tags");
                        console.log(this.state.selectedOption);
                        this.state.selectedOption.map(tag => {
                            var r = JSON.stringify({
                                postId: data.idPost,
                                tagId: tag.value.idTag
                            });
                            console.log("r");
                            console.log(r);
                            fetch("api/pts", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: r
                            }).then(console.log("Done"));

                        });
                    }).then(setTimeout(this.refresh, 300));
        }
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
                {this.props.auth.user.idUser === 1 &&
                    <div className = "row mb-3">
                        <div className="col-6">
                            <textarea
                            name="tag"
                            value={this.state.createTagField}
                            onChange={this.handleFieldChange.bind(this)}
                            className="form-control"
                            //placeholder="Title"
                            rows="1"
                            />
                        </div>
                        {this.state.createTagField &&
                        <div className="col-2">
                            <Button color="success" onClick={this.handleCreate.bind(this)}>Create Tag</Button>
                        </div>}
                        
                    </div>

                }
                <Select
                    value={this.state.selectedOption}
                    options={this.state.searchList}
                    onChange={this.handleChange2}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    isMulti
                />
                {/*this.state.selectedOption &&
                    <Button color="warning" onClick={this.handleAdd}>Dodaj</Button>
                */}
                <div>
                    {this.state.selected_tags.length ? this.state.selected_tags.map((tag, index) => {
                        return (
                            <div key={tag.value.idTag}>
                            <Button color="primary" size="sm"
                                onClick={() => this.handleClick(tag)}
                            >
                                {tag.value.tagName}
                            </Button>
                            </div>
                        )
                    }) : <div> </div>
                    }
                </div>

               
                <div>
                    <Button className='mr-2' color="primary" onClick={this.publishHandler}>Publish</Button>
                    <Button onClick={this.showModal.bind(this)} > Choose Video</Button>
                    <FCPopUp isopen={this.state.open} hide={this.closeModal.bind(this)} accept={this.choose_file} />
                </div>

            </div>
        );
    }
}

export default connect(state => state)(Add_Post);
