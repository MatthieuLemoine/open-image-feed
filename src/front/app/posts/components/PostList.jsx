import { Component } from 'react';
import PostContainer from '../containers/PostContainer';

class PostList extends Component {
  // Fix scroll on new post
  componentWillUpdate() {
    const node        = document.querySelector('.mdl-layout__content');
    this.scrollHeight = node.scrollHeight;
    this.scrollTop    = node.scrollTop;
  }
  componentDidUpdate() {
    const node        = document.querySelector('.mdl-layout__content');
    node.scrollTop = this.scrollTop + (node.scrollHeight - this.scrollHeight);
  }
  render() {
    return (
      <div className="feed-container">
      {
        this.props.posts.map((post) =>
          <PostContainer
            post={post}
            key={post.id}
          />
        )
      }
      </div>
  );
  }
}

PostList.propTypes = {
  posts          : React.PropTypes.array.isRequired
};

export default PostList;
