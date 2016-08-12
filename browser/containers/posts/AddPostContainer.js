import AddPost from '../../components/posts/AddPost.jsx';
import { connect } from 'react-redux';
import { persistPostIfNeeded } from '../../../common/actions/posts/posts';
import { withRouter } from 'react-router';
import { isPersistingPost } from '../../../common/reducers/app/app';

export default withRouter(connect(
  state => ({
    isPersisting : !!isPersistingPost(state)
  }),
  {
    add : persistPostIfNeeded
  }
)(AddPost));
