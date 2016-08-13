import AddPost from '../../components/posts/AddPost.js';
import { connect } from 'react-redux';
import { persistPostIfNeeded } from '../../../common/actions/posts/posts.js';
import { isPersistingPost } from '../../../common/reducers/app/app.js';

export default connect(
  state => ({
    isPersisting : !!isPersistingPost(state)
  }),
  {
    add : persistPostIfNeeded
  }
)(AddPost);
