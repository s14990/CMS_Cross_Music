import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
//import mp3_icon from '../images/mp3_icon.png';
import mp3_icon from '../images/AudioFileIcon_0001.png';

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
        let date = datetime.getFullYear() +'/'+ ("0" +(parseInt(datetime.getMonth())+1)).slice(-2)+'/' +("0" +datetime.getDate()).slice(-2)
        return (
            <div className='pb-0 m-2 ' onClick={this.handleRedirect}>
                <div className='text-center'>
                    {this.props.fileType === 'mp4' &&
                        <ReactPlayer height='12em' width='20em' url={this.props.fileLink} />
                    }
                    {this.props.fileType === 'mp3' &&
                        <img width='190' height='190' className="rounded float-center" src={mp3_icon}/>
                    }
                </div>
                <div className='font-weight-bold text-truncate' style={{ width: '20em' }} >
                    {this.props.postTitle}
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