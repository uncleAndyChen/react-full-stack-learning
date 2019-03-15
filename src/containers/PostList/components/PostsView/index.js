import React, { Component } from 'react';
import PostItem from "../PostItem";

class PostsView extends Component {
  render() {
    const { posts } = this.props
    return (
      <ul>
        {posts.map(item => (
          <PostItem key={item.id} post={item} onPraiseOrStar={this.props.onPraiseOrStar} />
        ))}
      </ul>
    );
  }
}

export default PostsView;