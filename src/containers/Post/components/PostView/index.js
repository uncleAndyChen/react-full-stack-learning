import React from "react";
import "./style.css";
import PraiseOrStar from "../../../../components/PraiseOrStar";

function PostView(props) {
  const { post, editable, onEditClick, onPraiseOrStar } = props;
  return (
  <div className="postView">
      <h2>{post.title}</h2>
      <div className="mark">
          <span className="author">{post.author.username}</span>
          <span>·</span>
          <span>{post.updatedAt}</span>
          {editable ? (
              <span>
          ·<button onClick={onEditClick}>编辑</button>
        </span>
          ) : null}
      </div>
      <div className="content">{post.content}</div>
      <PraiseOrStar post={post} onPraiseOrStar={onPraiseOrStar} />
  </div>
  );
}

export default PostView;
