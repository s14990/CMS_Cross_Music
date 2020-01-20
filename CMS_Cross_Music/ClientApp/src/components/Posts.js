import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, UncontrolledTooltip  } from 'reactstrap'
import Post from './Post';
import './PostsSearch.css';

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
                        <input className="form-control col-sm-8 p-4" name="srch-term" id="srch-term" type="text"
                        
                            style={{ borderRadius: '10px 0px 0px 10px' }}
                            placeholder="Search for..."
                            ref={input => this.search = input}
                            onChange={this.handleInputChange}
                        />
                        <span className="input-group-text m-0 p-0 pr-2" id="basic-addon"
                            style={{ borderRadius: '0px 10px 10px 0px'}}
                        >                
                            <div className='row pl-3' style={{width: '5rem'}}>
                                <div className='m-0 mt-1 pr-1'>
                                    <div className="checkbox">
                                        <input type="checkbox" id="byComposition" 
                                            checked={this.state.searchByComposition} 
                                            onChange={this.handleCheckedByComposition } /><label htmlFor="byComposition" id="byCompositionLabel"></label>
                                        <UncontrolledTooltip placement="top" target="byCompositionLabel">
                                            By Composition
                                        </UncontrolledTooltip>
                                    </div>
                                </div>
                                <div className='m-0 mt-1 p-0'>
                                    <div className="checkbox">
                                        <input type="checkbox" id="byAutor"
                                            checked={this.state.searchByAutor} 
                                            onChange={this.handleCheckedByAutor }/><label htmlFor="byAutor" id="byAutorLabel"></label>
                                        <UncontrolledTooltip placement="right" target="byAutorLabel">
                                            By Autor
                                        </UncontrolledTooltip>
                                    </div>
                                </div>
                            </div>
                        </span>  
                        
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
