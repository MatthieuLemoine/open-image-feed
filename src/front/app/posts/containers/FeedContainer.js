import { Component } from 'react';
import PostList from '../components/PostList.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPosts } from '../../app/reducers/reducers';
import { watchFeedIfNeeded } from '../actions/actions';

class FeedContainer extends Component {
  componentDidMount() {
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
      posts : getPosts(state)
    }
  ),
  {
    watchFeedIfNeeded
  }
)(FeedContainer));
