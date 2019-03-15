import React, { Component } from "react";
import "./style.css";
import praised from "../../images/praised.png";
import praise from "../../images/praise.png";
import { praiseOrStarTypes } from "../../redux/modules/posts";

class PraiseOrStar extends Component {
    handlePraiseOrStar = (postId, mapType, method) => {
        this.props.onPraiseOrStar(postId, mapType, method);
    };

    handlePraiseAddClick = () => {
        this.handlePraiseOrStar(this.props.post, praiseOrStarTypes.mapTypePraise, praiseOrStarTypes.methodInsert);
    };

    handlePraiseCancelClick = () => {
        this.handlePraiseOrStar(this.props.post, praiseOrStarTypes.mapTypePraise, praiseOrStarTypes.methodDelete);
    };

    handleStarAddClick = () => {
        this.handlePraiseOrStar(this.props.post, praiseOrStarTypes.mapTypeStar, praiseOrStarTypes.methodInsert);
    };

    handleStarCancelClick = () => {
        this.handlePraiseOrStar(this.props.post, praiseOrStarTypes.mapTypeStar, praiseOrStarTypes.methodDelete);
    };

    render() {
        const { post } = this.props;
        return (
            <div className="like">
                <span>
                  {post.flagPraise ? (
                      <img alt="取消点赞" style={{cursor: `pointer`,}} src={praised} onClick={this.handlePraiseCancelClick} />
                  ) : (
                      // 还未点赞，添加点赞动作
                      <img alt="点赞" style={{cursor: `pointer`,}} src={praise} onClick={this.handlePraiseAddClick}/>
                  )}
                    {post.vote}
                </span>
                <span>
                  {post.flagStar ? (
                      <button
                          type="button"
                          className="link-button filter not-selected"
                          onClick={this.handleStarCancelClick}>取消收藏</button>
                  ) : (
                      <button
                          type="button"
                          className="link-button filter not-selected"
                          onClick={this.handleStarAddClick}>收藏</button>
                  )}
                </span>
            </div>
        );
    }
}

export default PraiseOrStar;
