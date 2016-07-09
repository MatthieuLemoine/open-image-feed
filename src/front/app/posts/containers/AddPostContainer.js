import AddPost from '../components/AddPost.jsx';
import { connect } from 'react-redux';
import { persistPostIfNeeded } from '../actions/actions';

export default connect(
  null,
  dispatch => ({
    add : post => dispatch(persistPostIfNeeded(post))
  })
)(AddPost);
