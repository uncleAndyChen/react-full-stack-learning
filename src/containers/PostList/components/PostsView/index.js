import React, { Component } from 'react';
import PostItem from "../PostItem";

class PostsView extends Component {
  render() {
    const { posts } = this.props
    return (
      <ul>
        {posts.map(item => (
          <PostItem post={item} onPraise={this.props.onPraise} />
        ))}
      </ul>
    );
  }
}

export default PostsView;