import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import PraiseOrStar from "../../../../components/PraiseOrStar";

function PostItem(props) {
  const { post } = props;
  return (
    <li className="postView">
      <Link key={post.id} to={`/posts/${post.id}`}>
        <div className="title">{post.title}</div>
      </Link>
      <div>
        创建人：<span>{post.author.username}</span>
      </div>
      <div>
        更新时间：<span>{post.updatedAt}</span>
      </div>
      <PraiseOrStar post={post} onPraiseOrStar={props.onPraiseOrStar} />
    </li>
  );
}

// class PostItem extends Component {
//     handlePraiseAddClick = () => {
//         this.props.onPraiseOrStar(this.props.post, praiseOrStarTypes.mapTypePraise, praiseOrStarTypes.methodInsert);
//     };
//
//     handlePraiseCancelClick = () => {
//         this.props.onPraiseOrStar(this.props.post, praiseOrStarTypes.mapTypePraise, praiseOrStarTypes.methodDelete);
//     };
//
//     handleStarAddClick = () => {
//         this.props.onPraiseOrStar(this.props.post, praiseOrStarTypes.mapTypeStar, praiseOrStarTypes.methodInsert);
//     };
//
//     handleStarCancelClick = () => {
//         this.props.onPraiseOrStar(this.props.post, praiseOrStarTypes.mapTypeStar, praiseOrStarTypes.methodDelete);
//     };
//
//     render() {
//         const { post } = this.props;
//         return (
//             <li className="postItem">
//                 <Link key={post.id} to={`/posts/${post.id}`}>
//                     <div className="title">{post.title}</div>
//                 </Link>
//                 <div>
//                     创建人：<span>{post.author.username}</span>
//                 </div>
//                 <div>
//                     更新时间：<span>{post.updatedAt}</span>
//                 </div>
//                 <div className="like">
//                     <span>
//                       {post.flagPraise ? (
//                           <img alt="取消点赞" style={{cursor: `pointer`,}} src={praised} onClick={this.handlePraiseCancelClick} />
//                       ) : (
//                           // 还未点赞，添加点赞动作
//                           <img alt="点赞" style={{cursor: `pointer`,}} src={praise} onClick={this.handlePraiseAddClick}/>
//                       )}
//                         {post.vote}
//                     </span>
//                     <span>
//                       {post.flagStar ? (
//                           <button
//                           type="button"
//                           className="link-button filter not-selected"
//                           onClick={this.handleStarCancelClick}>取消收藏</button>
//                       ) : (
//                           <button
//                           type="button"
//                           className="link-button filter not-selected"
//                           onClick={this.handleStarAddClick}>收藏</button>
//                       )}
//                     </span>
//                 </div>
//             </li>
//         );
//     }
// }

export default PostItem;
