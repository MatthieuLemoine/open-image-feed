import { persistPostIfNeeded } from '../../../common/actions/posts/posts';
import { isPersistingPost } from '../../../common/reducers/app/app';
import connect from '../connect.js';

export default (AddPost, wrapper) =>
  connect(AddPost, wrapper,
    state => ({
      isPersisting : !!isPersistingPost(state)
    }),
    {
      add : persistPostIfNeeded
    }
);
