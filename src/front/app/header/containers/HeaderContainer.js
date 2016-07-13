import Header from '../components/Header.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  isLogged, isFetchingPosts,
  isPersistingPost, isFetchingUser
} from '../../app/reducers/reducers';

export default withRouter(connect(
  state => ({
    isLogged   : isLogged(state),
    isFetching : isFetchingPosts(state) || isPersistingPost(state) || isFetchingUser(state)
  })
)(Header));
