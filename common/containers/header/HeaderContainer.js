import {
  isLogged, isFetchingPosts,
  isPersistingPost, isFetchingUser,
  isLiking, isCommenting, isFetchingCount
} from '../../../common/reducers/app/app';
import connect from '../connect.js';

export default (Header, wrapper, isAppLoaded) =>
  connect(Header, wrapper,
    state => ({
      isLogged   : isLogged(state),
      isFetching : isFetchingPosts(state) || isPersistingPost(state) || isFetchingCount(state) ||
        isFetchingUser(state) || !!isLiking(state) || !!isCommenting(state),
      isAppLoaded : isAppLoaded ? isAppLoaded(state) : null
    })
);
