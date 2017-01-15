import { withRouter } from 'react-router';
import PostList from '../../components/posts/PostList.jsx';
import getFeedContainer from '../../../common/containers/posts/FeedContainer';

export default getFeedContainer(PostList, withRouter);
