import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import praised from "../../../../images/praised.png";
import praise from "../../../../images/praise.png";

function PostItem(props) {
  const { post } = props;
  return (
    <li className="postItem">
      <Link key={post.id} to={`/posts/${post.id}`}>
        <div className="title">{post.title}</div>
      </Link>
      <div>
        创建人：<span>{post.author.username}</span>
      </div>
      <div>
        更新时间：<span>{post.updatedAt}</span>
      </div>
      <div className="like">
        <span>
          {post.flagPraise ? (
            <img alt="vote" src={praised} />
          ) : (
            // todo 还未点赞，添加点赞动作
            <img alt="vote" src={praise} />
          )}
        </span>
        <span>{post.vote}</span>
      </div>
    </li>
  );
}

export default PostItem;
