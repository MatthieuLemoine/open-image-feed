import Header from '../../components/header/Header.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  isLogged, isFetchingPosts,
  isPersistingPost, isFetchingUser,
  isLiking, isCommenting, isFetchingCount
} from '../../../common/reducers/app/app';

export default withRouter(connect(
  state => ({
    isLogged   : isLogged(state),
    isFetching : isFetchingPosts(state) || isPersistingPost(state) || isFetchingCount(state) ||
      isFetchingUser(state) || !!isLiking(state) || !!isCommenting(state)
  })
)(Header));
