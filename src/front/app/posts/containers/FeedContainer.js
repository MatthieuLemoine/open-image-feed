import { Component } from 'react';
import PostList from '../components/PostList.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPosts, getUser, hasMorePosts } from '../../app/reducers/reducers';
import { watchFeedIfNeeded, fetchPosts } from '../actions/posts';

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
