import React, { Component } from "react";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",

      comment: {
        CommentHtml: "",
        CommentDate: "1",
        UserIdUser: "1",
        MediapostIdPost: "1"
      }
    };

    // bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };

  /**
   * Form submit handler
   */
  onSubmit(e) {
    // prevent default form submission
    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    // loading status and clear error
    this.setState({ error: "", loading: true });
    let d=new Date();
    let { comment } = this.state;
    fetch("api/Comments", {
      method: 'POST',
      body: JSON.stringify({
        commentHtml: this.state.CommentHtml,
        commentDate: JSON.stringify(new Date()),
        userIdUser: 1,
        mediapostIdPost: 1
      })
  });
    // persist the comments on server
    /*let { comment } = this.state;
    fetch("api/Comments", {
      method: "POST",
      body: JSON.stringify(comment)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          // add time return from api and push comment to parent state
          comment.CommentDate = res.CommentDate;
          this.props.addComment(comment);

          // clear the message box
          this.setState({
            loading: false,
            comment: { ...comment, CommentHtml: "" }
          });
        }
      })
      .catch(err => {
        this.setState({
          error: "Something went wrong while submitting form.",
          loading: false
        });
      });
      */
  }

  /**
   * Simple validation
   */
  isFormValid() {
    return this.state.comment.CommentHtml !== "";
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <form method="post" onSubmit={this.onSubmit}>

          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.CommentHtml}
              className="form-control"
              placeholder="Your Comment"
              name="CommentHtml"
              rows="5"
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button disabled={this.state.loading} className="btn btn-primary">
              Comment
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}