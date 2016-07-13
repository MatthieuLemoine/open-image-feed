import AddPost from '../components/AddPost.jsx';
import { connect } from 'react-redux';
import { persistPostIfNeeded } from '../actions/actions';
import { withRouter } from 'react-router';
import { isPersistingPost } from '../../app/reducers/reducers';

export default withRouter(connect(
  state => ({
    isPersisting : !!isPersistingPost(state)
  }),
  {
    add : persistPostIfNeeded
  }
)(AddPost));
