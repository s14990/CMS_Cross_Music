import React from "react";

export default function Comment(props) {
  const { UserIdUserNavigation, CommentHtml, CommentDate } = props.comment;

  return (
    <div>

      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{CommentDate}</small>
        <h6 className="mt-0 mb-1 text-muted">{UserIdUserNavigation.UserName}</h6>
        {CommentHtml}
      </div>
    </div>
  );
}