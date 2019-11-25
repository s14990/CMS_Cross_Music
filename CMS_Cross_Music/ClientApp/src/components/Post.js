import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Comments';


class Post extends Component {


    constructor(props) {
        super(props);
        this.state = { id: '' }
    }


    render() {
        return (
            <div>
                <Comment>Test</Comment>
                <h1>Post_Id: {this.props.post.idPost}</h1>
                <div dangerouslySetInnerHTML={{ __html: this.props.post.postHtml }}></div>
            </div>
        );
    }
}



export default connect()(Post);