import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

class Posts extends Component {


    constructor(props) {
        super(props);
        this.state = { 
            query: '',
            results: [],
            posts: [] 
        }

        fetch('api/Mediaposts?$expand=userIdUserNavigation,mediaFileIdFileNavigation')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    posts: data

                });
            });
    }

    getInfo = () => {
        fetch(`api/Mediaposts?$expand=userIdUserNavigation,mediaFileIdFileNavigation&$filter=contains(PostTitle, '${this.state.query}' )`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                posts: data

            });
        });
    }
    
    handleInputChange = () => {
        this.setState({
          query: this.search.value
        }, () => {
          if (this.state.query && this.state.query.length > 1) {
            if (this.state.query.length % 2 === 0) {
              this.getInfo()
            }
          } else if (!this.state.query) {
          }
        })
      }

    render() {
        console.log( this.state.posts)
        return (
            <div>
                <h2>All Posts</h2>
                <form>
                    <input
                        placeholder="Search for..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                    />
                    <p>{this.state.query}</p>
                </form>
                <div className='d-flex flex-wrap'>
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
