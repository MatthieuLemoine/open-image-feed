import Post from '../../components/posts/Post.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { like } from '../../../common/actions/posts/likes';
import { comment, toggleComments, toggleAddComment } from '../../../common/actions/posts/comments';
import { isCommenting } from '../../../common/reducers/app/app';

export default withRouter(connect(
  state => (
    {
      isCommenting : !!isCommenting(state)
    }
  ),
  {
    like,
    comment,
    toggleComments,
    toggleAddComment
  }
)(Post));
