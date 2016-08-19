import PostList from '../../components/posts/PostList.js';
import withNavigationBar from '../../components/app/NavigationBar.js';
import getFeedContainer from '../../../common/containers/posts/FeedContainer.js';

export default getFeedContainer(PostList, withNavigationBar);
