import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';


class Post extends Component {


    constructor(props) {
        super(props);
        this.state = { id: '' }
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    /*
    this.props:

    idPost = {post.IdPost}
    postHtml = {post.PostHtml}
    idUser = {post.UserIdUserNavigation.IdUser}
    userName = {post.UserIdUserNavigation.UserName}
    idFile = {post.MediaFileIdFileNavigation.IdFile}
    fileName = {post.MediaFileIdFileNavigation.FlName}
    fileLink = {post.MediaFileIdFileNavigation.FlLink}
    postDate = {post.MediaFileIdFileNavigation.PostDate}
    */
    handleRedirect() {
        this.props.history.push('/show_post/'+this.props.idPost);
    }

    render() {
        let datetime = new Date(this.props.postDate)
        let date = datetime.getFullYear() +'/'+ (parseInt(datetime.getMonth())+1)+'/' +datetime.getDate()
        return (
            <div className='pb-0 m-2' onClick={this.handleRedirect}>
                <ReactPlayer height='12em' width='20em' url={this.props.fileLink}/>
                <div className='font-weight-bold text-truncate' style={{ width: '20em' }} >{this.props.fileName}
                    <div>
                        {this.props.postTitle}
                    </div>
                </div>
                <ul className='list-inline'>
                    <li className="list-inline-item"><div className='text-truncate' style={{width:'14em'}}>{this.props.userName}</div></li>
                    <li className="list-inline-item"><div className='text-truncate'> {date}</div></li>
                </ul>
               {/* <div dangerouslySetInnerHTML={{ __html: this.props.postHtml }}></div>*/}
            </div>
        );
    }
}

export default compose(
    withRouter,
    connect()
)(Post);