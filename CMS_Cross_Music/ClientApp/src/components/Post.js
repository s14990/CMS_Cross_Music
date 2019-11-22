import React, { Component } from 'react';
import { connect } from 'react-redux';


class Post extends Component {


    constructor(props) {
        super(props);
        this.state = { id: '' }
    }


    render() {
        return (
            <div>
                <h1>Post_Id: {this.props.post.idPost}</h1>
                <div dangerouslySetInnerHTML={{ __html: this.props.post.postHtml }}></div>
            </div>
        );
    }
}



export default connect()(Post);