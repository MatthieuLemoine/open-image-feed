import Post from '../components/Post.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { like } from '../actions/likes';
import { comment, toggleComments, toggleAddComment } from '../actions/comments';
import { isCommenting } from '../../app/reducers/reducers';


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
