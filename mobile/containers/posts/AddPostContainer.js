import AddPost from '../../components/posts/AddPost';
import withNavigationBar from '../../components/app/NavigationBar';
import getAddPostContainer from '../../../common/containers/posts/AddPostContainer';

export default getAddPostContainer(AddPost, withNavigationBar);
