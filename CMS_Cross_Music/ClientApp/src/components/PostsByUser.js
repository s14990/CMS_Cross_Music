import React, { Component } from 'react';
import { connect } from 'react-redux';
import SanitizedHTML from 'react-sanitized-html';
import ReactPlayer from 'react-player';
import CommentList from "./CommentList";
import Comments from './Comments';


class Show_Post extends Component {


    constructor(props) {
        super(props);
        this.state = {
            IdPost: '',
            comments: [],
            PostDescription: '',
            PostTitle: '',
            PostDate: '',
            mediafile: '',
            link: '',
            //comments: [],
            loading: false
        }
        this.getShortDate = this.getShortDate.bind(this);
        this.addComment = this.addComment.bind(this);
        this.refresh = this.refresh.bind(this);
        this.fetch_data = this.fetch_data.bind(this);
    }

    componentDidMount() {
        this.fetch_data();
    }

    fetch_data() {
        let post_id = this.props.match.params.id;
        fetch('/api/Mediaposts?$expand=comment,userIdUserNavigation,mediaFileIdFileNavigation&$filter=IdPost eq ' + post_id)
            .then(response => response.json())
            .then(data => data[0])
            .then(data => {
                console.log(data);
                this.setState({
                    IdPost: data.IdPost,
                    PostDescription: data.PostDescription,
                    PostDate: new Date(data.PostDate),
                    PostTitle: data.PostTitle,
                    comments: data.Comment,
                    user: data.UserIdUserNavigation,
                    mediafile: data.MediaFileIdFileNavigation,
                    link: data.MediaFileIdFileNavigation.FlLink
                });
            });
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

    refresh() {
        console.log("Called refresh");
        this.fetch_data();
        //this.props.history.push("/show_post/"+this.state.IdPost);
    }


    render() {
        return (
            <div>
                <h1>Post_Id: {this.state.IdPost}</h1>
                <ReactPlayer url={this.state.link} controls />
                <p> {this.getShortDate(this.state.PostDate)}{this.getShortDate(this.state.PostDate)}</p>
                <p>{this.state.PostTitle}</p>
                <div className="row">
                    <div className="col-4  pt-3 border-right">
                        <h6>Say something</h6>
                        <Comments refresh={this.refresh} postId={this.state.IdPost} addComment={this.addComment} />
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