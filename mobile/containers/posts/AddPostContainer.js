import AddPost from '../../components/posts/AddPost.js';
import withNavigationBar from '../../components/app/NavigationBar.js';
import getAddPostContainer from '../../../common/containers/posts/AddPostContainer.js';

export default getAddPostContainer(AddPost, withNavigationBar);
