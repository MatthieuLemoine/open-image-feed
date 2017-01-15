import PostList from '../../components/posts/PostList';
import withNavigationBar from '../../components/app/NavigationBar';
import getFeedContainer from '../../../common/containers/posts/FeedContainer';

export default getFeedContainer(PostList, withNavigationBar);
