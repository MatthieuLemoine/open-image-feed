import PostList from '../components/PostList.jsx';
import { connect } from 'react-redux';

export default connect(
  state => (
    {
      posts : state.post.posts
    }
  )
)(PostList);
