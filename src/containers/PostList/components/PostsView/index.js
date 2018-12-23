import React, { Component } from 'react';
import PostItem from "../PostItem";

class PostsView extends Component {
  // todo
  handlePraiseClick = () => {

  };

  render() {
    const { posts } = this.props
    return (
      <ul>
        {posts.map(item => (
          <PostItem post={item} />
        ))}
      </ul>
    );
  }
}

export default PostsView;