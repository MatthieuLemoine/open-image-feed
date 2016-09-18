import React, { Component } from 'react';
import { getPosts, getUser, hasMorePosts } from '../../../common/reducers/app/app';
import { watchFeedIfNeeded, fetchPosts } from '../../../common/actions/posts/posts';
import connect from '../connect.js';

export default (PostList, wrapper) => {
  class FeedContainer extends Component {
    componentDidMount() {
      // Register to live changes feed
      this.props.watchFeedIfNeeded();
      if (this.props.loadMore) {
        this.props.loadMore();
      }
    }
    render() {
      return <PostList {...this.props} />;
    }
  }

  FeedContainer.propTypes = {
    watchFeedIfNeeded : React.PropTypes.func.isRequired,
    loadMore          : React.PropTypes.func
  };

  return connect(FeedContainer, wrapper,
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
  );
};
