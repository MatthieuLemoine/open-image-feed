import Toolbar from '../../components/app/Toolbar.js';
import { connect } from 'react-redux';
import {
  isFetchingPosts, isFetchingCount,
  isPersistingPost, isFetchingUser,
  isLiking, isCommenting
} from '../../../common/reducers/app/app';

export default connect(
  state => ({
    isFetching : isFetchingPosts(state) || isPersistingPost(state) || isFetchingCount(state) ||
      isFetchingUser(state) || !!isLiking(state) || !!isCommenting(state)
  })
)(Toolbar);
