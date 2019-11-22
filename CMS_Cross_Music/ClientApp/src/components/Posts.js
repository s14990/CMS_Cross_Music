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
        fetch('api/MediaPosts')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    posts: data
                });
            });
    }


    render() {
        return (
            <div>
                <h2>All Posts</h2>
                {this.state.posts.map(post =>
                    <div>
                        <h2>-----------------</h2>
                        <Post post={post} />
                    </div>
                )}
            </div>
        );
    }
}



export default connect()(Posts);
