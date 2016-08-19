import Post from '../../components/posts/Post.jsx';
import { withRouter } from 'react-router';
import getPostContainer from '../../../common/containers/posts/PostContainer.js';

export default getPostContainer(Post, withRouter);
