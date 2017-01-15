import { withRouter } from 'react-router';
import Post from '../../components/posts/Post.jsx';
import getPostContainer from '../../../common/containers/posts/PostContainer';

export default getPostContainer(Post, withRouter);
