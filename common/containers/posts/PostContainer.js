import { like } from '../../../common/actions/posts/likes';
import { comment, toggleComments, toggleAddComment } from '../../../common/actions/posts/comments';
import { isCommenting } from '../../../common/reducers/app/app';
import connect from '../connect.js';

export default (Post, wrapper) =>
  connect(Post, wrapper,
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
);
