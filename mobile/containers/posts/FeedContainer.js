import React, { Component } from 'react';
import PostList from '../../components/posts/PostList.js';
import { connect } from 'react-redux';
import { getPosts, getUser, hasMorePosts } from '../../../common/reducers/app/app.js';
import { watchFeedIfNeeded, fetchPosts } from '../../../common/actions/posts/posts.js';
import withNavigationBar from '../../components/app/NavigationBar.js';
class FeedContainer extends Component {
  componentDidMount() {
    // Register to live changes feed
    this.props.watchFeedIfNeeded();
    this.props.loadMore();
  }
  render() {
    return <PostList {...this.props} />;
  }
}

FeedContainer.propTypes = {
  watchFeedIfNeeded : React.PropTypes.func.isRequired,
  loadMore          : React.PropTypes.func.isRequired
};

export default withNavigationBar(connect(
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
