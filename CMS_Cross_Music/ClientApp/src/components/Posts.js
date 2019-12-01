import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

class Posts extends Component {


    constructor(props) {
        super(props);
        this.state = { posts: [] }
        fetch('api/Mediaposts?$expand=userIdUserNavigation,mediaFileIdFileNavigation')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    posts: data

                });
            });
    }


    render() {
        console.log( this.state.posts)
        return (
            <div>
                <h2>All Posts</h2>
                <div className='d-flex flex-wrap'>
                    {this.state.posts.map(post =>
                    <div key = {post.IdPost}>
                            {console.log(post.PostDate)}
                            <p>{/*this.post.UserIdUserNavigation*/} </p>
                            <Post 
                                idPost = {post.IdPost}
                                postHtml = {post.PostHtml}
                                idUser = {post.UserIdUserNavigation.IdUser}
                                userName = {post.UserIdUserNavigation.UserName}
                                idFile = {post.MediaFileIdFileNavigation.IdFile}
                                fileName = {post.MediaFileIdFileNavigation.FlName}
                                fileLink = {post.MediaFileIdFileNavigation.FlLink}
                                postDate = {post.PostDate}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}



export default connect()(Posts);
