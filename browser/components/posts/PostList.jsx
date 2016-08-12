import { Component } from 'react';
import PostContainer from '../../containers/posts/PostContainer';
import Infinite from '../../containers/shared/Infinite';

class PostList extends Component {
  componentDidMount() {
    // Scroll container
    this.layoutNode = document.querySelector('.mdl-layout__content');
  }
  componentWillReceiveProps(nextProps) {
    // Hack to know if the component update because of new post added on top
    // If a post is added on top, we need to update scroll position to preserve scrolling.
    this.shouldUpdateScroll = this.props.posts.length > 0 && nextProps.posts.length > 0 &&
      this.props.posts[0].id !== nextProps.posts[0].id;
  }
  componentWillUpdate() {
    const node        = this.layoutNode;
    this.scrollHeight = node.scrollHeight;
    this.scrollTop    = node.scrollTop;
  }
  componentDidUpdate() {
    const node = this.layoutNode;
    if (this.shouldUpdateScroll) {
      // Update scroll position
      node.scrollTop = this.scrollTop + (node.scrollHeight - this.scrollHeight);
    }
  }
  render() {
    return (
      <div
        className="feed-container"
      >
        <Infinite
          loadMore={this.props.loadMore}
          hasMore={this.props.hasMore}
          parentSelector=".mdl-layout__content"
        >
          {
            this.props.posts.map((post) =>
              <PostContainer
                post={post}
                key={post.id}
              />
            )
          }
        </Infinite>
      </div>
  );
  }
}

PostList.propTypes = {
  posts    : React.PropTypes.array.isRequired,
  loadMore : React.PropTypes.func.isRequired,
  hasMore  : React.PropTypes.bool.isRequired
};

export default PostList;
