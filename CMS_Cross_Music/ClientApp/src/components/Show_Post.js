import React, { Component } from 'react';
import { connect } from 'react-redux';
import SanitizedHTML from 'react-sanitized-html';

import CommentList from "./CommentList";
import Comments from './Comments';


class Show_Post extends Component {


    constructor(props) {
        super(props);
        this.state = {
            IdPost: '',
            comments: [],
            PostHtml: '',
            PostDate: '',
            mediafile: '',
            comments: [],
            loading: false
        }
        this.getShortDate = this.getShortDate.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        let post_id = this.props.match.params.id;
        fetch('/api/Mediaposts?$expand=comment,userIdUserNavigation,mediaFileIdFileNavigation&$filter=IdPost eq ' + post_id)
            .then(response => response.json())
            .then(data => data[0])
            .then(data => {
                console.log(data);
                this.setState({
                    IdPost: data.IdPost,
                    PostHtml: data.PostHtml,
                    PostDate: new Date(data.PostDate),
                    //comments: data.comment,
                    user: data.UserIdUserNavigation,
                    mediafile: data.MediaFileIdFileNavigation
                });
            });
        /*
        this.state.comments: [
                {
                "IdComment": 1,
                "CommentHtml": "AAA",
                "CommentDate": "2019-11-18T12:12:09.77"
                }
                ...
        */

    }
    addComment(comment) {
        this.setState({
          loading: false,
          comments: [comment, ...this.state.comments]
        });
    }


    getShortDate(json_date) {
        let full_date = new Date(json_date);
        return full_date.toLocaleDateString();
    }


    render() {
        return (
            <div>
                <h1>Post_Id: {this.state.IdPost}</h1>
                <p> {this.getShortDate(this.state.PostDate)}{this.getShortDate(this.state.PostDate)}</p>
                <SanitizedHTML
                    allowedAttributes={{ 'a': ['href'] }}
                    allowedTags={['a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'span','ul','li']}
                    html={this.state.PostHtml}
                />
                <div className="row">
                    <div className="col-4  pt-3 border-right">
                        <h6>Say something</h6>
                        <Comments addComment={this.addComment} />
                    </div>
                    <div className="col-8  pt-3 bg-white">
                        <CommentList
                        loading={this.state.loading}
                        comments={this.state.comments}
                        />
                    </div>
                </div>
            </div>
        );
    }
}



export default connect()(Show_Post);