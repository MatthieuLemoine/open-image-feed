import { withRouter } from 'react-router';
import AddPost from '../../components/posts/AddPost.jsx';
import getAddPostContainer from '../../../common/containers/posts/AddPostContainer';

export default getAddPostContainer(AddPost, withRouter);
