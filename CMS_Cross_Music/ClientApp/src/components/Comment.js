import React from "react";

export default function Comment(props) {
  const { UserIdUserNavigation, CommentHtml, CommentDate } = props.comment;

  let datetime = new Date(CommentDate)
  //  console.log(datetime.toJSON())
  let date = datetime.getFullYear() +'/'+ (parseInt(datetime.getMonth())+1)+'/' +datetime.getDate()
  //  console.log(date)
  let time = datetime.getHours() + ':'+ datetime.getMinutes()
  return (
    <div>
      
      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{time} {date}</small>

        <h6 className="mt-0 mb-1 text-muted">{UserIdUserNavigation.UserName}</h6>
        {CommentHtml}
      </div>
    </div>
  );
}