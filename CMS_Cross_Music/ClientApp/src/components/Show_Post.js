import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import CommentList from "./CommentList";
import Comments from './Comments';
import like_simple from '../images/like_simple.png';
import like_filled from '../images/like_filled.png';
import { UncontrolledTooltip, Button  } from 'reactstrap';

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
            tags: [],
            //comments: [],
            loading: false,
            liked: false,
            like_count: 0,
            user: ''
        }
        this.getShortDate = this.getShortDate.bind(this);
        this.addComment = this.addComment.bind(this);
        this.refresh = this.refresh.bind(this); 
        this.fetch_data = this.fetch_data.bind(this);
        this.add_like = this.add_like.bind(this);
    }

    componentDidMount() {
        this.fetch_data();
    }

    async fetch_data() {
        let post_id = this.props.match.params.id;
        await fetch('/api/Mediaposts?$expand=comment($expand=userIdUserNavigation),userIdUserNavigation,pt($expand=tag),mediaFileIdFileNavigation&$filter=IdPost eq ' + post_id)
            .then(response => response.json())
            .then(data => data[0])
            .then(data => {
                console.log(data);
                let tags = data.Pt.map(item => item.Tag);               
                this.setState({
                    IdPost: data.IdPost,
                    PostDescription: data.PostDescription,
                    PostDate: new Date(data.PostDate),
                    PostTitle: data.PostTitle,
                    comments: data.Comment,
                    user: data.UserIdUserNavigation,
                    mediafile: data.MediaFileIdFileNavigation,
                    link: data.MediaFileIdFileNavigation.FlLink,
                    tags
                });
            });
        let liked = false;
        await fetch('/api/Likes?$filter=userIdUser eq ' + this.props.auth.user.idUser+' and mediapostIdPost eq '+post_id)
            .then(response => response.json())
            .then(data => {
                liked = data.length > 0 ? true : false;
                console.log(data);
                this.setState({ liked });
            });
        await fetch('/api/Likes?$apply=groupby((mediapostIdPost), aggregate(idLike with countdistinct as Total))&$filter=MediapostIdPost eq ' + post_id)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    this.setState({ like_count: data[0].Total });
                }
                else {
                    this.setState({ like_count: 0 });
                }

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

    add_like() {
        this.setState({ liked: true, like_count: this.state.like_count + 1 });
        fetch("api/Likes", {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
             body: JSON.stringify({
                 userIdUser: this.props.auth.user.idUser,
                 mediapostIdPost: this.state.IdPost
              })
        }).then(setTimeout(this.refresh, 300));
    }

    render() {
        return (
            <div>
                {/*<h1>Post_Id: {this.state.IdPost}</h1>*/}
                <div className="">
                    <ReactPlayer className="mt-4" url={this.state.link} controls />
                    <ul className='list-inline mt-2 mb-0'>
                        <li className="list-inline-item float-left"><div className='font-weight-bold text-truncate' style={{width:'35em'}}>{this.state.PostTitle}</div></li>
                        <li className="list-inline-item "><div className='text-truncate'> {this.getShortDate(this.state.PostDate)}</div></li>
                    </ul>
                    <div className='d-flex align-items-stretch'>
                        <div id='autor' className='float-left'>{this.state.user.UserName}
                            <UncontrolledTooltip placement="right" target="autor">
                                Author
                            </UncontrolledTooltip>
                        </div>
                    </div>
                </div>

                <ul className='list-inline mt-3 mb-0 d-flex'> 
                <li className="list-inline-item float-left">
                    <div className="float-left ">{this.state.liked && 
                
                    <img width='30' height='30' className="rounded " src={like_filled} />
                    }
                    {!this.state.liked &&
                        <img width='30' height='30' className="rounded " src={like_simple} onClick={this.add_like} />
                    }
                    </div>
                </li>    
                <li className="list-inline-item align-self-center">
                    <div className="pl-1 font-weight-bold">{this.state.like_count}</div>
                </li>
                </ul>
                
                
                <div className="">
                    <div className="pt-3">
                        <h6>Say something</h6>
                        <Comments refresh={this.refresh} postId={this.state.IdPost} addComment={this.addComment} />
                    </div>
                    <div className="bg-white">
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



export default connect(state=>state)(Show_Post);