import React from "react";
import "./style.css";
import like from "../../../../images/praised.png";

function PostView(props) {
  const { post, editable, onEditClick } = props;
  return (
    <div className="postView">
      <div>
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
      </div>
      <div className="vote">
        <span>
          <img alt="vote" src={like} />
        </span>
        <span>{post.vote}</span>
      </div>
    </div>
  );
}

export default PostView;
