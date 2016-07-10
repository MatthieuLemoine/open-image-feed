import AddPost from '../components/AddPost.jsx';
import { connect } from 'react-redux';
import { persistPostIfNeeded } from '../actions/actions';
import { withRouter } from 'react-router';

export default withRouter(connect(
  null,
  {
    add : persistPostIfNeeded
  }
)(AddPost));
