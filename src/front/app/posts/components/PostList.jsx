import Post from './Post.jsx';

const PostList = ({
  posts
}) =>
  <div className="feed-container">
  {
    posts.map((post) => <Post post={post} />)
  }
</div>;

PostList.propTypes = {
  posts : React.PropTypes.array.isRequired
};

export default PostList;
