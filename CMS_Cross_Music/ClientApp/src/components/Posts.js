import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, NavLink, UncontrolledTooltip  } from 'reactstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
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
            searchByAutor: false,
            all_tags: [],
            searchList: [],
            selectedOption: ''
        }

        

        this.handleCheckedByComposition = this.handleCheckedByComposition.bind(this);
        this.handleCheckedByAutor = this.handleCheckedByAutor.bind(this);
    //    this.handleInputChange = this.handleInputChange.bind(this);
    }


    loadDate()
    {
        fetch('api/Mediaposts?$expand=userIdUserNavigation,mediaFileIdFileNavigation&$orderby=postDate desc')
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
            this.setState({query: this.props.location.search_by_username });
            setTimeout(this.getByAutor, 300);
        }
        //tags
        fetch('api/tags')
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
                    all_tags: data, searchList
                });
            });
    }

    handleCheckedByComposition () {
      //  this.setState({searchByComposition: !this.state.searchByComposition})
      //  if(this.state.searchByAutor)
      //  {
            this.setState({searchByComposition: !this.state.searchByComposition})
            this.handleInputChange()
      //  }
    }
    handleCheckedByAutor () {  
       // if(this.state.searchByComposition)
       // {
            this.setState({searchByAutor: !this.state.searchByAutor})
            this.handleInputChange()
       // }
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

    getByTag =(selectedOption) =>{
        fetch(`api/Mediaposts?$expand=userIdUserNavigation,pt($expand=tag),mediaFileIdFileNavigation&$filter=Pt/any( t: contains(t/Tag/TagName, '${selectedOption.value.tagName}'))`)
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
        if(!this.search)
        {return}

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
             /*   else if(!this.state.searchByComposition && !this.state.searchByAutor)
                {
                    console.log(this.state.selectedOption)
                    this.getByTag()
                }*/
            }
        /*    else if(!this.state.searchByComposition && !this.state.searchByAutor)
            {
                console.log(this.state.selectedOption)
                this.getByTag()
            } */
                else if (!this.state.query) {
                this.loadDate();
            }
        })
    }

    submitHandler(e) {
        e.preventDefault();
    }

    handleTagChange= selectedOption => {
        this.setState({ selectedOption })
        //console.log(selectedOption)
        //console.log(selectedOption.value.tagName)
        this.getByTag(selectedOption)
    }

    //input .. value={this.state.query}
    //input
    render() {
        //console.log( this.state.posts)
        return (
            <div>
                <h2>All Posts</h2>
                <form onSubmit={this.submitHandler} className="container">
                    <div className='row'>
                        {!this.state.searchByComposition && !this.state.searchByAutor &&
                        <Select className="col-sm-8 m-1 pb-1" placeholder="Select tag"
                            value={this.state.selectedOption}
                            options={this.state.searchList}
                            onChange={this.handleTagChange}
                        />
                        }
                        {(this.state.searchByComposition || this.state.searchByAutor) &&
                        <input className="form-control col-sm-8 p-4" name="srch-term" id="srch-term" type="text"
                        
                            style={{ borderRadius: '10px 0px 0px 10px' }}
                            placeholder="Search for..."
                            ref={input => this.search = input}
                            onChange={this.handleInputChange}
                        />
                        }
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
                        {this.props.auth.isAuthenticated &&   
                        <Button className='align-self-center ml-5' color="primary" tag={Link} to="/add_post">Add Post</Button>
                        }  
                    </div>
                </form>
                <div className='d-flex flex-wrap'>
                    <div>{this.state.posts.length ===0?'No results':''}</div>
                    {this.state.posts.map(post =>
                    <div key = {post.IdPost}>
                            {/*console.log(post.PostDate)*/}
                            <p>{/*this.post.UserIdUserNavigation*/} </p>
                            <Post 
                                idPost={post.IdPost}
                                idUser={post.UserIdUserNavigation.IdUser}
                                userName={post.UserIdUserNavigation.UserName}
                                idFile={post.MediaFileIdFileNavigation.IdFile}
                                fileName={post.MediaFileIdFileNavigation.FlName}
                                fileLink={post.MediaFileIdFileNavigation.FlLink}
                                fileType={post.MediaFileIdFileNavigation.FlType}
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


function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(Posts);
//export default connect()(Posts);
