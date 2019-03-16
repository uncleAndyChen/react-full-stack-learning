import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PostsView from "./components/PostsView";
import PostEditor from "../Post/components/PostEditor";
import { getLoggedUser } from "../../redux/modules/auth";
import { actions as postActions } from "../../redux/modules/posts";
import { actions as uiActions, isAddDialogOpen } from "../../redux/modules/ui";
import { getPostListWithAuthors } from "../../redux/modules";
import "./style.css";

class PostList extends Component {
  componentDidMount() {
    this.props.fetchAllPosts(this.props.match.url);
  }

  handleSave = data => {
    this.props.createPost(data.title, data.content);
  };

  handleCancel = () => {
    this.props.closeAddDialog();
  };

  handleNewPost = () => {
    this.props.openAddDialog();
  };

  handlePraiseOrStar = (postId, mapType, method) => {
    this.props.postPraiseOrStar(postId, mapType, method);
  };

  render() {
    const { posts, user, isAddDialogOpen, location } = this.props;
    let userId = user.get("userId");
    let rawPosts = posts.toJS();

    userId = userId === null ? "0" : userId;

    if (location.pathname === "/myPost" && userId !== "0") {
      rawPosts = rawPosts.filter((postItem) => {
        return postItem.author.id === userId;
      });
    }

    return (
      <div className="postList">
        <div>
          <h2>话题列表</h2>
          {userId !== "0" ? (
            <button onClick={this.handleNewPost}>发帖</button>
          ) : null}
        </div>
        {isAddDialogOpen ? (
          <PostEditor onSave={this.handleSave} onCancel={this.handleCancel} />
        ) : null}
        {(location.pathname === "/myPost" && userId === "0") ? (<div><hr/>请登录后查看</div>) : <PostsView posts={rawPosts} onPraiseOrStar={this.handlePraiseOrStar} />}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: getLoggedUser(state),             // 当前登录用户
    posts: getPostListWithAuthors(state),   // 帖子列表数据
    isAddDialogOpen: isAddDialogOpen(state) // 新建帖子编辑框的 UI 状态
  };
};

// bindActionCreators前，之所以有三个点儿，是因为要返回多个 actions，看 postActions、actions 的定义就知道了。
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(postActions, dispatch),
    ...bindActionCreators(uiActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
