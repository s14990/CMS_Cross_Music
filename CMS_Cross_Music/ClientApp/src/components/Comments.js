import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: "",

            comment: {
                CommentHtml: "",
                CommentDate: JSON.stringify(new Date()),
                UserIdUser: 1,
                MediapostIdPost: 1
            }
        };

        // bind context to methods
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.refresh = this.refresh.bind(this);
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
        this.setState({ error: "", loading: false });
        let { comment } = this.state;
        let user_id = this.props.auth.isAuthenticated ? this.props.auth.user.idUser : 1;
        let post_id = this.props.postId;
        let comment_text = this.state.comment.CommentHtml;
        let cur_date = new Date();

        fetch("api/Comments", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                commentHtml: comment_text,
                commentDate: cur_date.toJSON(),
                userIdUser: user_id,
                mediapostIdPost: post_id
            })
        });

        setTimeout(this.refresh, 300)
    }

    isFormValid() {
        return this.state.comment.CommentHtml !== "";
    }

    refresh() {
        this.props.refresh();
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

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(Comments);