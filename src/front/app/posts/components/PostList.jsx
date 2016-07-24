import { Component } from 'react';
import PostContainer from '../containers/PostContainer';
import Infinite from '../../shared/containers/Infinite';

class PostList extends Component {
  // Fix scroll on new post
  componentWillMount() {
    this.postWidth = window.innerWidth * 0.8;
    this.postWidth = Math.ceil(this.postWidth > 750 ? 750 : this.postWidth);
  }
  componentDidMount() {
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
    this.postWidth    = window.innerWidth * 0.8;
    this.postWidth    = Math.ceil(this.postWidth > 750 ? 750 : this.postWidth);
  }
  componentDidUpdate() {
    const node = this.layoutNode;
    if (this.shouldUpdateScroll) {
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
