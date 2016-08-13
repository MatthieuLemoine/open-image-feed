import Post from '../../components/posts/Post.js';
import { connect } from 'react-redux';
import { like } from '../../../common/actions/posts/likes.js';
import {
  comment, toggleComments, toggleAddComment
} from '../../../common/actions/posts/comments.js';
import { isCommenting } from '../../../common/reducers/app/app.js';

export default connect(
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
)(Post);
