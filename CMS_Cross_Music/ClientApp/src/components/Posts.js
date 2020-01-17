import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, UncontrolledTooltip  } from 'reactstrap'
import Post from './Post';

class Posts extends Component {


    constructor(props) {
        super(props);
        this.state = { 
            query: '',
            searchResults: [],
            posts: [],
            searchByComposition: true,
            searchByAutor: false
        }

        

        this.handleCheckedByComposition = this.handleCheckedByComposition.bind(this);
        this.handleCheckedByAutor = this.handleCheckedByAutor.bind(this);
    //    this.handleInputChange = this.handleInputChange.bind(this);
    }


    loadDate()
    {
        fetch('api/Mediaposts?$expand=userIdUserNavigation,mediaFileIdFileNavigation')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    posts: data

                });
            });
    }

    componentDidMount() {
        this.loadDate();
        //Remowe that reference
        //To enable one click search from use profile i have to pass his username with history
        //you have to set value of this and call getByAutor
        if (this.props.location.search_by_username) {
            this.setState({ query: this.props.location.search_by_username });
        }
    }

    handleCheckedByComposition () {
      //  this.setState({searchByComposition: !this.state.searchByComposition})
        if(this.state.searchByAutor)
        {
            this.setState({searchByComposition: !this.state.searchByComposition})
            this.handleInputChange()
        }
    }
    handleCheckedByAutor () {  
        if(this.state.searchByComposition)
        {
            this.setState({searchByAutor: !this.state.searchByAutor})
            this.handleInputChange()
        }
    }
    
    getByComposition = () => {
        fetch(`api/Mediaposts?$expand=userIdUserNavigation,mediaFileIdFileNavigation&$filter=contains(PostTitle, '${this.state.query}' )`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                posts: data
            });
        });
    }
    getByAutor = () => {
        fetch(`api/Mediaposts?$expand=userIdUserNavigation,mediaFileIdFileNavigation&$filter=contains(UserIdUserNavigation/UserName, '${this.state.query}' )`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                posts: data
            });
        });
    }
    getByCompositionAndAutor = () => {
        fetch(`api/Mediaposts?$expand=userIdUserNavigation,mediaFileIdFileNavigation&$filter=contains(PostTitle, '${this.state.query}' ) or contains(UserIdUserNavigation/UserName, '${this.state.query}' )`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                posts: data
            });
        });
    }

    //handleInputChange (e)
    //query: e.target.value
    handleInputChange = () => {
        this.setState({
          query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if(this.state.searchByComposition && !this.state.searchByAutor)
                {
                    this.getByComposition()
                }
                else if(!this.state.searchByComposition && this.state.searchByAutor)
                {
                    this.getByAutor()
                }
                else if(this.state.searchByComposition && this.state.searchByAutor)
                {
                    this.getByCompositionAndAutor()
                }
            
            } else if (!this.state.query) {
                this.loadDate();
            }
        })
    }

    submitHandler(e) {
        e.preventDefault();
    }


    //input .. value={this.state.query}
    //input
    render() {
        console.log( this.state.posts)
        return (
            <div>
                <h2>All Posts</h2>
                <form onSubmit={this.submitHandler} className="container">
                    <div className='row'>
                        <input className="form-control col-sm-8" name="srch-term" id="srch-term" type="text"
                            placeholder="Search for..."
                            ref={input => this.search = input}
                            onChange={this.handleInputChange}
                        />
                        <div className='col ml-5'>
                                <div className='row p-2' style={{width: '6rem'}}>
                                    <div className='col m-0 p-1'>
                                        <div className="checkbox">
                                            <input type="checkbox" className="styled" id="byComposition" 
                                                checked={this.state.searchByComposition} 
                                                onChange={this.handleCheckedByComposition }/>
                                            <UncontrolledTooltip placement="top" target="byComposition">
                                                By Composition
                                            </UncontrolledTooltip>
                                        </div>
                                    </div>
                                    <div className='col-sm m-0 p-1'>
                                        <div className="checkbox">
                                            <input type="checkbox" className="styled" id="byAutor"
                                                checked={this.state.searchByAutor} 
                                                onChange={this.handleCheckedByAutor }/>
                                            <UncontrolledTooltip placement="right" target="byAutor">
                                                By Autor
                                            </UncontrolledTooltip>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </form>
                <div className='d-flex flex-wrap'>
                    <div>{this.state.posts.length ===0?'No results':''}</div>
                    {this.state.posts.map(post =>
                    <div key = {post.IdPost}>
                            {console.log(post.PostDate)}
                            <p>{/*this.post.UserIdUserNavigation*/} </p>
                            <Post 
                                idPost={post.IdPost}
                                idUser={post.UserIdUserNavigation.IdUser}
                                userName={post.UserIdUserNavigation.UserName}
                                idFile={post.MediaFileIdFileNavigation.IdFile}
                                fileName={post.MediaFileIdFileNavigation.FlName}
                                fileLink={post.MediaFileIdFileNavigation.FlLink}
                                postDate={post.PostDate}
                                postTitle={post.PostTitle}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}



export default connect()(Posts);
