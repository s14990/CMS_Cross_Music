
import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import bin from '../images/bin.png';

//export default function Comment(props) {
  class Comment extends Component {
    constructor(props) {
      super(props);
      this.state = {
          confirmDelete: false,
          UserIdUser: '',
          UserIdUserNavigation: '',
          CommentHtml: '',
          CommentDate: '',
          IdComment: ''
      };

      this.clickBin = this.clickBin.bind(this);
      this.clickDelete = this.clickDelete.bind(this);
      this.clickCancel = this.clickCancel.bind(this);
  }

  clickBin()
  {
    this.setState({ confirmDelete : true })
  }
  clickDelete()
  {
      fetch('api/Comments/' + this.state.IdComment, {
          method: 'DELETE',
      })
      this.setState({ CommentHtml: ''})
  }

  clickCancel()
  {
    this.setState({ confirmDelete : false })
  }

  componentDidMount() {
      const { UserIdUser, UserIdUserNavigation, CommentHtml, CommentDate, IdComment } = this.props.comment;
      this.setState({
          UserIdUser, UserIdUserNavigation, CommentHtml, CommentDate, IdComment
      })
  }


  render() {

  let datetime = new Date(this.state.CommentDate)
  //  console.log(datetime.toJSON())
  let date = datetime.getFullYear() +'/'+ ("0" +(parseInt(datetime.getMonth())+1)).slice(-2)+'/' +("0" +datetime.getDate()).slice(-2)
  //  console.log(date)
  let time = ("0" +datetime.getHours()).slice(-2) + ':'+ ("0" +datetime.getMinutes()).slice(-2)

    return (
      <div>
        
        <div className="media-body p-2 mb-3 shadow-sm rounded bg-light border">
          <h6 className="float-right text-muted">{time} {date}</h6>
                {(this.state.UserIdUser === this.props.auth.user.idUser || this.props.auth.user.idUser === 1) &&
            <button className="float-right btn">
              <img src={bin} alt="delete comment" onClick={this.clickBin} width = "32" height = "32" />
            </button>
          }
          {this.state.confirmDelete === true &&
            <div className="float-right">
              <button className="btn btn-danger m-1" onClick={this.clickDelete}>
                Delete {/*IdComment*/}
              </button>
              <button className="btn btn-info m-1" onClick={this.clickCancel}>
                Cancel
              </button>
            </div>
          }
                <h6 className="mt-0 mb-1 text-muted">{this.state.UserIdUserNavigation.UserName}</h6>
                {this.state.CommentHtml}
          
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}
export default compose(
  withRouter,
  connect(mapStateToProps)
)(Comment);