import { Component } from 'react';
import PostList from '../../components/posts/PostList.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPosts, getUser, hasMorePosts } from '../../../common/reducers/app/app';
import { watchFeedIfNeeded, fetchPosts } from '../../../common/actions/posts/posts';

class FeedContainer extends Component {
  componentDidMount() {
    // Register to live changes feed
    this.props.watchFeedIfNeeded();
  }
  render() {
    return <PostList {...this.props} />;
  }
}

FeedContainer.propTypes = {
  watchFeedIfNeeded : React.PropTypes.func.isRequired
};

export default withRouter(connect(
  state => (
    {
      posts : getPosts(state).map(post => {
        post.hasLiked = post.likes.some(
          _like => _like.authorId === getUser(state).username
        );
        return post;
      }),
      hasMore : hasMorePosts(state)
    }
  ),
  {
    watchFeedIfNeeded,
    loadMore : fetchPosts
  }
)(FeedContainer));
