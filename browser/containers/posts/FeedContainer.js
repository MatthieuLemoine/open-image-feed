import PostList from '../../components/posts/PostList.jsx';
import { withRouter } from 'react-router';
import getFeedContainer from '../../../common/containers/posts/FeedContainer.js';

export default getFeedContainer(PostList, withRouter);
