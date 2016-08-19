import AddPost from '../../components/posts/AddPost.jsx';
import { withRouter } from 'react-router';
import getAddPostContainer from '../../../common/containers/posts/AddPostContainer.js';

export default getAddPostContainer(AddPost, withRouter);
