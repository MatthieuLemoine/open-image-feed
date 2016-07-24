import Header from '../components/Header.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  isLogged, isFetchingPosts,
  isPersistingPost, isFetchingUser,
  isLiking, isCommenting, isFetchingCount
} from '../../app/reducers/reducers';

export default withRouter(connect(
  state => ({
    isLogged   : isLogged(state),
    isFetching : isFetchingPosts(state) || isPersistingPost(state) || isFetchingCount(state) ||
      isFetchingUser(state) || !!isLiking(state) || !!isCommenting(state)
  })
)(Header));
